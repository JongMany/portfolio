import { MainLoadingScreen } from "@/widgets/main/projectsShowcase/ui/loadingScreen/MainLoadingScreen";
import { ComponentType, useState } from "react";

export function withLoading<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  return function (props: P) {
    const [isLoading, setIsLoading] = useState(true);

    const showStartPage = () => {
      setIsLoading(false);
    };

    // TODO: Loading은 전체 한번만 진행되도록..!
    return (
      <>
        {!isLoading && <WrappedComponent {...props} />}
        <MainLoadingScreen isLoading={isLoading} onStarted={showStartPage} />
      </>
    );
  };
}
