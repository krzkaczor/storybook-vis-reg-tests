import * as React from "react";
import { compose, lifecycle } from "recompose";

export const layoutEnhancer = <T>(component: React.ComponentType<T>) =>
  compose<T, T>(
    lifecycle({
      componentDidMount(): void {
        document.body.classList.add("app-body");
      },
      componentWillUnmount(): void {
        document.body.classList.remove("app-body");
      },
    }),
  )(component);
