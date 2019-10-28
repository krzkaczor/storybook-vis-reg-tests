import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";

import { ETxSenderType } from "../../../../modules/tx/types";
import { multiplyBigNumbers } from "../../../../utils/BigNumberUtils";
import { Money } from "../../../shared/formatters/Money";
import {
  ECurrency,
  ENumberInputFormat,
  ENumberOutputFormat,
} from "../../../shared/formatters/utils";
import { InfoList } from "../shared/InfoList";
import { InfoRow } from "../shared/InfoRow";
import { TimestampRow } from "../shared/TimestampRow";
import { TransactionDetailsComponent } from "../types";

const UpgradeTransactionDetails: TransactionDetailsComponent<ETxSenderType.UPGRADE> = ({
  txData,
  className,
  txTimestamp,
}) => (
  <InfoList className={className}>
    <InfoRow caption={<FormattedMessage id="upgrade-flow.to" />} value={txData!.to} />

    <InfoRow
      caption={<FormattedMessage id="upgrade-flow.value" />}
      value={
        <Money
          value={txData!.value}
          inputFormat={ENumberInputFormat.ULPS}
          valueType={ECurrency.ETH}
          outputFormat={ENumberOutputFormat.FULL}
        />
      }
    />

    <InfoRow
      caption={<FormattedMessage id="upgrade-flow.transaction-cost" />}
      value={
        <Money
          value={multiplyBigNumbers([txData!.gasPrice, txData!.gas])}
          inputFormat={ENumberInputFormat.ULPS}
          valueType={ECurrency.ETH}
          outputFormat={ENumberOutputFormat.FULL}
        />
      }
    />

    {txTimestamp && <TimestampRow timestamp={txTimestamp} />}
  </InfoList>
);

export { UpgradeTransactionDetails };
