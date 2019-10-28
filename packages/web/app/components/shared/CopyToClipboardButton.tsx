import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";

import { TTranslatedString } from "../../types";
import { ButtonIcon } from "./buttons";
import { useCopyClipboard } from "./hooks/useCopyToClipboard";

import * as clipboardIcon from "../../assets/img/inline_icons/icon-clipboard.svg";

interface IProps {
  value: string;
  alt?: TTranslatedString;
  message?: TTranslatedString;
  className?: string;
  "data-test-id"?: string;
}

const CopyToClipboardButton: React.FunctionComponent<IProps> = ({
  className,
  alt,
  value,
  message,
}) => {
  const [, copyToClipboard] = useCopyClipboard();

  return (
    <ButtonIcon
      className={className}
      svgIcon={clipboardIcon}
      alt={alt || <FormattedMessage id="shared-component.copy-to-clipboard.alt" />}
      onClick={() => copyToClipboard(value, { message })}
    />
  );
};

export { CopyToClipboardButton };
