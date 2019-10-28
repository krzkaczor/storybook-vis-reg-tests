import { expect } from "chai";
import { shallow } from "enzyme";
import * as React from "react";

import { tid } from "../../../../test/testUtils";
import { BackupSeedWidgetBase } from "./BackupSeedWidget";

describe("<BackupSeedWidgetBase />", () => {
  it("should render verified section", () => {
    const MyNeuWidgetComponent = shallow(<BackupSeedWidgetBase backupCodesVerified step={1} />);
    expect(MyNeuWidgetComponent.find(tid("backup-seed-unverified-section"))).to.have.length(0);
    expect(MyNeuWidgetComponent.find(tid("backup-seed-verified-section"))).to.have.length(1);
  });

  it("should render unverified section", () => {
    const MyNeuWidgetComponent = shallow(
      <BackupSeedWidgetBase backupCodesVerified={false} step={1} />,
    );
    expect(MyNeuWidgetComponent.find(tid("backup-seed-unverified-section"))).to.have.length(1);
    expect(MyNeuWidgetComponent.find(tid("backup-seed-verified-section"))).to.have.length(0);
  });
});
