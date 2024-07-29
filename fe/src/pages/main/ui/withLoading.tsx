import { MainLoadingScreen } from "@/widgets/projects-showcase";
import { ComponentType, useState } from "react";

export function withLoading<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  return function (props: P) {
    const [isLoading, setIsLoading] = useState(true);

    const showStartPage = () => {
      setIsLoading(false);
    };

    return (
      <>
        {!isLoading && <WrappedComponent {...props} />}
        <MainLoadingScreen isLoading={isLoading} onStarted={showStartPage} />
      </>
    );
  };
}
