import * as cn from "classnames";
import * as React from "react";

import { TTranslatedString } from "../../../types";

import * as styles from "./ChartCircle.module.scss";

export interface IChartCircleProps {
  progress: number;
  name: TTranslatedString;
}

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  percentage: number,
): [number, number] {
  //subtract a small amount from percentage in order to be able to draw full circle
  const angleInRadians = (percentage - 0.0001) * 2 * Math.PI;
  const x = centerX + radius * Math.sin(angleInRadians);
  const y = centerY - radius * Math.cos(angleInRadians);
  return [x, y];
}

export const ChartCircle: React.FunctionComponent<IChartCircleProps> = ({ progress, name }) => {
  const viewBoxSize = 220;
  const radius = viewBoxSize / 2;
  const indicatorRadius = radius * 0.8;
  const svgCenter = viewBoxSize / 2;
  const [x, y] = polarToCartesian(svgCenter, svgCenter, indicatorRadius, progress);

  return (
    <div className={cn(styles.chartCircle, progress === 1 && "is-completed")}>
      <svg viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
        <circle className={styles.border} r={svgCenter - 2} cx={svgCenter} cy={svgCenter} />
        <circle className={styles.indicator} r={indicatorRadius} cx={svgCenter} cy={svgCenter} />
        <path
          className={styles.progress}
          d={`M${svgCenter} ${radius - indicatorRadius}
              A ${indicatorRadius} ${indicatorRadius} 0 ${progress >= 0.5 ? 1 : 0} 1 ${x} ${y}`}
        />
      </svg>
      <div className={styles.labels}>
        <div data-test-id="chart-circle.progress" className={styles.percents}>{`${Math.round(
          progress * 100,
        )}%`}</div>
        <div className={styles.name}>{name}</div>
      </div>
    </div>
  );
};
