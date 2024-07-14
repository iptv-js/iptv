import { defineConfig } from "tsup";

export const tsup = defineConfig({
  entry: ["src/main.ts"],
  outDir: "lib",
  clean: true,
  format: ["esm"],
  minify: process.env.NODE_ENV !== "development",
});
