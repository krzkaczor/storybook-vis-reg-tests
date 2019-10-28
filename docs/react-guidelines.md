# React guidelines

## JSX

- when passing string literals do not wrap them in `{ }`.

DO NOT:

```
<MyComponent title={"bad"} />
```

DO:

```
<MyComponent title="good" />
```

## Imports & Exports

- imports should be grouped like this:

```
// imports coausing side effects
import "polyfills";

// package imports
import "react";
import "redux";

// relative imports
import { something } from "./something.ts"

// non-ts/js imports
import * as image from "../images/image.png"
import * as styles from "./styles.module.scss"
```

- each group should be separated by a new line
- items in group should be automatically sorted automatically by linter

- [DO NOT USE DEFAULT EXPORTS](https://blog.neufund.org/why-we-have-banned-default-exports-and-you-should-do-the-same-d51fdc2cf2ad)
- export component variables at the end of a file, not directly at declaration, to prevent conponent
  names in react dev tools.

```javascript
export const Component: React.FunctionComponent = () => <div />;
```

becomes:

```javascript
const Component: React.FunctionComponent = () => <div />;

// at the end of the file
export { Component };
```

## Functional components:

- you should almost always prefer functional components only valid reason for having class style
  component is when you have internal state or heavily use life cycle methods
- if you need to do something while components shows up you can use `onEnterAction` HOC
- functional components should always be of a type `React.FunctionComponent<IProps>` not `()=>..`
- prefer destructing props object if there are not so many props (< 5)
  `({ onClick, className }) => ...` instead of `(props) => ...`
- for complex component behavior, prefer to use `recompose` utils, than class components

## Class components:

- prefer recompose, use only if unavoidable
- avoid constructors: \* use class field declarations to set initial state, bind functions etc

```javascript
class Component extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      value: 0,
    };
    this.onBack = this.onBack.bind(this);
  }

  onBack() {
    // do something with this
  }
}
```

becomes:

```javascript
class Component extends React.Component<IProps, IState> {
  state = {
    value: 0,
  };

  private onBack = () => {
    // do something with this
  };
}
```

## Connected components

- use `appConnect<IStateProps, IDispatchProps, IOwnProps>`
- use separate interfaces for props from state, dispatch, own
- use `setDisplayName` for preserving the component name in react dev tools

## Redux Sagas

- generators in Typescript are not typesafe - everytime you `yield` something you get any as a
  return type so you need to manually provide types
- prefer extracting logic to async functions which can be properly typed
- use `neuCall` to access global dependency object as first argument
- avoid defining manual watchers with while loops. Use `neuTakeEvery` instead
- if you don't need dependency injection stick with standard effects like `call` and `takeEvery`
