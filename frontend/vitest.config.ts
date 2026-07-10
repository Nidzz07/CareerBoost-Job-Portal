import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

// Standalone test config — intentionally does NOT import the app's vite.config.ts
// (which loads the TanStack Start plugin chain) so unit tests stay fast and isolated.
// Only the "@" path alias is mirrored so imports resolve the same way as the app.
export default defineConfig({
  resolve: {
    alias: { "@": resolve(__dirname, "src") },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
