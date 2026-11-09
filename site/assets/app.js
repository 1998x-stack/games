(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const cards = $("cards"), chips = $("chips");
  const filters = {search:$("search"),category:$("category"),batch:$("batch"),
    mode:$("mode"),verification:$("verification"),sort:$("sort")};
  const labels = {
    "browser-ci":"浏览器测试通过 · 线上待验",
    "build-ci":"构建成功 · 玩法待验",
    "unit-ci":"自动测试通过 · 实机待验",
    "ci-failed":"现有 CI 失败 · 需修复",
    "not-verified":"尚待运行验证",
    "environment-ci":"教学环境协议通过 · 其他示例待验",
    "security-ci":"Chromium 沙箱隔离通过 · 整体服务待验",
    "component-ci":"算法组件测试通过 · 训练待验",
    "historical-ci":"历史 CI 成功 · 本轮未复测",
    "match-ci":"真实 AI 对局通过 · 非在线试玩",
    "index-ci":"游戏环境索引一致 · 链接未实测",
    "experiment-ci":"CPU 实验基线复现 · 原书训练待验",
    "packager-ci":"打包安全回归通过 · 整体服务待验",
    "training-ci":"CPU Actor-Critic 训练通过 · 深度模型待验",
    "comparison-ci":"CPU 线性/神经网络对照通过 · 原 A2C 待验",
    "vector-a2c-ci":"向量化 n-step A2C 复现通过 · 原多进程实现待验",
    "subprocess-ci":"实测多进程 A2C 与同步一致 · 原旧版源码待验"
  };
  const types = {"desktop":"桌面游戏","browser-candidate":"浏览器候选",
    "local-web":"本地 Web","environment":"AI / RL 环境",
    "game-ai":"游戏 AI 研究", "creation-tool":"游戏创作工具", "resource":"教程与资料", "unclassified":"运行形态未核实"};
  const ok = value => typeof value === "string" &&
    /^https:\/\/github\.com\/1998x-stack\/[A-Za-z0-9._-]+(?:\/.*)?$/.test(value);
  const proofOk = (name, url) => {
    const prefix = "https://github.com/1998x-stack/" + name + "/actions/runs/";
    return typeof url === "string" && url.startsWith(prefix) &&
      /^[0-9]+$/.test(url.slice(prefix.length));
  };
  const state = {catalog:null, projects:new Map(), category:"all"};
  const hasPass = e => e && ["browser-ci","build-ci","unit-ci","environment-ci","security-ci","component-ci","historical-ci","match-ci","index-ci","experiment-ci","packager-ci","training-ci","comparison-ci","vector-a2c-ci","subprocess-ci"].includes(e.validation);
  const fallbackType = {
    "game-creation": "creation-tool",
    "game-environments": "environment",
    "game-ai": "game-ai",
    "learning-resources": "resource"
  };
  // A missing optional manifest must never turn every unverified game into a resource.
  const kind = (p, e) => e?.mode || fallbackType[p.category] || "unclassified";

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
    const mode = document.createElement("span"); mode.textContent = types[kind(p, e)];
    meta.append(category, separator, mode);
    if (e?.batch) {
      const phase=document.createElement("span");
      phase.className="phase-label";
      phase.textContent=e.batch.toUpperCase();
      meta.append(phase);
    }
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
    const restriction = {
      "needs-server":"需服务端运行",
      "restricted":"平台或授权受限",
      "legacy":"历史依赖限制"
    }[e?.availability];
    if (restriction) {
      signal.textContent += " · " + restriction;
      if (e?.availability === "restricted") signal.classList.add("signal--blocked");
    }
    if (e?.note) signal.title = e.note;
    const details=document.createElement("details");
    details.className="evidence-details";
    if (e?.note) {
      const summary=document.createElement("summary");
      summary.textContent="验证范围与限制";
      const explanation=document.createElement("p");
      explanation.textContent=e.note;
      details.append(summary, explanation);
    }
    const links = document.createElement("div"); links.className="links";
    links.append(externalLink(p.url, "原仓库 ↗", "repo"));
    if (e?.evidence?.length && proofOk(p.name, e.evidence[0])) {
      links.append(externalLink(e.evidence[0], "验证记录 ↗", "evidence"));
    }
    bottom.append(signal, links);
    card.append(meta, name, desc);
    if (e?.note) card.append(details);
    card.append(bottom);
    return card;
  }

  function render() {
    const {catalog} = state; if (!catalog) return;
    const q = filters.search.value.trim().toLocaleLowerCase();
    let rows = catalog.projects.filter(p => {
      const e = getEvidence(p);
      if (state.category !== "all" && p.category !== state.category) return false;
      if (filters.batch.value !== "all" && e?.batch !== filters.batch.value) return false;
      if (filters.mode.value !== "all" && kind(p, e) !== filters.mode.value) return false;
      if (filters.verification.value === "evidence" && !hasPass(e)) return false;
      if (filters.verification.value === "failed" && e?.validation !== "ci-failed") return false;
      if (filters.verification.value === "pending" && (hasPass(e) || e?.validation === "ci-failed")) return false;
      return !q || [p.name,p.description,categoryName(p.category),types[kind(p, e)],e?.note || ""]
        .some(v => v.toLocaleLowerCase().includes(q));
    });
    if (filters.sort.value === "name") {
      rows.sort((a,b) => a.name.localeCompare(b.name,"zh-CN",{numeric:true}));
    } else if (filters.sort.value === "evidence") {
      rows.sort((a,b) => Number(hasPass(getEvidence(b))) - Number(hasPass(getEvidence(a))));
    } else if (filters.sort.value === "pending") {
      const priority = e => e?.validation === "ci-failed" ? 0 : hasPass(e) ? 2 : 1;
      rows.sort((a,b) => priority(getEvidence(a)) - priority(getEvidence(b)));
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
    syncUrl();
  }

  function syncUrl() {
    const params = new URLSearchParams();
    const q=filters.search.value.trim();
    if (q) params.set("q", q);
    if (state.category !== "all") params.set("category", state.category);
    for (const key of ["batch", "mode", "verification", "sort"]) {
      if (filters[key].value !== (key === "sort" ? "default" : "all")) {
        params.set(key, filters[key].value);
      }
    }
    const query=params.toString();
    try {
      history.replaceState(null, "", location.pathname + (query ? "?" + query : "") + location.hash);
    } catch (_) { /* Browser may forbid history writes in local file previews. */ }
  }

  function restoreUrl(catalog) {
    const params=new URLSearchParams(location.search);
    const category=params.get("category");
    if (catalog.categories.some(c => c.id === category)) state.category=category;
    filters.search.value=(params.get("q") || "").slice(0, 120);
    for (const key of ["batch", "mode", "verification", "sort"]) {
      const value=params.get(key);
      if (value && Array.from(filters[key].options).some(option => option.value === value)) {
        filters[key].value=value;
      }
    }
  }

  function clearFilters() {
    filters.search.value="";
    filters.batch.value="all";
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
      const batches=await Promise.all([loadOptional("data/phase1.json"),loadOptional("data/phase2.json"),loadOptional("data/phase3.json")]);
      batches.forEach((rows, index) => rows.forEach(entry => {
        if (!entry || typeof entry.name !== "string" || state.projects.has(entry.name)) return;
        const verifiedLinks = Array.isArray(entry.evidence) ?
          entry.evidence.filter(url => proofOk(entry.name, url)) : [];
        const hasTrustedProof = verifiedLinks.length > 0;
        const validation = entry.validation !== "not-verified" && !hasTrustedProof ?
          "not-verified" : entry.validation;
        state.projects.set(entry.name, {
          ...entry,
          batch: "p" + (index + 1),
          validation,
          evidence: hasTrustedProof ? verifiedLinks : [],
          note: validation === "not-verified" && entry.validation !== "not-verified" ?
            "验证记录缺失或与该项目不匹配，暂不承认成功/失败状态。" : entry.note
        });
      }));
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
      restoreUrl(catalog);
      filters.search.addEventListener("input",render);
      filters.category.addEventListener("change",()=>{state.category=filters.category.value;render();});
      ["batch","mode","verification","sort"].forEach(k=>filters[k].addEventListener("change",render));
      $("reset").addEventListener("click",clearFilters);
      $("empty-reset").addEventListener("click",clearFilters);
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
  // Search shortcut must work even before optional manifests finish loading.
  document.addEventListener("keydown", event => {
    if (event.key === "/" && !event.ctrlKey && !event.metaKey &&
        !["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName)) {
      event.preventDefault();
      filters.search.focus();
    }
  });
  init();
})();
