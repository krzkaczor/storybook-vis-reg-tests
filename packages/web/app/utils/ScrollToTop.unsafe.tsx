import * as React from "react";
import { RouteProps } from "react-router";

import { appConnect } from "../store";

class ScrollToTopComponent extends React.Component<RouteProps> {
  componentDidUpdate(prevProps: RouteProps): void {
    if (prevProps.location!.pathname !== this.props.location!.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render(): React.ReactNode {
    return this.props.children;
  }
}

export const ScrollToTop = appConnect({
  stateToProps: s => ({ location: s.router.location }),
})(ScrollToTopComponent);
