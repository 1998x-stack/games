(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const cards = $("cards"), chips = $("chips");
  const filters = {search:$("search"),category:$("category"),mode:$("mode"),
    verification:$("verification"),sort:$("sort")};
  const labels = {
    "browser-ci":"浏览器测试通过 · 线上待验",
    "build-ci":"构建成功 · 玩法待验",
    "unit-ci":"自动测试通过 · 实机待验",
    "ci-failed":"现有 CI 失败 · 需修复",
    "not-verified":"尚待运行验证"
  };
  const types = {"desktop":"桌面游戏","browser-candidate":"浏览器候选",
    "local-web":"本地 Web","environment":"AI / RL 环境",
    "game-ai":"游戏 AI 研究", "resource":"资料与工具"};
  const ok = value => typeof value === "string" &&
    value.startsWith("https://github.com/1998x-stack/");
  const state = {catalog:null, projects:new Map(), category:"all"};
  const hasPass = e => e && ["browser-ci","build-ci","unit-ci"].includes(e.validation);
  const kind = e => e?.mode || "resource";

  const externalLink = (url, label, role) => {
    const a = document.createElement("a");
    a.dataset.role = role;
    a.textContent = label;
    if (ok(url)) {
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    return a;
  };
  const getEvidence = p => state.projects.get(p.name);
  const categoryName = id => state.catalog.categories.find(c => c.id === id)?.name || id;
  function createCard(p) {
    const e = getEvidence(p);
    const card = document.createElement("article");
    card.className = "project";
    const meta = document.createElement("div");
    meta.className = "meta";
    const category = document.createElement("span"); category.textContent = categoryName(p.category);
    const separator = document.createElement("span"); separator.className="meta-divider";
    separator.textContent = " / ";
    const mode = document.createElement("span"); mode.textContent = types[kind(e)];
    meta.append(category, separator, mode);
    const name = document.createElement("h4"); name.textContent = p.name;
    const desc = document.createElement("p"); desc.textContent = p.description;
    const bottom = document.createElement("div"); bottom.className="bottom";
    const signal = document.createElement("span"); signal.className="signal";
    signal.textContent = e ? labels[e.validation] : "尚未进入运行验证批次";
    if (!e || e.validation === "not-verified") signal.classList.add("signal--pending");
    if (e?.validation === "ci-failed") signal.classList.add("signal--failed");
    if (e?.availability === "deployment-blocked") {
      signal.classList.add("signal--blocked");
      signal.textContent += " · 部署受阻";
    }
    if (e?.note) signal.title = e.note;
    const links = document.createElement("div"); links.className="links";
    links.append(externalLink(p.url, "原仓库 ↗", "repo"));
    if (e?.evidence?.length && ok(e.evidence[0])) {
      links.append(externalLink(e.evidence[0], "验证记录 ↗", "evidence"));
    }
    bottom.append(signal, links);
    card.append(meta, name, desc, bottom);
    return card;
  }

  function render() {
    const {catalog} = state; if (!catalog) return;
    const q = filters.search.value.trim().toLocaleLowerCase();
    let rows = catalog.projects.filter(p => {
      const e = getEvidence(p);
      if (state.category !== "all" && p.category !== state.category) return false;
      if (filters.mode.value !== "all" && kind(e) !== filters.mode.value) return false;
      if (filters.verification.value === "evidence" && !hasPass(e)) return false;
      if (filters.verification.value === "failed" && e?.validation !== "ci-failed") return false;
      if (filters.verification.value === "pending" && (hasPass(e) || e?.validation === "ci-failed")) return false;
      return !q || [p.name,p.description,categoryName(p.category),types[kind(e)]]
        .some(v => v.toLocaleLowerCase().includes(q));
    });
    if (filters.sort.value === "name") {
      rows.sort((a,b) => a.name.localeCompare(b.name,"zh-CN",{numeric:true}));
    } else if (filters.sort.value === "evidence") {
      rows.sort((a,b) => Number(hasPass(getEvidence(b))) - Number(hasPass(getEvidence(a))));
    }
    const fragment = document.createDocumentFragment();
    rows.forEach(p => fragment.append(createCard(p)));
    cards.replaceChildren(fragment);
    $("counter").textContent = "显示 " + rows.length + " / " + catalog.projects.length + " 个项目";
    $("empty").hidden = rows.length !== 0;
    filters.category.value = state.category;
    Array.from(chips.children).forEach(btn => {
      const selected = btn.dataset.category === state.category;
      btn.classList.toggle("active", selected);
      btn.setAttribute("aria-pressed", String(selected));
    });
  }

  function clearFilters() {
    filters.search.value="";
    filters.mode.value="all";
    filters.verification.value="all";
    filters.sort.value="default";
    state.category="all";
    render();
    filters.search.focus();
  }

  async function loadOptional(path) {
    try {
      const r=await fetch(path,{cache:"no-store"});
      if (!r.ok) throw Error("HTTP "+r.status);
      const value=await r.json();
      return Array.isArray(value.projects) ? value.projects : [];
    } catch(err) {
      console.warn("Optional verification manifest is unavailable:",path,err);
      return [];
    }
  }

  async function init() {
    try {
      const response=await fetch("data/catalog.json",{cache:"no-store"});
      if (!response.ok) throw Error("HTTP "+response.status);
      const catalog=await response.json();
      if (!Array.isArray(catalog.projects) || !Array.isArray(catalog.categories)) {
        throw Error("Invalid catalog");
      }
      state.catalog=catalog;
      const batches=await Promise.all([loadOptional("data/phase1.json"),loadOptional("data/phase2.json")]);
      batches.flat().forEach(e => {
        if (typeof e.name === "string" && !state.projects.has(e.name)) state.projects.set(e.name,e);
      });
      $("total").textContent=String(catalog.projects.length);
      $("tracked").textContent=String(state.projects.size);
      $("category-count").textContent=String(catalog.categories.length);
      [{id:"all",name:"所有分类",count:catalog.projects.length},...catalog.categories].forEach(c => {
        const button=document.createElement("button");
        button.type="button"; button.className="chip"; button.dataset.category=c.id;
        button.textContent=c.name + " · " + c.count;
        button.addEventListener("click",()=>{state.category=c.id;render();});
        chips.append(button);
        if (c.id!=="all") {
          const option=document.createElement("option");
          option.value=c.id;option.textContent=c.name;filters.category.append(option);
        }
      });
      filters.search.addEventListener("input",render);
      filters.category.addEventListener("change",()=>{state.category=filters.category.value;render();});
      ["mode","verification","sort"].forEach(k=>filters[k].addEventListener("change",render));
      $("reset").addEventListener("click",clearFilters);
      $("empty-reset").addEventListener("click",clearFilters);
      document.addEventListener("keydown",event=>{
        if(event.key==="/" && !event.ctrlKey && !event.metaKey &&
          !["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName)){
          event.preventDefault();filters.search.focus();
        }
      });
      render();
    } catch(err) {
      $("counter").textContent="目录加载失败";
      $("empty").hidden=false;
      $("empty").querySelector("h3").textContent="暂时无法加载目录";
      $("empty").querySelector("p").textContent="可前往 GitHub README 浏览完整清单。";
      console.error("Games Atlas catalog error:",err);
    }
  }

  const theme=$("theme");
  let savedTheme;
  try {savedTheme=localStorage.getItem("games-atlas-theme");} catch(_) {}
  if(savedTheme==="light") document.documentElement.dataset.theme="light";
  const updateTheme=()=> {
    const light=document.documentElement.dataset.theme==="light";
    theme.setAttribute("aria-pressed",String(light));
    theme.setAttribute("aria-label",light?"切换深色主题":"切换浅色主题");
  };
  theme.addEventListener("click",()=>{
    const light=document.documentElement.dataset.theme==="light";
    document.documentElement.dataset.theme=light?"dark":"light";
    try {localStorage.setItem("games-atlas-theme",light?"dark":"light");} catch(_) {}
    updateTheme();
  });
  updateTheme();
  init();
})();
