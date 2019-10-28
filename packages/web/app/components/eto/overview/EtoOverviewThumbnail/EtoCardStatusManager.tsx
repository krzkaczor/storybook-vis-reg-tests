import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";

import { EEtoState } from "../../../../lib/api/eto/EtoApi.interfaces.unsafe";
import {
  EETOStateOnChain,
  EEtoSubState,
  TEtoWithCompanyAndContract,
} from "../../../../modules/eto/types";
import { isOnChain } from "../../../../modules/eto/utils";
import { nonNullable } from "../../../../utils/nonNullable";
import { Money } from "../../../shared/formatters/Money";
import {
  EAbbreviatedNumberOutputFormat,
  ECurrency,
  ENumberInputFormat,
  ENumberOutputFormat,
} from "../../../shared/formatters/utils";
import { CounterWidget } from "../EtoOverviewStatus/CounterWidget";
import { EndTimeWidget } from "../shared/EndTimeWidget";
import { GreenInfo, Info } from "./Info";
import { InvestmentStatus } from "./InvestmentStatus/InvestmentStatus";
import { Whitelist } from "./Whitelist/Whitelist";

interface IExternalProps {
  eto: TEtoWithCompanyAndContract;
}

const EtoCardStatusManager = ({ eto }: IExternalProps) => {
  const state = eto.contract ? eto.contract.timedState : eto.state;

  switch (state) {
    case EEtoState.LISTED:
    case EEtoState.PROSPECTUS_APPROVED:
    case EETOStateOnChain.Setup: {
      // if start date was already set show countdown over whitelist components
      if (
        eto.subState === EEtoSubState.COUNTDOWN_TO_PRESALE ||
        eto.subState === EEtoSubState.COUNTDOWN_TO_PUBLIC_SALE
      ) {
        const nextState =
          eto.subState === EEtoSubState.COUNTDOWN_TO_PRESALE
            ? EETOStateOnChain.Whitelist
            : EETOStateOnChain.Public;

        if (!isOnChain(eto) || eto.contract.startOfStates[nextState] === undefined) {
          throw new Error("Next state should be defined as this point");
        }

        const nextStateStartDate = nonNullable(eto.contract.startOfStates[nextState]);

        return (
          <CounterWidget endDate={nextStateStartDate} awaitedState={nextState} etoId={eto.etoId} />
        );
      }

      return <Whitelist eto={eto} />;
    }

    case EETOStateOnChain.Whitelist: {
      const publicSaleStartDate = eto.contract!.startOfStates[EETOStateOnChain.Public]!;

      if (eto.subState === EEtoSubState.COUNTDOWN_TO_PUBLIC_SALE) {
        {
          /* user is not allowed to invest in presale or user is not logged in */
        }
        return (
          <CounterWidget
            endDate={publicSaleStartDate}
            awaitedState={EETOStateOnChain.Public}
            etoId={eto.etoId}
          />
        );
      } else {
        return (
          <>
            <InvestmentStatus eto={eto} />

            <Info>
              <FormattedMessage id="eto-overview-thumbnail.presale.view-offer" />
            </Info>
          </>
        );
      }
    }

    case EETOStateOnChain.Public: {
      const endDate = eto.contract!.startOfStates[EETOStateOnChain.Signing]!;

      return (
        <>
          <InvestmentStatus eto={eto} />
          <Info>
            <EndTimeWidget endTime={endDate} />
          </Info>
        </>
      );
    }

    case EETOStateOnChain.Signing: {
      return (
        <>
          <InvestmentStatus eto={eto} />

          <Info>
            <FormattedMessage
              id="eto-overview-thumbnail.signing.raised-amount"
              values={{
                totalAmount: (
                  <Money
                    value={eto.contract!.totalInvestment.totalEquivEurUlps}
                    inputFormat={ENumberInputFormat.ULPS}
                    valueType={ECurrency.EUR}
                    outputFormat={ENumberOutputFormat.FULL}
                  />
                ),
              }}
            />
          </Info>
        </>
      );
    }

    case EETOStateOnChain.Claim:
    case EETOStateOnChain.Payout: {
      return (
        <GreenInfo
          upperText={
            <FormattedMessage id="eto-overview-thumbnail.success.successful-fundraising" />
          }
          lowerText={
            <FormattedMessage
              id="eto-overview-thumbnail.success.raised-amount"
              values={{
                totalAmount: (
                  <Money
                    value={eto.contract!.totalInvestment.totalEquivEurUlps}
                    inputFormat={ENumberInputFormat.ULPS}
                    valueType={ECurrency.EUR}
                    outputFormat={EAbbreviatedNumberOutputFormat.SHORT}
                  />
                ),
              }}
            />
          }
        />
      );
    }

    case EETOStateOnChain.Refund: {
      return (
        <>
          <InvestmentStatus eto={eto} />
          <Info>
            <FormattedMessage id="eto-overview-thumbnail.refund.claim-refund" />
          </Info>
        </>
      );
    }

    case EEtoState.SUSPENDED:
      return <></>;

    default:
      throw new Error(`State (${state}) is not known. Please provide implementation.`);
  }
};

export { EtoCardStatusManager };
