import { TCompanyEtoData, TEtoSpecsData } from "../../lib/api/eto/EtoApi.interfaces.unsafe";
import { AppReducer } from "../../store";
import { DeepReadonly } from "../../types";
import { actions } from "../actions";
import {
  ENomineeLinkBankAccountStatus,
  ENomineeRedeemShareholderCapitalStatus,
  ENomineeRequestError,
  ENomineeUploadIshaStatus,
  TNomineeRequestStorage,
} from "./types";

export interface INomineeFlowState {
  loading: boolean;
  error: ENomineeRequestError;
  activeNomineeEtoPreviewCode: string | undefined;
  nomineeRequests: TNomineeRequestStorage;
  nomineeEtos: { [previewCode: string]: TEtoSpecsData | undefined } | undefined;
  nomineeEtosCompanies: { [companyId: string]: TCompanyEtoData | undefined };
  linkBankAccount: ENomineeLinkBankAccountStatus;
  redeemShareholderCapital: ENomineeRedeemShareholderCapitalStatus;
  uploadIsha: ENomineeUploadIshaStatus;
}

const nomineeFlowInitialState: INomineeFlowState = {
  loading: false,
  error: ENomineeRequestError.NONE,
  activeNomineeEtoPreviewCode: undefined,
  nomineeRequests: {},
  nomineeEtos: undefined,
  nomineeEtosCompanies: {},
  linkBankAccount: ENomineeLinkBankAccountStatus.NOT_DONE,
  redeemShareholderCapital: ENomineeRedeemShareholderCapitalStatus.NOT_DONE,
  uploadIsha: ENomineeUploadIshaStatus.NOT_DONE,
};

export const nomineeFlowReducer: AppReducer<INomineeFlowState> = (
  state = nomineeFlowInitialState,
  action,
): DeepReadonly<INomineeFlowState> => {
  switch (action.type) {
    case actions.nomineeFlow.createNomineeRequest.getType():
    case actions.nomineeFlow.loadNomineeTaskData.getType():
      return {
        ...state,
        loading: true,
      };
    case actions.nomineeFlow.storeNomineeTaskData.getType():
      return {
        ...state,
        loading: false,
        nomineeRequests: action.payload.tasks.nomineeRequests,
      };
    case actions.nomineeFlow.storeNomineeRequest.getType():
      return {
        ...state,
        nomineeRequests: {
          ...state.nomineeRequests,
          [action.payload.etoId]: action.payload.nomineeRequest,
        },
        error: ENomineeRequestError.NONE,
        loading: false,
      };
    case actions.nomineeFlow.loadingDone.getType():
      return {
        ...state,
        loading: false,
      };
    case actions.nomineeFlow.setActiveNomineeEto.getType():
      return {
        ...state,
        activeNomineeEtoPreviewCode: action.payload.previewCode,
      };
    case actions.nomineeFlow.setNomineeEtos.getType():
      return {
        ...state,
        nomineeEtos: action.payload.etos,
        nomineeEtosCompanies: action.payload.companies,
      };
    default:
      return state;
  }
};
