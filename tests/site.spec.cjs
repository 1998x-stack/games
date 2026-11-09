const {test,expect} = require("@playwright/test");
const fs = require("node:fs");

const URL = "http://127.0.0.1:8765/";

test("catalog and all three batch manifests load without misleading playable claims", async ({page}) => {
  await page.goto(URL);
  await expect(page.locator(".project")).toHaveCount(35);
  await expect(page.locator("#counter")).toContainText("35 / 35");
  await expect(page.locator("#tracked")).toHaveText("35");
  const snake = page.locator(".project").filter({has:page.locator("h4",{hasText:"Snake_Web"})});
  await expect(snake).toContainText("浏览器测试通过");
  await expect(snake).toContainText("部署受阻");
  const math = page.locator(".project").filter({has:page.locator("h4",{hasText:"math_game"})});
  await expect(math).toContainText("自动测试通过");
  const blocked = await page.locator(".project").allTextContents();
  expect(blocked.some(text=>text.includes("已在线可玩"))).toBe(false);
});

test("search, category chips, keyboard shortcut and reset", async ({page}) => {
  await page.goto(URL);
  await expect(page.locator(".project")).toHaveCount(35);
  await page.keyboard.press("/");
  await expect(page.locator("#search")).toBeFocused();
  await page.locator("#search").fill("Snake_Web");
  await expect(page.locator(".project")).toHaveCount(1);
  await page.locator("#search").fill("");
  await page.locator("#category").selectOption("puzzle-casual");
  await expect(page.locator(".project")).toHaveCount(4);
  await page.getByRole("button",{name:/街机与动作/}).click();
  await expect(page.locator(".project")).toHaveCount(7);
  await page.locator("#reset").click();
  await expect(page.locator(".project")).toHaveCount(35);
});

test("mode and verification filters distinguish game types and CI outcomes", async ({page}) => {
  await page.goto(URL);
  await page.locator("#mode").selectOption("desktop");
  await expect(page.locator(".project")).toHaveCount(9);
  await page.locator("#mode").selectOption("browser-candidate");
  await expect(page.locator(".project")).toHaveCount(3);
  await page.locator("#mode").selectOption("environment");
  await expect(page.locator(".project")).toHaveCount(9);
  await page.locator("#mode").selectOption("game-ai");
  await expect(page.locator(".project")).toHaveCount(7);
  await page.locator("#mode").selectOption("creation-tool");
  await expect(page.locator(".project")).toHaveCount(2);
  await page.locator("#mode").selectOption("resource");
  await expect(page.locator(".project")).toHaveCount(3);
  await page.locator("#mode").selectOption("all");
  await page.locator("#verification").selectOption("evidence");
  await expect(page.locator(".project")).toHaveCount(27);
  await page.locator("#verification").selectOption("failed");
  await expect(page.locator(".project")).toHaveCount(1);
  await expect(page.locator(".project")).toContainText("happyLandlord");
  await page.locator("#verification").selectOption("pending");
  await expect(page.locator(".project")).toHaveCount(7);
  await page.locator("#verification").selectOption("all");
  await expect(page.locator(".project")).toHaveCount(35);
});

test("source and evidence links are distinct and secure", async ({page}) => {
  await page.goto(URL);
  await expect(page.locator(".project a[data-role='repo']")).toHaveCount(35);
  // One latest proof link per evidenced project; full history stays in phase JSON.
  await expect(page.locator(".project a[data-role='evidence']")).toHaveCount(28);
  const card = page.locator(".project").filter({has:page.locator("h4",{hasText:"gomoku-exact5-env"})});
  await expect(card.locator("a[data-role='evidence']")).toHaveAttribute("href", /actions\/runs\//);
  for (const link of await page.locator(".project a").all()) {
    await expect(link).toHaveAttribute("rel", /noopener noreferrer/);
    await expect(link).toHaveAttribute("href", /^https:\/\/github\.com\/1998x-stack\//);
  }
});

test("empty state, restore, theme persistence and responsive viewport", async ({page}) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto(URL);
  await page.locator("#search").fill("absent-project-xyz");
  await expect(page.locator("#empty")).toBeVisible();
  await page.locator("#empty-reset").click();
  await expect(page.locator(".project")).toHaveCount(35);
  await page.locator("#theme").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme","light");
  await expect(page.locator("#theme")).toHaveAttribute("aria-pressed","true");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme","light");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(overflow).toBe(false);
  fs.mkdirSync("screenshots",{recursive:true});
  await page.screenshot({path:"screenshots/mobile-390.png",fullPage:true});
});

test("desktop design screenshot and semantic structure", async ({page}) => {
  await page.setViewportSize({width:1440,height:900});
  await page.goto(URL);
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("heading",{level:1})).toHaveCount(1);
  await expect(page.locator("#chips button")).toHaveCount(8);
  await expect(page.locator(".project")).toHaveCount(35);
  fs.mkdirSync("screenshots",{recursive:true});
  await page.screenshot({path:"screenshots/desktop-1440.png",fullPage:true});
});

