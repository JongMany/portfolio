import Content from "@/pages/root/components/Content";
// import { useCustomScroll } from "@/pages/root/hooks/useCustomScroll";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef } from "react";

export default function Contents() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({});

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (scrollRef.current) {
      scrollRef.current.innerHTML = `${latest}`;
    }
  });

  return (
    <>
      <main
        className="absolute flex flex-col justify-center w-full text-center pointer-events-none z-99"
        ref={ref}
      >
        <Content height="137.5vh">
          <h1 className="text-4xl font-bold text-white">Hello, World!</h1>
          <p className="text-lg">Welcome to my website!</p>
        </Content>

        <Content>
          <h1 className="text-4xl font-bold text-white">My 1</h1>
          <p className="text-lg">Welcome to my website!</p>
        </Content>

        <Content>
          <h1 className="text-4xl font-bold text-white">My 2</h1>
          <p className="text-lg">Welcome to my website!</p>
        </Content>

        <Content>
          <h1 className="text-4xl font-bold text-white">My 3</h1>
          <p className="text-lg">Welcome to my website!</p>
        </Content>
        <Content>
          <h1 className="text-4xl font-bold text-white">My 4</h1>
          <p className="text-lg">Welcome to my website!</p>
        </Content>
        <Content>
          <h1 className="text-4xl font-bold text-white">My 5</h1>
          <p className="text-lg">Welcome to my website!</p>
        </Content>
        <Content>
          <h1 className="text-4xl font-bold text-white">My 6</h1>
          <p className="text-lg">Welcome to my website!</p>
        </Content>
        <Content>
          <h1 className="text-4xl font-bold text-white">My 7</h1>
          <p className="text-lg">Welcome to my website!</p>
        </Content>
        <Content>
          <h1 className="text-4xl font-bold text-white">My 8</h1>
          <p className="text-lg">Welcome to my website!</p>
        </Content>
        <Content>
          <h1 className="text-4xl font-bold text-white">My 9</h1>
          <p className="text-lg">Welcome to my website!</p>
        </Content>
        <Content>
          <h1 className="text-4xl font-bold text-white">My 10</h1>
          <p className="text-lg">Welcome to my website!</p>
        </Content>
        <Content>
          <h1 className="text-4xl font-bold text-white">My 11</h1>
          <p className="text-lg">Welcome to my website!</p>
        </Content>
        {/* 137.5vh */}
        <Content height="137.5vh">
          <h1 className="text-4xl font-bold text-white">Hello, World!</h1>
          <p className="text-lg">Welcome to my website!</p>
        </Content>
      </main>
      <div className="fixed text-white bottom-2 left-2 z-99" ref={scrollRef}>
        0
      </div>
    </>
  );
}
