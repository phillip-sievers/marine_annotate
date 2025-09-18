import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: "index.html",
                annotate: "annotate.html",
            },
        },
    },
    server: {
        proxy: {
            "/.netlify/functions": {
                target: "http://localhost:8888",
                changeOrigin: true,
            },
        },
    },
});
