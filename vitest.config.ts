/// <reference types="vitest" />
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
  },
})