test("third-batch evidence and restrictions cannot imply online play", async ({page}) => {
  await page.goto(URL);
  const creator = page.locator(".project").filter({has:page.locator("h4",{hasText:"AI-Game-Generator"})});
  await expect(creator).toContainText("Chromium 沙箱隔离通过");
  await expect(creator).toContainText("需服务端运行");
  await expect(creator.locator("a[data-role='evidence']")).toHaveAttribute("href", /actions\/runs\//);
  const restricted = page.locator(".project").filter({has:page.locator("h4",{hasText:"hok_env"})});
  await expect(restricted).toContainText("平台或授权受限");
  const legacy = page.locator(".project").filter({has:page.getByRole("heading",{name:"gym",exact:true})});
  await expect(legacy).toContainText("历史依赖限制");
});

test("missing optional third manifest cannot create false verification", async ({page}) => {
  await page.route("**/data/phase3.json",route=>route.fulfill({status:404,body:"not found"}));
  await page.goto(URL);
  await expect(page.locator(".project")).toHaveCount(35);
  await expect(page.locator("#tracked")).toHaveText("23");
  const generator = page.locator(".project").filter({has:page.locator("h4",{hasText:"AI-Game-Generator"})});
  await expect(generator).toContainText("尚未进入运行验证批次");
  // Its categorical type is still correct even without the optional P3 manifest.
  await expect(generator).toContainText("游戏创作工具 / 游戏创作工具");
  await expect(generator.locator("a[data-role='evidence']")).toHaveCount(0);
});

test("P3 microRTS result and environment index evidence are scoped", async ({page}) => {
  await page.goto(URL);
  const match = page.locator(".project").filter({has:page.getByRole("heading",{name:"microrts",exact:true})});
  await expect(match).toContainText("真实 AI 对局通过");
  await expect(match.locator("a[data-role='evidence']")).toHaveAttribute("href", /microrts\/actions\/runs\//);
  const index = page.locator(".project").filter({has:page.getByRole("heading",{name:"awesome-rl-envs",exact:true})});
  await expect(index).toContainText("链接未实测");
  await expect(index.locator("a[data-role='evidence']")).toHaveAttribute("href", /awesome-rl-envs\/actions\/runs\//);
});

test("P3 CPU experiment and game-packager security evidence remain scoped", async ({page}) => {
  await page.goto(URL);
  const book = page.locator(".project").filter({has:page.getByRole("heading",{name:"Deep-Reinforcement-Learning-Hands-On",exact:true})});
  await expect(book).toContainText("CPU 实验基线复现");
  await expect(book).toContainText("历史依赖限制");
  await expect(book.locator("a[data-role='evidence']")).toHaveAttribute("href", /Deep-Reinforcement-Learning-Hands-On\/actions\/runs\//);
  const studio = page.locator(".project").filter({has:page.getByRole("heading",{name:"ai-game",exact:true})});
  await expect(studio).toContainText("打包安全回归通过");
  await expect(studio).toContainText("需服务端运行");
  await expect(studio.locator("a[data-role='evidence']")).toHaveAttribute("href", /ai-game\/actions\/runs\//);
});

test("P3 Actor-Critic genuinely trains on CPU but original deep model remains unverified", async ({page}) => {
  await page.goto(URL);
  const card = page.locator(".project").filter({has:page.getByRole("heading",{name:"RL-Adventure-2",exact:true})});
  await expect(card).toContainText("实测多进程 A2C 与同步一致");
  await expect(card).toContainText("原旧版源码待验");
  await expect(card).toContainText("历史依赖限制");
  await expect(card.locator("a[data-role='evidence']")).toHaveAttribute("href", /RL-Adventure-2\/actions\/runs\/42646793026/);
  await page.locator("#verification").selectOption("evidence");
  await expect(page.locator(".project")).toHaveCount(27);
  await page.locator("#mode").selectOption("game-ai");
  await expect(card).toBeVisible();
});

test("P3 comparison-card links are evidence-scoped and never imply PyTorch wins", async ({page}) => {
  await page.goto(URL);
  const card = page.locator(".project").filter({has:page.getByRole("heading",{name:"RL-Adventure-2",exact:true})});
  await expect(card).toContainText("实测多进程 A2C 与同步一致");
  await expect(card).not.toContainText("已在线可玩");
  await expect(card.locator("a[data-role='evidence']")).toHaveAttribute("href", /42646793026/);
});

test("P3 original-horizon A2C evidence keeps different training budgets explicit", async ({page}) => {
  await page.goto(URL);
  const card = page.locator(".project").filter({has:page.getByRole("heading",{name:"RL-Adventure-2",exact:true})});
  await expect(card).toContainText("实测多进程 A2C 与同步一致");
  await expect(card).toContainText("原旧版源码待验");
  await expect(card.locator("a[data-role='evidence']")).toHaveAttribute("href", /42646793026/);
  await expect(card).not.toContainText("完整原版 Notebook 已验收");
  await page.locator("#verification").selectOption("evidence");
  await expect(page.locator(".project")).toHaveCount(27);
});

test("P3 actual spawned-worker parity preserves historical legacy limitation", async ({page}) => {
  await page.goto(URL);
  const card=page.locator(".project").filter({has:page.getByRole("heading",{name:"RL-Adventure-2",exact:true})});
  await expect(card).toContainText("实测多进程 A2C 与同步一致");
  await expect(card).toContainText("原旧版源码待验");
  await expect(card.locator("a[data-role='evidence']")).toHaveAttribute("href", /RL-Adventure-2\/actions\/runs\/42646793026/);
  await expect(card).not.toContainText("已在线可玩");
});

test("phase deep links, backlog-first sort and mobile-readable evidence scope", async ({page}) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto(URL + "?batch=p2&verification=pending&sort=pending");
  await expect(page.locator("#batch")).toHaveValue("p2");
  await expect(page.locator("#verification")).toHaveValue("pending");
  await expect(page.locator(".project")).toHaveCount(3);
  await page.locator("#verification").selectOption("all");
  await expect(page.locator(".project")).toHaveCount(13);
  const firstCard=page.locator(".project").first();
  await expect(firstCard).toContainText("happyLandlord"); // outstanding failed CI first
  const go=page.locator(".project").filter({has:page.getByRole("heading",{name:"go_gym",exact:true})});
  await expect(go).toContainText("教学环境协议通过");
  await expect(go).toContainText("P2");
  await go.locator("summary").click();
  await expect(go.locator("details p")).toContainText("普通劫");
  await expect(go.locator("details p")).toBeVisible();
  await expect(go.locator("a[data-role='evidence']")).toHaveAttribute("href","https://github.com/1998x-stack/go_gym/actions/runs/42646215027");
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1);
  expect(overflow).toBe(false);
  await page.reload();
  await expect(page.locator("#batch")).toHaveValue("p2");
  await expect(page.locator("#verification")).toHaveValue("all");
  await expect(page.locator(".project")).toHaveCount(13);
  await page.locator("#reset").click();
  await expect(page.locator(".project")).toHaveCount(35);
  expect(new globalThis.URL(page.url()).search).toBe("");
});

test("unrelated workflow URL never upgrades a project's verification status", async ({page}) => {
  await page.route("**/data/phase2.json", async route => {
    const response=await route.fetch();
    const data=await response.json();
    data.projects.find(p=>p.name==="go_gym").evidence=[
      "https://github.com/1998x-stack/another-project/actions/runs/123456"
    ];
    await route.fulfill({json:data});
  });
  await page.goto(URL);
  const go=page.locator(".project").filter({has:page.getByRole("heading",{name:"go_gym",exact:true})});
  await expect(go).toContainText("尚待运行验证");
  await expect(go.locator("a[data-role='evidence']")).toHaveCount(0);
  await go.locator("summary").click();
  await expect(go.locator("details p")).toContainText("验证记录缺失或与该项目不匹配");
});

test("P2 Tetris gameplay proof is scoped to mechanics and random policy, not DQN", async ({page}) => {
  await page.goto(URL + "?batch=p2&mode=game-ai");
  const card=page.locator(".project").filter({has:page.getByRole("heading",{name:"TetrominoDQN",exact:true})});
  await expect(card).toContainText("实际玩法规则及随机基线通过");
  await expect(card).toContainText("DQN 训练待验");
  await expect(card).toContainText("P2");
  await card.locator("summary").click();
  await expect(card.locator("details p")).toContainText("尚未训练或评估 DQN");
  await expect(card.locator("a[data-role='evidence']")).toHaveAttribute("href",
    "https://github.com/1998x-stack/TetrominoDQN/actions/runs/42649593846");
  await page.locator("#verification").selectOption("evidence");
  await expect(card).toBeVisible();
});
