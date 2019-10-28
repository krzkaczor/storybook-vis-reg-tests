export interface IAccountSetupStepData {
  key: string;
  conditionCompleted: boolean;
  title: JSX.Element | string;
  component: JSX.Element | string;
}

export enum EAccountSetupStepState {
  DONE = "done",
  ACTIVE = "active",
  NOT_DONE = "notDone",
}

export interface IStepComponentProps {
  key: string;
  stepState: EAccountSetupStepState;
  title: JSX.Element | string;
  component: JSX.Element | string;
  number: number;
  isLast: boolean;
}
