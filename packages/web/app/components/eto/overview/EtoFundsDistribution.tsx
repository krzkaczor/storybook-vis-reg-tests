import * as cn from "classnames";
import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";
import { Col, Container, Row } from "reactstrap";

import { ChartBars, IChartBarsData } from "../../shared/charts/ChartBars";
import { HorizontalLine } from "../../shared/HorizontalLine";
import { Panel } from "../../shared/Panel";
import { TableBody } from "../../shared/table/TableBody";
import { TableCell } from "../../shared/table/TableCell.unsafe";
import { TableHeader } from "../../shared/table/TableHeader";
import { TableRow } from "../../shared/table/TableRow";

import * as stylesCommon from "../EtoOverviewCommon.module.scss";

interface IInvestor {
  name: string;
  invested: string;
  value: number;
  tokens: number;
}

interface IProps {
  investors: IInvestor[];
  chartDataNumberOfInvestors: IChartBarsData;
  chartDataNTotalAmountInvested: IChartBarsData;
  numberOfInvestors: number;
  numberOfTransactions: number;
}

export const EtoFundsDistribution: React.FunctionComponent<IProps> = ({
  chartDataNumberOfInvestors,
  chartDataNTotalAmountInvested,
  investors,
  numberOfInvestors,
  numberOfTransactions,
}) => (
  <Panel>
    <div className={stylesCommon.container}>
      <Row>
        <Col>
          <strong className={stylesCommon.label}>
            <FormattedMessage id="eto.overview.funds-distribution.number-of-investors" />
          </strong>
          {numberOfInvestors}
          <div>
            <strong className={stylesCommon.label}>
              <FormattedMessage id="eto.overview.funds-distribution.number-of-transactions" />
            </strong>
            {numberOfTransactions}
          </div>
        </Col>
      </Row>
      <HorizontalLine className="my-3" />
      <Row>
        <Col xs={12} md={6}>
          <TableBody>
            <TableHeader>
              <Container>
                <Row>
                  <Col>
                    <FormattedMessage id="eto.overview.funds-distribution.table.header" />
                  </Col>
                </Row>
              </Container>
            </TableHeader>
            <TableRow>
              <TableCell>
                <FormattedMessage id="eto.overview.funds-distribution.table.name" />
              </TableCell>
              <TableCell>
                <FormattedMessage id="eto.overview.funds-distribution.table.invested" />
              </TableCell>
              <TableCell>
                <FormattedMessage id="eto.overview.funds-distribution.table.value-eur" />
              </TableCell>
              <TableCell>
                <FormattedMessage id="eto.overview.funds-distribution.table.tokens" />
              </TableCell>
            </TableRow>
            {investors.map((investor, index) => (
              <TableRow key={index}>
                <TableCell>{investor.name}</TableCell>
                <TableCell>{investor.invested}</TableCell>
                <TableCell>{investor.value}</TableCell>
                <TableCell>{investor.tokens}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Col>
        <Col xs={12} md={6}>
          <div className={cn(stylesCommon.chartNarrow, "mb-3")}>
            <h3 className={stylesCommon.header}>
              <FormattedMessage id="eto.overview.token-distribution.table.number-of-investors-header" />
            </h3>
            <strong className="mb-2">
              <small>
                <FormattedMessage id="eto.overview.token-distribution.table.number-of-investors" />
              </small>
            </strong>
            <ChartBars data={chartDataNumberOfInvestors} />
          </div>
          <div className={stylesCommon.chartNarrow}>
            <h3 className={stylesCommon.header}>
              <FormattedMessage id="eto.overview.token-distribution.table.number-of-investors-header" />
            </h3>
            <strong className="mb-2">
              <small>
                <FormattedMessage id="eto.overview.token-distribution.table.number-of-investors" />
              </small>
            </strong>
            <ChartBars data={chartDataNTotalAmountInvested} />
          </div>
        </Col>
      </Row>
    </div>
  </Panel>
);
