import * as cn from "classnames";
import * as React from "react";
import { Pie } from "react-chartjs-2";

import { CommonHtmlProps } from "../../../types";
import { ChartLegend } from "./ChartLegend";

import * as styles from "./ChartPie.module.scss";

interface IDataset {
  data: number[];
  backgroundColor: string[];
}

export interface IChartPieData {
  datasets: IDataset[];
  labels: string[];
}

interface IProps {
  data: IChartPieData;
}

export const ChartPie: React.FunctionComponent<IProps & CommonHtmlProps> = ({
  data,
  className,
}) => (
  <div className={cn(styles.chartPie, className)}>
    <div className={styles.chartWrapper}>
      <Pie data={data} height={100} width={100} legend={{ display: false }} />
    </div>
    <div className={styles.legendWrapper}>
      <ChartLegend data={data} />
    </div>
  </div>
);
