import { test, expect } from "@playwright/test";
test("Gemini intercepted — no key, no network", async ({ page }) => {
  await page.route("**/generativelanguage.googleapis.com/**", route => route.fulfill({
    status: 200, contentType: "application/json",
    body: JSON.stringify({ candidates: [{ content: { role: "model", parts: [{ text: "MOCKED: file GSTR-3B by the 20th." }] }, finishReason: "STOP" }], usageMetadata: { promptTokenCount: 1, candidatesTokenCount: 1, totalTokenCount: 2 } }),
  }));
  await page.goto("/");
  await page.getByLabel("message").fill("hello");
  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.locator('li[data-role="assistant"]')).toHaveText(/MOCKED/, { timeout: 15000 });
});
