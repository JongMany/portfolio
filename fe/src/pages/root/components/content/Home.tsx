import { useTypingAnimation } from "@/hooks/typing/useTypingAnimation";

export default function Home() {
  const { typingText } = useTypingAnimation({
    texts: [
      "저는 사용자 입장을 고려하는 프론트엔드 개발자입니다. \n 사용자에게 더 나은 경험을 제공하기 위해 노력하고 있습니다. \n 사용자의 피드백을 수용하여 개선하는 것을 중요하게 생각합니다.",
      "React, TypeScript, Tailwind CSS를 주로 사용합니다. \n 이 외에도 다양한 기술을 배우고 있습니다. \n 더 나은 코드를 작성하기 위해 노력하고 있습니다.",
      "코드 작성 이후에 리팩토링을 통해 코드의 가독성을 높이고 있습니다. \n 문서화를 통해 코드의 이해를 돕고 있습니다. \n 팀원들과 소통하여 다양한 의견을 듣는 것을 중요하게 생각합니다.",
    ],
    typingFrame: 100,
    deleteFrame: 60,
    waitingTime: 1500,
  });

  return (
    <div className="flex flex-col px-2 w-[70vw] items-center justify-center min-h-[80vh]">
      <h1 className="py-6 text-4xl">방구석 코딩쟁이, 이종민입니다.</h1>
      <div className="flex flex-col items-start gap-y-3">
        {typingText.map((text) => (
          <p key={text} className="text-lg ">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}
