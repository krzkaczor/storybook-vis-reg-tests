import { expect } from "chai";
import { shallow } from "enzyme";
import { noop } from "lodash";
import * as React from "react";

import { tid } from "../../../../test/testUtils";
import { BackupSeedDisplay } from "./BackupSeedDisplay";

const WalletPrivateData = {
  seed: [
    "word1",
    "word2",
    "word3",
    "word4",
    "word5",
    "word6",
    "word7",
    "word8",
    "word9",
    "word10",
    "word11",
    "word12",
    "word13",
    "word14",
    "word15",
    "word16",
    "word17",
    "word18",
    "word19",
    "word20",
    "word21",
    "word22",
    "word23",
    "word24",
  ],
  privateKey: "0x123",
};

describe("<BackupSeedDisplay />", () => {
  it("should render full words", () => {
    const component = shallow(
      <BackupSeedDisplay onBack={noop} onNext={noop} walletPrivateData={WalletPrivateData} />,
    );

    const renderedWords: string[] = [];
    component.find(tid("seed-display-word")).forEach(node => {
      renderedWords.push(node.childAt(1).text());
    });

    for (let index = 0; index < WalletPrivateData.seed.length; index++) {
      expect(
        renderedWords[index].includes(WalletPrivateData.seed[index]),
        `rendered word: ${renderedWords[index]} doesn't include: ${WalletPrivateData.seed[index]}`,
      ).to.be.true;
    }
  });
});
