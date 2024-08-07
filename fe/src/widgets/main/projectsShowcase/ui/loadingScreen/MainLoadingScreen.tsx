import { useDeviceSize } from "@/shared/libs";
import LoadAnimation from "@/shared/ui/loadingScreen/LoadAnimation";
import { useLoadMainPage } from "@/widgets/main/projectsShowcase/libs/useLoadMainPage";
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
  const device = useDeviceSize();
  const buttonPosition = device === "desktop" ? "bottom-10" : "bottom-20";

  return (
    //absolute z-50 h-[100vh] w-[100vw] flex justify-center items-center
    <div
      className={`z-50 absolute h-[100dvh] w-[100dvw] transition-all durtaion-300  ${
        !isLoading ? "opacity-0 -z-10 invisible" : "overflow-y-hidden"
      } `}
    >
      <LoadAnimation />
      <div
        className={`absolute z-10 ${buttonPosition} left-[50%] -translate-x-[50%]`}
      >
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
