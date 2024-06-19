import { ScrollControlsState, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";

type Props = {
  currentSectionIndex: number;
  onCurrentSectionIndexChange: React.Dispatch<React.SetStateAction<number>>;
};

export default function ScrollManager({
  currentSectionIndex,
  onCurrentSectionIndexChange,
}: Props) {
  const data = useScroll() as ScrollControlsState & {
    scroll: { current: number };
  };
  const lastScroll = useRef(0);
  const isAnimating = useRef(false);

  // Tailwind 때문에 얘가 page에 포함됨
  data.fill.classList.add("top-0");
  data.fill.classList.add("absolute");

  useEffect(() => {
    // Animation
    gsap.to(data.el, {
      duration: 1,
      scrollTop: currentSectionIndex * data.el.clientHeight,
      onStart: () => {
        isAnimating.current = true;
      },
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  }, [currentSectionIndex]);
  // data.

  useFrame(() => {
    // console.log(data);
    if (isAnimating.current) {
      lastScroll.current = data.scroll.current;
      return;
    }

    const currentSection = Math.floor(data.scroll.current * data.pages);
    if (data.scroll.current > lastScroll.current && currentSection === 0) {
      onCurrentSectionIndexChange(1);
    }
    if (
      data.scroll.current < lastScroll.current &&
      data.scroll.current < 1 / (data.pages - 1)
    ) {
      onCurrentSectionIndexChange(0);
    }

    lastScroll.current = data.scroll.current;
  });
  return null;
}
