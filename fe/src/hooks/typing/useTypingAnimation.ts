import { useEffect, useRef, useState } from "react";

type Props = {
  texts: string[];
  typingFrame: number;
  deleteFrame: number;
  waitingTime: number;
};
export const useTypingAnimation = ({
  texts,
  deleteFrame = 60,
  typingFrame = 100,
  waitingTime = 1500,
}: Props) => {
  const [typingText, setTypingText] = useState<string>("");
  const textIndex = useRef<number>(0); // texts 배열 인덱스
  const charIndex = useRef<number>(0); // 현재 타이핑 중인 텍스트의 인덱스
  const [animeType, setAnimeType] = useState<"typing" | "deleting">("typing");

  const isTyping = animeType === "typing";
  const isDeleting = animeType === "deleting";

  useEffect(() => {
    const targetText = texts[textIndex.current]; // 현재 타이핑 중인 텍스트
    let timer: NodeJS.Timeout;

    const typeChar = () => {
      setTypingText(targetText.substring(0, charIndex.current + 1));
      charIndex.current += 1;
    };

    const deleteChar = () => {
      setTypingText(targetText.substring(0, charIndex.current - 1));
      charIndex.current -= 1;
    };

    if (isTyping && charIndex.current < targetText.length) {
      // Typing
      timer = setTimeout(typeChar, typingFrame);
    } else if (isDeleting && charIndex.current > 0) {
      // Deleting 중
      timer = setTimeout(deleteChar, deleteFrame);
    } else if (isDeleting) {
      // Delete 중이고, charIndex가 0이면 -> 다시 글자를 작성하도록 변경
      setAnimeType("typing");
      textIndex.current = (textIndex.current + 1) % texts.length;
    } else {
      // 타이핑이 끝난 경우 -> waitingTime 이후에 다음 텍스트로 넘어감
      timer = setTimeout(() => {
        setAnimeType("deleting");
      }, waitingTime);
    }

    return () => clearTimeout(timer);
  }, [typingFrame, texts, isTyping, waitingTime, isDeleting, deleteFrame]);

  return {
    typingText: typingText.split("\n"),
  };
};
