import { EAccountSetupStepState, IAccountSetupStepData, IStepComponentProps } from "./types";

const determineStepState = (isActive: boolean, completed: boolean): EAccountSetupStepState => {
  if (isActive) {
    return EAccountSetupStepState.ACTIVE;
  } else if (completed) {
    return EAccountSetupStepState.DONE;
  } else {
    return EAccountSetupStepState.NOT_DONE;
  }
};

export const prepareSetupAccountSteps = (data: IAccountSetupStepData[]): IStepComponentProps[] => {
  const newData = data.reduce(
    (
      acc: { activeElement: string | undefined; data: IStepComponentProps[] },
      stepData: IAccountSetupStepData,
      index: number,
    ) => {
      const isActive = !stepData.conditionCompleted && acc.activeElement === undefined;

      const stepComponentProps = {
        stepState: determineStepState(isActive, stepData.conditionCompleted),
        number: index + 1,
        key: stepData.key,
        title: stepData.title,
        component: stepData.component,
        isLast: index + 1 === data.length,
      };
      acc.data.push(stepComponentProps);
      acc.activeElement = isActive ? stepData.key : acc.activeElement;
      return acc;
    },
    { activeElement: undefined, data: [] },
  );

  return newData.data;
};
