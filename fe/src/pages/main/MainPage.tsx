import { useEffect, useState } from "react";
import { DetailHelmet } from "../../components/meta/DetailHelmet";
import { Canvas } from "@react-three/fiber";
import { Scroll, ScrollControls } from "@react-three/drei";
import Interface from "./components/Interface";
import ScrollManager from "./components/ScrollManager";
import { Menu } from "./components/Menu";
import Model from "./components/Model";
import { MotionConfig } from "framer-motion";
import { ErrorBoundary } from "../../components/errorboundary/ErrorBoundary";
import { Cursor } from "./components/Cursor";

export default function MainPage() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    if (menuOpened) {
      setMenuOpened(false);
    }
  }, [currentSectionIndex]);

  return (
    <>
      <DetailHelmet
        title="메인"
        pageTitle="방구석 코딩쟁이의 코딩 일대기"
        url={import.meta.env.VITE_BASE_URL + "/main"}
        shortDesc="방구석 코딩쟁이의 포트폴리오를 소개합니다."
      />
      <>
        <MotionConfig
          transition={{
            type: "spring",
            mass: 5,
            stiffness: 50,
            damping: 50,
            restDelta: 0.0001,
          }}
        >
          <Canvas shadows camera={{ position: [0, 3, 10], fov: 42 }}>
            <color attach="background" args={["#e6e7ff"]} />
            <ScrollControls pages={4} damping={0.1}>
              <ScrollManager
                currentSectionIndex={currentSectionIndex}
                onCurrentSectionIndexChange={setCurrentSectionIndex}
              />
              <Scroll>
                <ErrorBoundary hasError={false}>
                  <Model
                    currentSectionIndex={currentSectionIndex}
                    menuOpened={menuOpened}
                  />
                </ErrorBoundary>
              </Scroll>
              <Scroll html>
                <Interface />
              </Scroll>
            </ScrollControls>
          </Canvas>
          <Menu
            onCurrentSectionIndexChange={setCurrentSectionIndex}
            menuOpened={menuOpened}
            setMenuOpened={setMenuOpened}
          />
          <Cursor />
        </MotionConfig>
      </>
    </>
  );
}
