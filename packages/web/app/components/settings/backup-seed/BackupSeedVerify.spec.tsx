import { expect } from "chai";
import { shallow } from "enzyme";
import { difference, noop } from "lodash";
import * as React from "react";

import { tid } from "../../../../test/testUtils";
import { englishMnemonics } from "../../../utils/englishMnemonics";
import { BackupSeedVerify, IBackupSeedVerifyState } from "./BackupSeedVerify.unsafe";

const words = englishMnemonics.slice(0, 24);

describe("<BackupSeedVerify />", () => {
  it("should render word selectors with correct labels", () => {
    const component = shallow(<BackupSeedVerify words={words} onBack={noop} onNext={noop} />);

    const wordsToCheck = (component.state() as IBackupSeedVerifyState).verificationWords.map(
      word => word.number,
    );
    const re = /\d+/;
    const labels = component.find(tid("seed-verify-label")).map(node => {
      const match = re.exec(node.text());
      if (match !== null) {
        return Number.parseInt(match[0], 10) - 1;
      } else {
        throw Error("BackupSeedVerify doesn't contain correct text labels");
      }
    });

    expect(
      difference(wordsToCheck, labels),
      "labels doesn't correspond to words selected for check",
    ).to.have.lengthOf(0);
  });

  it("shouldn't show incorrect validation msg nor continue button without entered words", () => {
    const component = shallow(<BackupSeedVerify words={words} onBack={noop} onNext={noop} />);

    expect(component.find(tid("seed-verify-invalid-msg"))).to.have.lengthOf(0);
    expect(component.find(tid("seed-verify-button-next"))).to.have.lengthOf(0);
  });

  it("shouldn't show incorrect validation msg nor continue button when there is one correct word", () => {
    const component = shallow(<BackupSeedVerify words={words} onBack={noop} onNext={noop} />);
    const state: IBackupSeedVerifyState = {
      verificationWords: [
        { number: 0, word: words[0], isValid: true },
        { number: 1, word: "", isValid: undefined },
        { number: 2, word: "", isValid: undefined },
        { number: 3, word: "", isValid: undefined },
      ],
    };

    component.setState(state);

    expect(component.find(tid("seed-verify-invalid-msg"))).to.have.lengthOf(0);
    expect(component.find(tid("seed-verify-button-next"))).to.have.lengthOf(0);
  });

  it("should show continue button when all words are correct", () => {
    const component = shallow(<BackupSeedVerify words={words} onBack={noop} onNext={noop} />);
    const state: IBackupSeedVerifyState = {
      verificationWords: [
        {
          number: 0,
          word: words[0],
          isValid: true,
        },
        {
          number: 1,
          word: words[1],
          isValid: true,
        },
        {
          number: 2,
          word: words[2],
          isValid: true,
        },
        {
          number: 3,
          word: words[3],
          isValid: true,
        },
      ],
    };
    component.setState(state);

    expect(component.find(tid("seed-verify-invalid-msg"))).to.have.lengthOf(0);
    expect(component.find(tid("seed-verify-button-next"))).to.have.lengthOf(1);
  });

  it("should show continue validation msg when incorrect word was selected", () => {
    const component = shallow(<BackupSeedVerify words={words} onBack={noop} onNext={noop} />);
    const state: IBackupSeedVerifyState = {
      verificationWords: [
        { number: 0, word: words[6], isValid: false },
        { number: 1, word: "", isValid: undefined },
        { number: 2, word: "", isValid: undefined },
        { number: 3, word: "", isValid: undefined },
      ],
    };

    component.setState(state);

    expect(component.find(tid("seed-verify-invalid-msg"))).to.have.lengthOf(1);
    expect(component.find(tid("seed-verify-button-next"))).to.have.lengthOf(0);
  });
});
