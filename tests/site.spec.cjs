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
  await expect(page.locator(".project")).toHaveCount(8);
  await page.locator("#mode").selectOption("creation-tool");
  await expect(page.locator(".project")).toHaveCount(2);
  await page.locator("#mode").selectOption("resource");
  await expect(page.locator(".project")).toHaveCount(3);
  await page.locator("#mode").selectOption("all");
  await page.locator("#verification").selectOption("evidence");
  await expect(page.locator(".project")).toHaveCount(21);
  await page.locator("#verification").selectOption("failed");
  await expect(page.locator(".project")).toHaveCount(1);
  await expect(page.locator(".project")).toContainText("happyLandlord");
  await page.locator("#verification").selectOption("pending");
  await expect(page.locator(".project")).toHaveCount(13);
  await page.locator("#verification").selectOption("all");
  await expect(page.locator(".project")).toHaveCount(35);
});

test("source and evidence links are distinct and secure", async ({page}) => {
  await page.goto(URL);
  await expect(page.locator(".project a[data-role='repo']")).toHaveCount(35);
  await expect(page.locator(".project a[data-role='evidence']")).toHaveCount(22);
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
  await expect(creator).toContainText("预览隔离检查通过");
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
  await expect(generator.locator("a[data-role='evidence']")).toHaveCount(0);
});
