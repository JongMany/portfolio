import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

export default function MainPage() {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_SERVER}/api/hello`).then((res) => {
      console.log(res);
    });
    console.log("main");
  }, []);

  return (
    <>
      <Helmet>
        <title>메인화면</title>
        <meta name="description" content="방구석 코딩쟁이" />
        {/* Open Graph */}
        <meta property="og:title" content="방구석 코딩쟁이" />
        <meta property="og:description" content="방구석 코딩쟁이 포트폴리오" />
        <meta property="og:image" content="https://via.placeholder.com/1200" />
        <meta property="og:url" content="https://www.google.com" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta property="twitter:title" content="SEO 최적화 테스트" />
        <meta
          property="twitter:description"
          content="SEO 최적화 테스트 연습입니다."
        />
        <meta
          property="twitter:image"
          content="https://via.placeholder.com/1200"
        />
        <meta property="twitter:card" content="summary_large_image" />
      </Helmet>
      <main>메인화면</main>
    </>
  );
}
