import LoadAnimation from "@/shared/ui/loadingScreen/LoadAnimation";
import { useLoadMainPage } from "@/widgets/main/projects-showcase/libs/useLoadMainPage";
import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
  trickle: true,
  easing: "ease",
  speed: 100,
});

export const MainLoadingScreen = ({ isLoading, onStarted }) => {
  const { isButtonDisabled } = useLoadMainPage();

  return (
    //absolute z-50 h-[100vh] w-[100vw] flex justify-center items-center
    <div
      className={`z-50 absolute h-[100vh] w-[100vw] transition-all durtaion-300  ${
        // started ? "z-0 hidden" : ""
        !isLoading ? "opacity-0 -z-10 invisible" : ""
      }`}
    >
      <LoadAnimation />
      <div className="absolute z-10 bottom-10 left-[50%] -translate-x-[50%]">
        <button
          // className="loadingScreen__button"
          className={`${isButtonDisabled ? "text-gray-400" : "text-white"}`}
          disabled={isButtonDisabled}
          onClick={onStarted}
        >
          메인페이지로 이동
        </button>
      </div>
    </div>
  );
};
