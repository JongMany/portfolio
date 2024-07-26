import React, { PropsWithChildren } from "react";

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<PropsWithChildren<State>> {
  // constructor(props: T) {
  //   super(props);
  //   this.state = { hasError: false };
  // }
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    console.error("ERROR", error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
