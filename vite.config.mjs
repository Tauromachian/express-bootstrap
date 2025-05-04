import { defineConfig } from "vite";

import dotenv from "dotenv";

import path from "node:path";

dotenv.config();

export default defineConfig({
  root: "client",
  build: {
    outDir: "../public/dist",
    emptyOutDir: true,
    minify: process.env.APP_ENV === "production",
    rollupOptions: {
      input: path.join(__dirname, "resources", "index.js"),
      output: {
        entryFileNames: "main.js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
});
