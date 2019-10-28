import { createSelector } from "reselect";

import { IAppState } from "../../store";
import { DeepReadonly } from "../../types";
import { IGenericModal, IGenericModalState } from "./reducer";

const selectGenericModal = (state: IAppState) => state.genericModal;

export const selectGenericModalIsOpen = createSelector(
  selectGenericModal,
  (state: DeepReadonly<IGenericModalState>): boolean => state.isOpen,
);

export const selectGenericModalObj = createSelector(
  selectGenericModal,
  (state: DeepReadonly<IGenericModalState>): DeepReadonly<IGenericModal> | undefined =>
    state.genericModalObj,
);

export const selectGenericModalComponent = createSelector(
  selectGenericModal,
  (state: DeepReadonly<IGenericModalState>): React.ComponentType<any> | undefined =>
    state.component,
);

export const selectGenericModalComponentProps = createSelector(
  selectGenericModal,
  (state: DeepReadonly<IGenericModalState>): object | undefined => state.componentProps,
);
