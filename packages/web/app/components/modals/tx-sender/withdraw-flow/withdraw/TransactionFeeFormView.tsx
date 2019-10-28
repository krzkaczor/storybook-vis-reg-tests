import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";

import { ECurrency, ENumberOutputFormat } from "../../../../shared/formatters/utils";
import {
  ESize,
  ETextPosition,
  ETheme,
  MoneySuiteWidget,
} from "../../../../shared/MoneySuiteWidget/MoneySuiteWidget";
import { DataRow } from "../../shared/DataRow";

import * as ethIcon from "../../../../../assets/img/eth_icon.svg";
import * as styles from "../Withdraw.module.scss";

const TransactionFeeFormView: React.FunctionComponent<{
  isValid: boolean;
  gasPrice: string;
  gasPriceEur: string;
}> = ({ isValid, gasPrice, gasPriceEur }) => (
  <DataRow
    className={styles.withSpacing}
    caption={<FormattedMessage id="modal.sent-eth.transaction-fee" />}
    value={
      <MoneySuiteWidget
        currency={ECurrency.ETH}
        largeNumber={
          isValid ? gasPrice : "0" /* Show 0 if form is invalid due of initially populated state */
        }
        value={isValid ? gasPriceEur : "0"}
        currencyTotal={ECurrency.EUR}
        data-test-id="modals.tx-sender.withdraw-flow.summary.cost"
        theme={ETheme.BLACK}
        size={ESize.MEDIUM}
        textPosition={ETextPosition.RIGHT}
        outputFormat={ENumberOutputFormat.ONLY_NONZERO_DECIMALS_ROUND_UP}
        icon={ethIcon}
      />
    }
  />
);

export { TransactionFeeFormView };
