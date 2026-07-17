import { expect, test } from "@playwright/test";

test.describe("store-tab-input", () => {
  test("name과 age를 변경하면 data에 반영된다", async ({ page }) => {
    await page.goto("/#/store-tab-input");

    const pre = page.locator("pre").nth(0);
    await expect(pre).toContainText('{ "name": "name", "age": "age" }');

    const InputName = page.locator("input").nth(0);
    await expect(InputName).toHaveValue("name");
    await InputName.fill("Alice");
    await expect(InputName).toHaveValue("Alice");

    const tab2btn = page.locator("button").nth(1);
    await tab2btn.click();

    const InputAge = page.locator("input").nth(0);
    await expect(InputName).toHaveValue("age");
    await InputName.fill("999");
    await expect(InputAge).toHaveValue("999");

    await expect(pre).toContainText('{ "name": "Alice", "age": "999" }');

    const tab1btn = page.locator("button").nth(1);
    await tab1btn.click();

    await expect(pre).toContainText('{ "name": "Alice", "age": "999" }');
  });
});
