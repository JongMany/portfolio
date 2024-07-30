import { useDeviceSize } from "@/shared/libs";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function MyProfile() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "10px" });
  const device = useDeviceSize();
  const mainHeadFontStyle = device === "desktop" ? "text-4xl" : "text-xl";
  const headFontStyle = device === "desktop" ? "text-2xl" : "text-lg";
  const textFontStyle = device === "desktop" ? "text-lg" : "text-sm";
  return (
    <article
      ref={ref}
      style={{
        transform: isInView ? "none" : `translateY(${isInView ? 0 : 200}px)`,
        opacity: isInView ? 1 : 0,
        transition: `all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s`,
      }}
    >
      <div>
        <h3
          className={`mb-8 text-4xl font-bold text-center ${mainHeadFontStyle}`}
          style={{
            opacity: isInView ? 1 : 0,
            transition: `all 0.4s cubic-bezier(0.17, 0.55, 0.55, 1) 1s`,
          }}
        >
          저는 이런 사람이에요!
        </h3>
        <div
          style={{
            opacity: isInView ? 1 : 0,
            transition: `all 0.4s cubic-bezier(0.17, 0.55, 0.55, 1) 1.4s`,
          }}
        >
          <h5 className={`mb-3 font-semibold ${headFontStyle}`}>기술 스택</h5>
          <div className="mb-2 ml-4">
            <h6 className="font-semibold">프로그래밍 언어</h6>
            <p className={`grid grid-cols-2 ml-4 ${textFontStyle}`}>
              <span>JavaScript</span>
              <span>TypeScript</span>
              <span>Python</span>
              <span>Java</span>
            </p>
          </div>
          <div className="mb-2 ml-4 ">
            <h6 className="font-semibold">웹 프레임워크 / 라이브러리</h6>
            <p className={`grid grid-cols-2 ml-4 ${textFontStyle}`}>
              <span>React</span>
              <span>Next.js</span>
              <span>Express</span>
              <span>Nest.js</span>
            </p>
          </div>
          <div className="mb-2 ml-4 ">
            <h6 className="font-semibold">상태 관리 라이브러리</h6>
            <p className={`grid grid-cols-2 ml-4 ${textFontStyle}`}>
              <span>Redux</span>
              <span>Zustand</span>
              <span>Tanstack Query</span>
            </p>
          </div>
          <div className="mb-2 ml-4 ">
            <h6 className="font-semibold">데이터베이스</h6>
            <p className={`grid grid-cols-2 ml-4 ${textFontStyle}`}>
              <span>MongoDB</span>
              <span>MySQL</span>
            </p>
          </div>
          <div className="mb-2 ml-4 ">
            <h6 className="font-semibold">Studying</h6>
            <p className={`grid grid-cols-2 ml-4 ${textFontStyle}`}>
              <span>Docker</span>
              <span>AWS</span>
              <span>Flutter</span>
              <span>Clean Code</span>
            </p>
          </div>
        </div>
        <div
          className="mt-4"
          style={{
            opacity: isInView ? 1 : 0,
            transition: `all 0.4s cubic-bezier(0.17, 0.55, 0.55, 1) 1.6s`,
          }}
        >
          <h5 className={`mb-3 font-semibold ${headFontStyle}`}>이력</h5>
          <div className={`grid grid-cols-[2fr_3fr] gap-x-8 ${textFontStyle}`}>
            <>
              <span>2018.03 ~ 2025.02</span>
              <span>광운대학교 정보융합학부</span>
            </>
            <>
              <span>2022.11 ~ 현재</span>
              <span>IDEA Lab 개발 인턴</span>
            </>
            <>
              <span>2024.03 ~ 2024.06</span>
              <span>항해 플러스 프론트엔드 1기 수료</span>
            </>
            <>
              <span>2024.07 ~ 현재</span>
              <span>카카오테크 부트캠프 풀스택 과정 1기</span>
            </>
          </div>
        </div>
      </div>
    </article>
  );
}
