const { test, expect } = require("@playwright/test");

test("35 catalog cards and truthful evidence labels load", async ({page}) => {
  await page.goto("http://127.0.0.1:8765/");
  await expect(page.locator(".project")).toHaveCount(35);
  await expect(page.locator("#counter")).toContainText("35 / 35");
  const snake = page.locator(".project").filter({has:page.locator("h4", {hasText:"Snake_Web"})});
  await expect(snake).toContainText("浏览器自动化通过");
  await expect(snake).toContainText("线上待核验");
  await expect(page.locator(".project").filter({hasText:"Go"}).first()).not.toContainText("已在线可玩");
});

test("search and category filter are consistent and keyboard accessible", async ({page}) => {
  await page.goto("http://127.0.0.1:8765/");
  await page.locator("#search").fill("Snake_Web");
  await expect(page.locator(".project")).toHaveCount(1);
  await page.locator("#search").fill("");
  await page.locator("#category").selectOption("puzzle-casual");
  await expect(page.locator(".project")).toHaveCount(4);
  await page.getByRole("button",{name:/街机与动作/}).click();
  await expect(page.locator(".project")).toHaveCount(7);
});

test("safe external links and empty search state", async ({page}) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto("http://127.0.0.1:8765/");
  const card = page.locator(".project").first();
  await expect(card).toBeVisible();
  await expect(card).toHaveAttribute("rel",/noopener noreferrer/);
  await expect(card).toHaveAttribute("href",/^https:\/\/github\.com\/1998x-stack\//);
  await page.locator("#search").fill("absent-project-xyz");
  await expect(page.locator(".project")).toHaveCount(0);
  await expect(page.locator("#empty")).toBeVisible();
});
