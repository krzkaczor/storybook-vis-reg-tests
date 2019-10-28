import { expect } from "chai";
import { shallow } from "enzyme";
import * as React from "react";
import { spy } from "sinon";

import { tid } from "../../../../test/testUtils";
import { LoadingIndicator } from "../../shared/loading-indicator";
import { WalletLedgerChooserComponent } from "./WalletLedgerChooserComponent";
import { WalletLedgerChooserTableAdvanced } from "./WalletLedgerChooserTableAdvanced";
import { WalletLedgerChooserTableSimple } from "./WalletLedgerChooserTableSimple";
import { WalletLedgerDPChooser } from "./WalletLedgerDPChooser";

const defaultProps = () => ({
  loading: false,
  accounts: [
    {
      address: "0x6C1086C292a7E1FdF66C68776eA972038467A370",
      derivationPath: "44'/60'/0'/0",
      balanceETH: "1.6495ETH",
      balanceNEU: "0",
    },
    {
      address: "0xB2A0e2688c5A82bEEe6818F5a3D206680FdFD75d",
      derivationPath: "44'/60'/0'/1",
      balanceETH: "0",
      balanceNEU: "0",
    },
    {
      address: "0xa13D14DA39529761a6C45F4f556700735E0774a8",
      derivationPath: "44'/60'/0'/2",
      balanceETH: "0",
      balanceNEU: "0",
    },
    {
      address: "0x3cC2ef578f6Eb7ff63f9CA8f5a54cfe40339256A",
      derivationPath: "44'/60'/0'/3",
      balanceETH: "1.6495ETH",
      balanceNEU: "0",
    },
  ],
  handleAddressChosen: spy(),
  hasPreviousAddress: true,
  showPrevAddresses: spy(),
  showNextAddresses: spy(),
  onDerivationPathPrefixChange: spy(),
  onDerivationPathPrefixError: spy(),
  advanced: true,
  handleAdvanced: spy(),
});

describe("<WalletLedgerChooserComponent />", () => {
  it("should render LoadingIndicator for loading attribute", () => {
    const props = {
      ...defaultProps(),
      loading: true,
    };
    const component = shallow(<WalletLedgerChooserComponent {...props} />);

    expect(component.contains(<LoadingIndicator />)).to.be.true;
  });

  it("should render WalletLedgerDPChooser for advanced use case", () => {
    const component = shallow(<WalletLedgerChooserComponent {...defaultProps()} />);
    expect(
      component.find(WalletLedgerDPChooser),
      "doesn't contain WalletLedgerDPChooser",
    ).to.be.length(1);
  });

  it("should render correct advanced / simple data table according do advanced parameter ", () => {
    const propsAdvanced = {
      ...defaultProps(),
      advanced: true,
    };

    const componentAdvanced = shallow(<WalletLedgerChooserComponent {...propsAdvanced} />);
    expect(
      componentAdvanced.find(WalletLedgerChooserTableAdvanced),
      "doesn't contain WalletLedgerChooserTableAdvanced",
    ).to.be.length(1);

    const propsSimple = {
      ...defaultProps(),
      advanced: false,
    };

    const componentSimple = shallow(<WalletLedgerChooserComponent {...propsSimple} />);
    expect(
      componentSimple.find(WalletLedgerChooserTableSimple),
      "doesn't contain WalletLedgerChooserTableSimple",
    ).to.be.length(1);
  });

  it("should not render accounts table if there are no accounts to show", () => {
    const propsAdvanced = {
      ...defaultProps(),
      advanced: true,
      accounts: [],
    };
    const componentAdvanced = shallow(<WalletLedgerChooserComponent {...propsAdvanced} />);
    expect(componentAdvanced.find(WalletLedgerChooserTableAdvanced)).to.have.length(0);

    const propsSimple = {
      ...defaultProps(),
      advanced: false,
      accounts: [],
    };
    const componentSimple = shallow(<WalletLedgerChooserComponent {...propsSimple} />);
    expect(componentSimple.find(WalletLedgerChooserTableSimple)).to.have.length(0);
  });

  it("should render correct advanced / back buttons according to advanced parameter", () => {
    const propsAdvanced = {
      ...defaultProps(),
      advanced: true,
    };

    const componentAdvanced = shallow(<WalletLedgerChooserComponent {...propsAdvanced} />);
    expect(
      componentAdvanced.find(tid("btn-advanced-advanced")),
      'doesn\'t contain "back" button',
    ).to.be.length(1);

    const propsSimple = {
      ...defaultProps(),
      advanced: false,
    };

    const componentSimple = shallow(<WalletLedgerChooserComponent {...propsSimple} />);
    expect(
      componentSimple.find(tid("btn-advanced-simple")),
      'doesn\'t contain "advanced selection" button',
    ).to.be.length(1);
  });

  it('should fire handleAdvanced action when "advanced selection ", "back" buttons are clicked ', () => {
    const propsAdvanced = {
      ...defaultProps(),
      advanced: true,
    };

    const componentAdvanced = shallow(<WalletLedgerChooserComponent {...propsAdvanced} />);
    componentAdvanced.find(tid("btn-advanced-advanced")).simulate("click");
    expect(propsAdvanced.handleAdvanced).to.be.calledOnce;

    const propsSimple = {
      ...defaultProps(),
      advanced: false,
    };

    const componentSimple = shallow(<WalletLedgerChooserComponent {...propsSimple} />);
    componentSimple.find(tid("btn-advanced-simple")).simulate("click");
    expect(propsSimple.handleAdvanced).to.be.calledOnce;
  });
});
