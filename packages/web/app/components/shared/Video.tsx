import * as React from "react";

import { actions } from "../../modules/actions";
import { appConnect } from "../../store";
import { Proportion } from "./Proportion";
import { ResponsiveImage } from "./ResponsiveImage";

interface IProps {
  youTubeUrl: string | undefined;
  className?: string;
  hasModal?: boolean;
}

interface IDispatchProps {
  openModal?: (url: string) => void;
}

const VideoComponent: React.FunctionComponent<IProps & IDispatchProps> = ({
  youTubeUrl,
  className,
  hasModal,
  openModal = () => {},
}) => {
  let youTubeId = youTubeUrl && youTubeUrl.split("?").filter(string => string.startsWith("v="))[0];

  if (!youTubeId) {
    return null;
  } else {
    youTubeId = youTubeId.slice(2);
  }

  const computedUrl = `https://www.youtube.com/embed/${youTubeId}?disablekb=1&rel=0&showinfo=0&color=white`;

  return (
    <Proportion width={480} height={360} className={className}>
      {hasModal ? (
        <ResponsiveImage
          className={hasModal && "thumbnail"}
          onClick={() => openModal(computedUrl)}
          width={480}
          height={360}
          srcSet={{ "1x": `https://img.youtube.com/vi/${youTubeId}/hqdefault.jpg` }}
          alt="video thumbnail"
        />
      ) : (
        <iframe src={computedUrl} allowFullScreen />
      )}
    </Proportion>
  );
};

export const Video = appConnect<IDispatchProps>({
  dispatchToProps: dispatch => ({
    openModal: (youTubeUrl: string) => dispatch(actions.videoModal.showVideoModal(youTubeUrl)),
  }),
})(VideoComponent);
