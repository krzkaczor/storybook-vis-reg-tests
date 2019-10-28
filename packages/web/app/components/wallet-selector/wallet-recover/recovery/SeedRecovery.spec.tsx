import { expect } from "chai";
import { shallow } from "enzyme";
import * as React from "react";
import { spy } from "sinon";

import { tid } from "../../../../../test/testUtils";
import { SEED_LENGTH, WalletLightSeedRecoveryComponent } from "./SeedRecovery.unsafe";

const defaultProps = () => ({
  startingStep: 0,
  extraSteps: 0,
  sendWords: spy(),
});

const initialState = () => ({
  words: Array(SEED_LENGTH).fill(null),
  page: 0,
});

describe("<WalletLightSeedRecoveryComponent />", () => {
  it("buttons should be disabled for initial state", () => {
    const component = shallow(<WalletLightSeedRecoveryComponent {...defaultProps()} />);

    expect(component.find(tid("btn-previous")).prop("disabled")).to.be.true;
    expect(component.find(tid("btn-next")).prop("disabled")).to.be.true;
    expect(component.find(tid("btn-send")).prop("disabled")).to.be.true;
  });

  it("previous button should be active on pages higher than 0 ", () => {
    const state = initialState();
    state.page = 1;

    const component = shallow(<WalletLightSeedRecoveryComponent {...defaultProps()} />);
    component.setState(state);

    expect(component.find(tid("btn-previous")).prop("disabled")).to.be.false;
  });

  it("next button active only when all words on page are filled in", () => {
    const state = initialState();
    state.words[0] = "aaa";
    state.words[1] = "aaa";
    state.words[2] = "aaa";
    state.words[3] = "aaa";

    const component = shallow(<WalletLightSeedRecoveryComponent {...defaultProps()} />);
    component.setState(state);

    expect(component.find(tid("btn-next")).prop("disabled")).to.be.false;
  });

  it("send button should be active only if all words are entered", () => {
    const state = initialState();
    state.words = state.words.fill("aaa");

    const component = shallow(<WalletLightSeedRecoveryComponent {...defaultProps()} />);
    component.setState(state);

    expect(component.find(tid("btn-send")).prop("disabled")).to.be.false;
  });

  it("previous button should call method to decrease page number", () => {
    const state = initialState();
    state.page = 1;

    const component = shallow<WalletLightSeedRecoveryComponent>(
      <WalletLightSeedRecoveryComponent {...defaultProps()} />,
    );
    component.setState(state);

    component.find(tid("btn-previous")).simulate("click");
    expect(component.state().page).to.be.eq(0);
  });

  it("previous button should call method to increase page number", () => {
    const component = shallow<WalletLightSeedRecoveryComponent>(
      <WalletLightSeedRecoveryComponent {...defaultProps()} />,
    );

    component.find(tid("btn-next")).simulate("click");

    expect(component.state().page).to.be.eq(1);
  });

  it("send button should call correct method", () => {
    const props = defaultProps();

    const component = shallow<WalletLightSeedRecoveryComponent>(
      <WalletLightSeedRecoveryComponent {...props} />,
    );
    component.find(tid("btn-send")).simulate("click");

    expect(props.sendWords).to.be.calledWith(component.state().words.join(" "));
  });
});
