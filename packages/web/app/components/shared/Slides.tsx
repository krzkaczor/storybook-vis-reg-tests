import * as React from "react";

import { Proportion } from "./Proportion";

interface IProps {
  slideShareUrl: string | undefined;
  className?: string;
}

export const Slides: React.FunctionComponent<IProps> = ({ slideShareUrl, className }) =>
  slideShareUrl ? (
    <Proportion className={className} width={480} height={360}>
      <iframe
        src={`/external/pitch-deck-iframe.html?url=${
          slideShareUrl.includes("https://")
            ? slideShareUrl
            : `https://${slideShareUrl.split("//")[1]}`
        }`}
        allowFullScreen
        scrolling="no"
      />
    </Proportion>
  ) : null;
