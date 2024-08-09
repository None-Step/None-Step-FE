// 깃허브 업로드시 mkcert 빼고 올려야 함

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import mkcert from "vite-plugin-mkcert";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        // mkcert({
        //   certFile: "/Users/seul/Library/Application Support/mkcert/localhost.pem",
        //   keyFile: "/Users/seul/Library/Application Support/mkcert/localhost-key.pem",
        // }),
      ],
    // server: {
    //     https: true,
    // },
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

