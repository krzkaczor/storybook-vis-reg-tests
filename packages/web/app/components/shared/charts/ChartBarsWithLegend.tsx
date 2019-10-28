import * as React from "react";
import { Bar } from "react-chartjs-2";

import { ChartLegend } from "./ChartLegend";

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
}

export const ChartBarsWithLegend: React.FunctionComponent<IProps> = ({ data }) => (
  <div className={styles.chartBars}>
    <div className={styles.chartWrapper}>
      <Bar
        data={data}
        width={388}
        height={244}
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
    <div className={styles.legendWrapper}>
      <ChartLegend data={data} />
    </div>
  </div>
);
