import * as React from "react";

import { DEFAULT_DECIMAL_PLACES } from "../../config/constants";
import { TTranslatedString } from "../../types";
import { FormInputError } from "../../utils/errors";
import {
  ENumberInputFormat,
  ENumberOutputFormat,
  ERoundingMode,
  formatNumber,
  isEmptyValue,
  isValidNumber,
  parseInputToNumber,
  selectDecimalPlaces,
  selectUnits,
  stripNumberFormatting,
  toFixedPrecision,
  TValueFormat,
} from "./formatters/utils";
import { EInputSize, InputLayout } from "./forms/index";
import { EInputTheme } from "./forms/layouts/InputLayout";

interface IProps {
  name: string;
  storageFormat: ENumberInputFormat; // how is this value stored in the app state (ULPS or FLOAT)
  outputFormat: ENumberOutputFormat; // how should this value be visualized
  valueType?: TValueFormat;
  value: string;
  onChangeFn: (value: string) => void;
  returnInvalidValues?: boolean;
  setError?: (v: boolean) => void;
  placeholder?: string;
  "data-test-id"?: string;
  showUnits?: boolean;
  errorMsg?: TTranslatedString;
  invalid?: boolean;
  disabled?: boolean;
  className?: string;
  theme?: EInputTheme;
  icon?: string;
  reverseMetaInfo?: boolean;
  prefix?: TTranslatedString;
  suffix?: TTranslatedString;
  size?: EInputSize;
}

export class MaskedNumberInput extends React.Component<IProps> {
  decimals = this.props.valueType
    ? selectDecimalPlaces(this.props.valueType, this.props.outputFormat)
    : DEFAULT_DECIMAL_PLACES;

  formatValue = (value: string): string => {
    if (isEmptyValue(value)) {
      return "";
    } else if (isValidNumber(value)) {
      return toFixedPrecision({
        value,
        roundingMode: ERoundingMode.DOWN,
        inputFormat: ENumberInputFormat.FLOAT,
        outputFormat: this.props.outputFormat,
        decimalPlaces: this.decimals,
      });
    } else {
      return value;
    }
  };

  formatForDisplay = (value: string | undefined, inputFormat: ENumberInputFormat) =>
    value !== undefined && value !== ""
      ? formatNumber({
          value,
          inputFormat,
          roundingMode: ERoundingMode.DOWN,
          decimalPlaces: this.decimals,
          outputFormat: this.props.outputFormat,
        })
      : "";

  state = {
    value: this.formatForDisplay(this.props.value, this.props.storageFormat),
  };

  formatOnChange = (value: string, stateValue: string | undefined) => {
    const decimals = value.split(".")[1];

    if (decimals !== undefined && decimals.length > this.decimals) {
      /*ignore last character if we already have max decimal places, otherwise round value*/
      return stateValue && value.startsWith(stateValue) ? stateValue : this.formatValue(value);
    } else {
      return value;
    }
  };

  changeValue = (value: string) => {
    const validValue: string | null = parseInputToNumber(value);

    if (validValue !== null) {
      const newValue = this.formatOnChange(validValue, this.state.value);
      if (newValue !== this.state.value) {
        this.setState({ value: newValue });
        this.props.onChangeFn(newValue);
        this.props.setError && this.props.setError(false);
      }
    } else if (value !== this.state.value) {
      this.setState({ value });
      this.props.onChangeFn(Boolean(this.props.returnInvalidValues) ? value : "");
      this.props.setError && this.props.setError(true);
    }
  };

  onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.changeValue(e.clipboardData.getData("text"));
  };

  onBlur = (value?: string) => {
    if (isEmptyValue(value) || isValidNumber(value)) {
      this.setState({ value: this.formatForDisplay(value, this.props.storageFormat) });
    }
  };

  onFocus = (value: string | undefined) => {
    if (isEmptyValue(value) || isValidNumber(value)) {
      this.setState({ value: value && stripNumberFormatting(value) });
    } else {
      this.setState({ value });
    }
  };

  hasFocus = (id: string) => !!document.activeElement && document.activeElement.id === id;

  componentDidUpdate(): void {
    if (!(this.props.value === undefined || typeof this.props.value === "string")) {
      throw new FormInputError("MaskedNumberInput accepts only string|undefined");
    }
    if (isValidNumber(this.props.value) || isEmptyValue(this.props.value)) {
      const propsValue = this.formatForDisplay(this.props.value, this.props.storageFormat);
      if (!this.hasFocus(this.props.name) && propsValue !== this.state.value) {
        this.setState({ value: propsValue });
      }
    }
  }

  formatSuffix = () => {
    const units =
      this.props.valueType && this.props.showUnits ? selectUnits(this.props.valueType) : "";

    return units || this.props.suffix ? (
      <>
        {units} {this.props.suffix}
      </>
    ) : (
      undefined
    );
  };

  render(): React.ReactNode {
    return (
      <InputLayout
        className={this.props.className}
        value={this.state.value}
        name={this.props.name}
        data-test-id={this.props["data-test-id"]}
        placeholder={this.props.placeholder}
        prefix={this.props.prefix}
        suffix={this.formatSuffix()}
        errorMsg={this.props.errorMsg}
        invalid={this.props.invalid}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => this.onBlur(e.target.value)}
        onFocus={(e: React.FocusEvent<HTMLInputElement>) => this.onFocus(e.target.value)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.changeValue(e.target.value)}
        onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => this.onPaste(e)}
        disabled={this.props.disabled}
        theme={this.props.theme}
        icon={this.props.icon}
        reverseMetaInfo={this.props.reverseMetaInfo}
        size={this.props.size}
      />
    );
  }
}

//TODO add api calls error handling
