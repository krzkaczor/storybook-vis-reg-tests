import * as cn from "classnames";
import * as React from "react";
import { Bar } from "react-chartjs-2";

import * as styles from "./ChartBars.module.scss";

interface IDataset {
  data: number[];
  backgroundColor: string[];
}

export interface IChartBarsData {
  datasets: IDataset[];
  labels: string[];
}

interface IProps {
  data: IChartBarsData;
  className?: string;
  width?: number;
  height?: number;
}

export const ChartBars: React.FunctionComponent<IProps> = ({ data, className, width, height }) => (
  <div className={cn(styles.chartBars, className)}>
    <div className={styles.chartWrapper}>
      <Bar
        data={data}
        width={width}
        height={height}
        legend={{ display: false }}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            xAxes: [
              {
                display: false,
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        }}
      />
    </div>
  </div>
);

ChartBars.defaultProps = {
  width: 388,
  height: 244,
};
