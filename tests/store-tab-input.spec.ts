import { expect, test } from "@playwright/test";

test.describe("store-tab-input", () => {
  test("name과 age를 변경하면 data에 반영된다", async ({ page }) => {
    await page.goto("/#/store-tab-input");

    // data의 초기값 확인
    const pre = page.locator("pre").nth(0);
    await expect(pre).toContainText('{ "name": "name", "age": "age" }');

    // name 입력
    const InputName = page.locator("input").nth(0);
    await expect(InputName).toHaveValue("name");
    await InputName.fill("Alice");
    await expect(InputName).toHaveValue("Alice");

    // age 입력
    const tab2btn = page.locator("button").nth(1);
    await tab2btn.click();
    const InputAge = page.locator("input").nth(0);
    await expect(InputName).toHaveValue("age");
    await InputName.fill("999");
    await expect(InputAge).toHaveValue("999");

    // data의 값 확인
    await expect(pre).toContainText('{ "name": "Alice", "age": "999" }');

    // tab을 전환해도 data가 유지
    const tab1btn = page.locator("button").nth(1);
    await tab1btn.click();
    await expect(pre).toContainText('{ "name": "Alice", "age": "999" }');

    // 새로고침 하면 값 초기화
    await page.reload();
    await expect(pre).toContainText('{ "name": "name", "age": "age" }');
  });
});
