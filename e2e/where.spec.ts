import { test, expect } from "@playwright/test";
test("where the key travels on the wire", async ({ page }) => {
  const seen: string[] = [];
  await page.route("**/generativelanguage.googleapis.com/**", route => {
    const r = route.request(); const h = r.headers();
    seen.push("URL: " + r.url());
    seen.push("x-goog-api-key header: " + (h["x-goog-api-key"] ?? "(absent)"));
    route.fulfill({ status: 200, contentType: "application/json",
      body: JSON.stringify({ candidates: [{ content: { role: "model", parts: [{ text: "MOCKED reply" }] }, finishReason: "STOP" }], usageMetadata: { promptTokenCount: 1, candidatesTokenCount: 1, totalTokenCount: 2 } }) });
  });
  await page.goto("/");
  await page.getByLabel("message").fill("hello");
  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.locator('li[data-role="assistant"]')).toHaveText(/MOCKED/, { timeout: 15000 });
  console.log(seen.join("\n"));
});
