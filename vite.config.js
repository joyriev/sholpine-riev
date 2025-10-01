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
      minify: isProduction ? "esbuild" : false,
      sourcemap: !isProduction,
      rollupOptions: {
        output: {
          entryFileNames: isProduction
            ? "assets/[name]-[hash].min.js"
            : "assets/[name].js",
          chunkFileNames: isProduction
            ? "assets/[name]-[hash].min.js"
            : "assets/[name].js",
          assetFileNames: ({ name }) => {
            if (/\.[a-z]+$/.test(name)) {
              const ext = name.split(".").pop();
              return isProduction
                ? `assets/[name]-[hash].min.${ext}`
                : `assets/[name].${ext}`;
            }
            return "assets/[name]-[hash][extname]";
          },
        },
      },
    },
  };
});
