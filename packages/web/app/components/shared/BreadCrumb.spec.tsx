import { expect } from "chai";
import { shallow } from "enzyme";
import * as React from "react";

import { tid } from "../../../test/testUtils";
import { BreadCrumb } from "./BreadCrumb";

describe("<BreadCrumb />", () => {
  const viewName = "view";

  it("should render correctly when path attribute is not provided", () => {
    const component = shallow(<BreadCrumb view={viewName} />);

    expect(component.find(tid("breadcrumb-path-first"))).to.have.length(0);
    expect(component.find(tid("breadcrumb-path-rest"))).to.have.length(0);
    expect(component.find(tid("breadcrumb-view-name")).text()).to.be.eq(viewName);
  });

  it("should render correctly when path attribute is empty array", () => {
    const component = shallow(<BreadCrumb path={[]} view={viewName} />);

    expect(component.find(tid("breadcrumb-path-first"))).to.have.length(0);
    expect(component.find(tid("breadcrumb-path-rest"))).to.have.length(0);
    expect(component.find(tid("breadcrumb-view-name")).text()).to.be.eq(viewName);
  });

  it("should render correctly when path attribute is array with length of 1", () => {
    const path = ["first"];

    const component = shallow(<BreadCrumb path={path} view={viewName} />);

    expect(component.find(tid("breadcrumb-path-first")).text()).to.be.eq(path[0]);
    expect(component.find(tid("breadcrumb-path-rest"))).to.have.length(0);
    expect(component.find(tid("breadcrumb-view-name")).text()).to.be.eq(viewName);
  });

  it("should render correctly when path attribute is array with length bigger then 1", () => {
    const path = ["first", "second"];
    const pathRestText = path
      .slice(1)
      .map(pathEntry => ` / ${pathEntry}`)
      .join();

    const component = shallow(<BreadCrumb path={path} view={viewName} />);

    expect(component.find(tid("breadcrumb-path-first")).text()).to.be.eq(path[0]);
    expect(component.find(tid("breadcrumb-path-rest")).text()).to.be.eq(pathRestText);
    expect(component.find(tid("breadcrumb-view-name")).text()).to.be.eq(viewName);
  });
});
