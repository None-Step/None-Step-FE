
/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            { find: "@", replacement: resolve(__dirname, "src") },
            { find: "@apis", replacement: resolve(__dirname, "src/apis") },
            {
                find: "@assets",
                replacement: resolve(__dirname, "src/assets"),
            },
            {
                find: "@components",
                replacement: resolve(__dirname, "src/components"),
            },
            {
                find: "@hooks",
                replacement: resolve(__dirname, "src/hooks"),
            },
            {
                find: "@layout",
                replacement: resolve(__dirname, "src/layout"),
            },
            { find: "@pages", replacement: resolve(__dirname, "src/pages") },
            {
                find: "@routes",
                replacement: resolve(__dirname, "src/routes"),
            },
            { find: "@store", replacement: resolve(__dirname, "src/store") },
            {
                find: "@styles",
                replacement: resolve(__dirname, "src/styles"),
            },
        ],
    },
    build: {
        rollupOptions: {
            external: ['redux-persist', 'redux-persist/integration/react']
        }
    }
});