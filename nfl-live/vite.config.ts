import { defineConfig } from "vite";

import mkcert from "vite-plugin-mkcert";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import zipPack from "vite-plugin-zip-pack";

import path from "path";

const cwd = process.cwd();

export default defineConfig({
  base: "./",
  publicDir: path.join(cwd, "public"),
  root: path.join(cwd, "src"),
  build: {
    minify: false,
    cssMinify: false,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        settings: path.join(cwd, "src/settings.html"),
        index: path.join(cwd, "src/index.html"),
      },
      output: {
        dir: path.join(cwd, "dist"),
      },
    },
  },
  server: {
    port: 8080,
    strictPort: true,
  },
  plugins: [
    mkcert(),
    react(),
    tsconfigPaths({
      root: cwd,
    }),
    zipPack({
      inDir: path.join(cwd, "dist"),
      outDir: path.join(cwd, "dist"),
    }),
  ],
});
