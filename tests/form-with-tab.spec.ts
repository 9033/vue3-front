import { expect, test } from "@playwright/test";

test.describe("form-with-tab Input1", () => {
  test("Input1에서 이름을 바꾸면 data와 data2가 함께 반영된다", async ({
    page,
  }) => {
    await page.goto("/#/form-with-tab/Input1");

    await expect(page).toHaveURL(/#\/form-with-tab\/Input1$/);

    const topTable = page.locator("table").nth(0);
    const resultTable = page.locator("table").nth(1);
    const input1Table = page.locator("table").nth(2);
    const input2Table = page.locator("table").nth(3);

    const topDataInput = topTable.locator("input").nth(0);
    const topData2Input = topTable.locator("input").nth(1);
    const lowerDataInput = input1Table.locator("input").nth(0);
    const lowerData2Input = input2Table.locator("input").nth(0);

    await topDataInput.fill("Alice");

    // 의도된 동작이라서 네 입력창이 모두 같은 값으로 동기화되는지 확인한다.
    await expect(topDataInput).toHaveValue("Alice");
    await expect(topData2Input).toHaveValue("Alice");
    await expect(lowerDataInput).toHaveValue("Alice");
    await expect(lowerData2Input).toHaveValue("Alice");

    // 결과 영역도 같은 이름을 보여줘야 이후 리팩터링에서 의도가 유지된다.
    await expect(resultTable).toContainText('{ "name": "Alice" }');
    await expect(resultTable).toContainText('{ "name": "Alice", "age": 0 }');
  });
});
