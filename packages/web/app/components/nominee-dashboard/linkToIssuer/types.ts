export enum ENomineeRequestComponentState {
  SUCCESS = "nomineeRequestSuccess",
  WAIT_WHILE_RQUEST_PENDING = "waitWhileNomineeRequestPending",
  REPEAT_REQUEST = "repeatNomineeRequest",
  CREATE_REQUEST = "createNomineeRequest",
  CREATE_ANOTHER_REQUEST = "createNewRequest", //this one is the same as CREATE_REQUEST but is used when the prev. request has been rejected. It comes with an additional error message in the ui
}
