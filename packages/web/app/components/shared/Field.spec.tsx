import { expect } from "chai";
import { mount, shallow } from "enzyme";
import * as React from "react";
import { object, string } from "yup";

import { Field, FieldSchemaProvider } from "./Field";
import { SanitizedHtml } from "./SanitizedHtml";

describe("<Field />", () => {
  it("should render plain text when schema is not available", () => {
    const wrapper = shallow(<Field name="foo" value="<p>bar</p>" />);

    expect(wrapper.text()).to.equal("<p>bar</p>");
  });

  it("should render plain text when schema field is without meta", () => {
    const wrapper = shallow(
      <Field name="foo" value="<p>bar</p>" schema={object({ foo: string() })} />,
    );

    expect(wrapper.text()).to.equal("<p>bar</p>");
  });

  it("should render html when schema field is with isWysiwyg meta", () => {
    const wrapper = shallow(
      <Field
        name="foo"
        value="<p>bar</p>"
        schema={object({ foo: string().meta({ isWysiwyg: true }) })}
      />,
    );

    expect(wrapper.find(SanitizedHtml).props()).to.contain({ unsafeHtml: "<p>bar</p>" });
  });

  it("should support schema from context", () => {
    const wrapper = mount(
      <FieldSchemaProvider value={object({ foo: string().meta({ isWysiwyg: true }) })}>
        <Field name="foo" value="<p>bar</p>" />
      </FieldSchemaProvider>,
    );

    expect(wrapper.find(SanitizedHtml).props()).to.contain({ unsafeHtml: "<p>bar</p>" });
  });

  it("should prefer schema from props over the one from context support schema from context", () => {
    const wrapper = mount(
      <FieldSchemaProvider value={object({ foo: string().meta({ isWysiwyg: true }) })}>
        <Field
          name="foo"
          value="<p>bar</p>"
          schema={object({ foo: string().meta({ isWysiwyg: false }) })}
        />
      </FieldSchemaProvider>,
    );

    expect(wrapper.text()).to.equal("<p>bar</p>");
  });
});
