import * as cn from "classnames";
import * as React from "react";

import { CommonHtmlProps } from "../../types";
import { Proportion } from "./Proportion";

import * as styles from "./ResponsiveVideo.module.scss";

enum EVideoTheme {
  light = "light",
  dark = "dark",
  transparent = "transparent",
  black = "black",
}

interface IVideoSources {
  webm: string;
  mp4: string;
}

interface IResponsiveVideo {
  src?: string;
  sources: IVideoSources;
  theme?: EVideoTheme;
  width?: number;
  height?: number;
  onClick?: () => void;
  banner?: boolean;
}

type ResponsiveVideoProps = IResponsiveVideo & CommonHtmlProps;

const ResponsiveVideo: React.FunctionComponent<ResponsiveVideoProps> = ({
  className,
  sources,
  theme,
  height,
  width,
  onClick,
  banner,
}) => (
  <Proportion
    width={width}
    height={height}
    className={cn(styles.responsiveVideo, className, theme, { [styles.banner]: banner })}
    onClick={onClick}
  >
    <video className={styles.video} autoPlay loop muted playsInline>
      <source src={sources.webm} type="video/webm" />
      <source src={sources.mp4} type="video/mp4" />
    </video>
  </Proportion>
);

ResponsiveVideo.defaultProps = {
  theme: EVideoTheme.dark,
};

export { ResponsiveVideo, IResponsiveVideo, IVideoSources, EVideoTheme };
