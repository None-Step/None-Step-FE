import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        mkcert({
            certFileName: "./localhost+1.pem",
            keyFileName: "./localhost+1-key.pem",
        }),
    ],
    server: {
        https: true,
    },
    resolve: {
        alias: [
            { find: "@/", replacement: "/src" },
            { find: "@/apis", replacement: "/src/apis" },
            { find: "@/assets", replacement: "/src/assets" },
            {
                find: "@/components",
                replacement: "/src/components",
            },
            { find: "@/layout", replacement: "/src/layout" },
            { find: "@/pages", replacement: "/src/pages" },
            { find: "@/routes", replacement: "/src/routes" },
            { find: "@/store", replacement: "/src/store" },
            { find: "@/styles", replacement: "/src/styles" },
            { find: "@/hooks", replacement: "/src/hooks" },
        ],
    },
    build: {
        rollupOptions: {
          external: ['redux-persist', 'redux-persist/integration/react']
        }
    }
});
