(async function () {
  const $ = (id) => document.getElementById(id);
  const cards = $("cards");
  const chips = $("chips");
  const select = $("category");
  const query = $("search");
  let catalog;
  let phase1 = new Map();
  let active = "all";
  const verifyLabels = {
    "browser-ci": "浏览器自动化通过 · 线上待核验",
    "unit-ci": "自动测试通过 · 实机待核验",
    "build-ci": "发布构建成功 · 体验待核验",
    "not-verified": "运行待核验"
  };
  const label = (id) => id === "all" ? "全部分类" : catalog.categories.find(c => c.id === id)?.name || id;
  const render = () => {
    const term = query.value.trim().toLocaleLowerCase();
    const rows = catalog.projects.filter(p =>
      (active === "all" || p.category === active) &&
      (p.name.toLocaleLowerCase().includes(term) ||
       p.description.toLocaleLowerCase().includes(term) ||
       label(p.category).toLocaleLowerCase().includes(term)));
    $("counter").textContent = "显示 " + rows.length + " / " + catalog.projects.length + " 个项目";
    $("empty").hidden = rows.length > 0;
    cards.replaceChildren();
    rows.forEach(p => {
      const card = document.createElement("article");
      card.className = "project";
      const evidence = phase1.get(p.name);
      const kinds = {"desktop":"桌面游戏","local-web":"本地 Web","browser-candidate":"浏览器候选"};
      const meta = document.createElement("div"); meta.className = "meta";
      meta.textContent = label(p.category) + " · " + (kinds[evidence?.mode] || "项目资源");
      const heading = document.createElement("h4"); heading.textContent = p.name;
      const desc = document.createElement("p"); desc.textContent = p.description;
      const bottom = document.createElement("div"); bottom.className = "bottom";
      const state = document.createElement("span");
      state.textContent = (evidence ? verifyLabels[evidence.validation] : "运行状态未核验") +
        (evidence?.availability === "deployment-blocked" ? " · 部署受阻" : "");
      if (evidence?.note) state.title = evidence.note;
      const links = document.createElement("div"); links.className = "links";
      const upstream = document.createElement("a");
      upstream.dataset.role = "repo"; upstream.href = p.url;
      upstream.target = "_blank"; upstream.rel = "noopener noreferrer";
      upstream.textContent = "原仓库 ↗"; links.append(upstream);
      if (evidence?.evidence?.length) {
        const proof = document.createElement("a");
        proof.dataset.role = "evidence"; proof.href = evidence.evidence[0];
        proof.target = "_blank"; proof.rel = "noopener noreferrer";
        proof.textContent = "验证记录 ↗"; links.append(proof);
      }
      bottom.append(state, links);
      card.append(meta, heading, desc, bottom); cards.appendChild(card);
    });
    Array.from(chips.children).forEach(b => {
      const selected = b.dataset.category === active;
      b.classList.toggle("active", selected);
      b.setAttribute("aria-pressed", String(selected));
    });
    select.value = active;
  };
  try {
    const response = await fetch("data/catalog.json", {cache:"no-store"});
    if (!response.ok) throw new Error("HTTP " + response.status);
    catalog = await response.json();
    try {
      const phaseResponse = await fetch("data/phase1.json", {cache:"no-store"});
      if (phaseResponse.ok) {
        const phaseData = await phaseResponse.json();
        phase1 = new Map(phaseData.projects.map(row => [row.name, row]));
      }
    } catch (error) {
      // Never show a playable label when evidence is missing.
      console.warn("Experience evidence unavailable; showing unverified states", error);
    }
    $("total").textContent = String(catalog.projects.length);
    [{id:"all",name:"全部分类"}, ...catalog.categories].forEach(cat => {
      const button = document.createElement("button");
      button.type = "button"; button.className = "chip"; button.dataset.category = cat.id;
      button.textContent = cat.name + (cat.id === "all" ? "" : " · " + cat.count);
      button.addEventListener("click", () => {active = cat.id; render()});
      chips.appendChild(button);
      if(cat.id !== "all") {
        const option = document.createElement("option");
        option.value=cat.id; option.textContent=cat.name; select.appendChild(option);
      }
    });
    select.addEventListener("change", () => {active=select.value;render()});
    query.addEventListener("input", render);
    render();
  } catch(err) {
    $("counter").textContent = "目录加载失败";
    $("empty").hidden = false;
    $("empty").textContent = "目录数据暂时无法加载。请通过 GitHub README 浏览项目。";
    console.error("Catalog loading failed",err);
  }
})();