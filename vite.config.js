import { defineConfig } from "vite";
import shopify from "vite-plugin-shopify";
import cleanup from "@by-association-only/vite-plugin-shopify-clean";

const isDev = process.env.NODE_ENV !== "production";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    plugins: [
      cleanup(),
      shopify({
        sourceCodeDir: "src",
        entrypointsDir: "src/entrypoints",
        themeRoot: ".",
        additionalEntrypoints: ["src/styles/*.css", "src/scripts/*.js"],
      }),
    ],
    build: {
      outDir: ".",
      emptyOutDir: false,
      minify: isProduction ? "esbuild" : false,
      sourcemap: !isProduction,
      rollupOptions: {
        output: {
          dir: ".",
          entryFileNames: isProduction
            ? "assets/theme.min.js"
            : "assets/theme.js",
          chunkFileNames: isProduction
            ? "assets/[name].min.js"
            : "assets/[name].js",
          assetFileNames: ({ name }) => {
            const ext = name.split('.').pop();
            if (ext === 'css') {
              return isProduction ? 'assets/theme.min.css' : 'assets/theme.css';
            }
            return isProduction ? 'assets/[name].min[extname]' : 'assets/[name][extname]';
          },
        },
      },
    },
  };
});
