import { expect } from "chai";
import { render, shallow } from "enzyme";
import * as React from "react";

import { wrapWithIntl } from "../../../../test/integrationTestUtils.unsafe";
import { tid } from "../../../../test/testUtils";
import { MyWalletWidgetComponentBody } from "./MyWalletWidget";

describe("<MyWalletWidget />", () => {
  let initialWalletWidgetEnabledState: any;
  let initialWalletWidgetInDashboardState: any;

  it("should render all default components when icbm and locket wallets are connected", () => {
    process.env.NF_CHECK_LOCKED_WALLET_WIDGET_ENABLED = "1";

    const props = {
      isLoading: false,
      data: {
        euroTokenEuroAmount: "66482" + "0".repeat(14),
        euroTokenAmount: "36490" + "0".repeat(18),
        ethAmount: "66482" + "0".repeat(14),
        ethEuroAmount: "6004904646" + "0".repeat(16),
        percentage: "-3.67",
        totalAmount: "637238" + "0".repeat(18),
        isIcbmWalletConnected: true,
        isLockedWalletConnected: true,
      },
    };

    const component = shallow(<MyWalletWidgetComponentBody {...props} />);

    expect(component.find(tid("my-wallet-widget-eur-token"))).to.have.length(1);
    expect(component.find(tid("my-wallet-widget-eth-token"))).to.have.length(1);
    expect(component.find(tid("my-wallet-widget-total"))).to.have.length(1);
    expect(component.find(tid("my-wallet-widget-icbm-help-text"))).to.have.length(0);
  });

  it("should render icbm help text when icbm and locked wallets are disconnected connected", () => {
    process.env.NF_CHECK_LOCKED_WALLET_WIDGET_ENABLED = "1";
    process.env.NF_CHECK_LOCKED_WALLET_WIDGET_IN_DASHBOARD = "1";

    const props = {
      isLoading: false,
      data: {
        euroTokenEuroAmount: "66482" + "0".repeat(14),
        euroTokenAmount: "36490" + "0".repeat(18),
        ethAmount: "66482" + "0".repeat(14),
        ethEuroAmount: "6004904646" + "0".repeat(16),
        percentage: "-3.67",
        totalAmount: "637238" + "0".repeat(18),
        isIcbmWalletConnected: false,
        isLockedWalletConnected: false,
      },
    };

    const component = shallow(<MyWalletWidgetComponentBody {...props} />);

    expect(component.find(tid("my-wallet-widget-icbm-help-text"))).to.have.length(1);
  });
  it("should render numbers in correct format", () => {
    process.env.NF_CHECK_LOCKED_WALLET_WIDGET_ENABLED = "1";
    const props = {
      isLoading: false,
      data: {
        euroTokenEuroAmount: "66482" + "0".repeat(14),
        euroTokenAmount: "36490" + "0".repeat(18),
        ethAmount: "16482" + "0".repeat(14),
        ethEuroAmount: "6004904646" + "0".repeat(16),
        percentage: "-3.67",
        totalAmount: "637238" + "0".repeat(18),
        isIcbmWalletConnected: false,
        isLockedWalletConnected: false,
      },
    };

    const component = render(wrapWithIntl(<MyWalletWidgetComponentBody {...props} />));

    expect(
      component
        .find(tid("my-wallet-widget-eur-token.large-value"))
        .find(tid("value"))
        .text(),
    ).to.eq("36 490");
    expect(
      component
        .find(tid("my-wallet-widget-eur-token.value"))
        .find(tid("value"))
        .text(),
    ).to.eq("36 490");

    expect(
      component
        .find(tid("my-wallet-widget-eth-token.large-value"))
        .find(tid("value"))
        .text(),
    ).to.eq("1.6482");
    expect(
      component
        .find(tid("my-wallet-widget-eth-token.value"))
        .find(tid("value"))
        .text(),
    ).to.eq("60 049 046.46");

    expect(
      component
        .find(tid("my-wallet-widget-total"))
        .find(tid("value"))
        .text(),
    ).to.eq("637 238");
    expect(
      component
        .find(tid("my-wallet-widget-total"))
        .find(tid("units"))
        .text(),
    ).to.eq(" EUR");
  });

  beforeEach(() => {
    initialWalletWidgetEnabledState = process.env.NF_CHECK_LOCKED_WALLET_WIDGET_ENABLED;
    initialWalletWidgetInDashboardState = process.env.NF_CHECK_LOCKED_WALLET_WIDGET_IN_DASHBOARD;
  });

  afterEach(() => {
    process.env.NF_CHECK_LOCKED_WALLET_WIDGET_ENABLED = initialWalletWidgetEnabledState;
    process.env.NF_CHECK_LOCKED_WALLET_WIDGET_IN_DASHBOARD = initialWalletWidgetInDashboardState;
  });
});
