import { useInView } from "framer-motion";
import { useRef } from "react";

export default function MyProfile() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "10px" });

  return (
    <article
      ref={ref}
      style={{
        transform: isInView ? "none" : `translateY(${isInView ? 0 : 200}px)`,
        opacity: isInView ? 1 : 0,
        transition: `all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s`,
      }}
    >
      <div className="">
        <h3 className="text-2xl font-bold text-center">
          저는 이런 사람이에요!
        </h3>
        <div>
          <h5 className="text-lg font-semibold">기술 스택</h5>
          <div>
            <h6>프로그래밍 언어</h6>
            <p>
              <span>JavaScript</span>
              <span>TypeScript</span>
              <span>Python</span>
            </p>
          </div>
          <div>
            <h6>프레임워크</h6>
            <p>
              <span>JavaScript</span>
              <span>TypeScript</span>
              <span>Python</span>
            </p>
          </div>
        </div>
        <div>
          <h5>이력</h5>
          <p>
            <span>2018.03 ~ 2025.02</span>
            <span>광운대학교</span>
            <span>정보융합학부</span>
          </p>
          <p>
            <span>2022.11 ~ 현재</span>
            <span>IDEA Lab</span>
            <span>개발 인턴</span>
          </p>
          <p>
            <span>2024.03 ~ 2024.06</span>
            <span>항해 플러스 프론트엔드 1기 수료</span>
          </p>
          <p>
            <span>2024.07 ~ 현재</span>
            <span>카카오테크 부트캠프 풀스택 과정 1기</span>
          </p>
        </div>
      </div>
    </article>
  );
}
