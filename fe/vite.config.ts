import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import prerender from "@prerenderer/rollup-plugin";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      react(),
      prerender({
        routes: ["/", "/main"],
        renderer: "@prerenderer/renderer-puppeteer",
        server: {
          port: Number(env.VITE_SERVER_PORT),
          host: env.VITE_SERVER_HOST,
        },
        rendererOptions: {
          maxConcurrentRoutes: 1,
          renderAfterTime: 500,
        },
        postProcess(renderedRoute) {
          renderedRoute.html = renderedRoute.html
            .replace(/http:/i, "https:")
            .replace(
              /(https:\/\/)?(localhost|127\.0\.0\.1):\d*/i,
              env.VITE_BASE_URL
            );
        },
      }),
    ],
  };
});
