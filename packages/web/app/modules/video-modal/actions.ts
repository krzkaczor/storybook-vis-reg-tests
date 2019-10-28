import { createAction, createSimpleAction } from "../actionsUtils";

export const videoModalActions = {
  showVideoModal: (youTubeUrl: string) => createAction("VIDEO_MODAL_SHOW", { youTubeUrl }),

  hideVideoModal: () => createSimpleAction("VIDEO_MODAL_HIDE"),
};
