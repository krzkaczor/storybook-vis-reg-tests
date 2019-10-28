import { Moment } from "moment";
import * as React from "react";
import * as DateTime from "react-datetime";

import "react-datetime/css/react-datetime.css";

// We need to do this because of missing type for `renderInput`
// https://github.com/YouCanBookMe/react-datetime/pull/541
type DatetimeProps = DateTime.DatetimepickerProps & {
  dataTestId?: string;
  isValidDate?: (currentDate: Moment, selectedDate?: Moment) => boolean;
  renderInput?: (
    props: any,
    openCalendar: () => void,
    closeCalendar: () => void,
    onChange: () => void,
  ) => void;
};

const TypedDatetime = DateTime as React.ComponentType<DatetimeProps>;

export { TypedDatetime, DatetimeProps };
