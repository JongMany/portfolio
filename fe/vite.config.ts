import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import prerender from "@prerenderer/rollup-plugin";
import puppeteerRenderer from "@prerenderer/renderer-puppeteer";
import puppeteer from "puppeteer";

//https://velog.io/@parallelkim/%EB%A6%AC%EC%95%A1%ED%8A%B8-SEO%EC%97%90-%EA%B4%80%ED%95%9C-%EB%AA%A8%EB%93%A0-%EA%B2%83
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  (async () => {
    const browser = await puppeteer.launch({
      headless: true, // 브라우저가 백그라운드에서 실행되도록 설정
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("http://example.com");
    const html = await page.content();
    console.log(html);
    await browser.close();
  })();

  return {
    plugins: [
      react(),
      prerender({
        routes: ["/", "/main"],
        renderer: puppeteerRenderer,
        // server: {
        //   port: Number(env.VITE_SERVER_PORT),
        //   host: env.VITE_SERVER_HOST,
        // },
        rendererOptions: {
          maxConcurrentRoutes: 1,
          renderAfterTime: 500,
        },
        postProcess(renderedRoute) {
          renderedRoute.html = renderedRoute.html
            .replace(/http:/i, "https:")
            .replace(
              /(https:\/\/)?(localhost|127\.0\.0\.1):\d*/i,
              env.VITE_BASE_URL || ""
            );
        },
      }),
    ],
  };
});
