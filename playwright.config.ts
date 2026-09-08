import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "e2e", timeout: 60000,
  use: { baseURL: process.env.GITHUB_ACTIONS ? "http://127.0.0.1:4173/caramel-ca-buddy-pipeline-check/" : "http://127.0.0.1:4173/", headless: true },
  webServer: { command: "npx vite preview --port 4173 --strictPort --host 127.0.0.1", url: "http://127.0.0.1:4173", reuseExistingServer: true, timeout: 30000 },
});
