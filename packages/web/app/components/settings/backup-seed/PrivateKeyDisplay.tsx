import * as cn from "classnames";
import * as React from "react";
import { FormattedHTMLMessage, FormattedMessage } from "react-intl-phraseapp";

import { Button, ButtonGroup, EButtonLayout, EIconPosition } from "../../shared/buttons";
import { Heading } from "../../shared/Heading";
import { useCopyClipboard } from "../../shared/hooks/useCopyToClipboard";

import * as blindIcon from "../../../assets/img/inline_icons/blind.svg";
import * as eyeIcon from "../../../assets/img/inline_icons/eye.svg";
import * as clipboardIcon from "../../../assets/img/inline_icons/icon-clipboard.svg";
import * as styles from "./PrivateKeyDisplay.module.scss";

type TProps = {
  privateKey: string;
};

const PrivateKeyDisplay: React.FunctionComponent<TProps> = ({ privateKey }) => {
  const [showPrivateKey, setShowPrivateKey] = React.useState(false);
  const [, copyToClipboard] = useCopyClipboard();

  const togglePrivateKeyVisibility = () => {
    setShowPrivateKey(show => !show);
  };

  const copyPrivateKeyToClipboard = () => {
    copyToClipboard(privateKey, {
      message: (
        <FormattedMessage id="components.settings.private-key-display.copied-to-clipboard" />
      ),
      "data-test-id": "private-key-display-copied-to-clipboard",
    });
  };

  return (
    <section className="mb-4">
      <Heading level={3} className="mb-3">
        <FormattedMessage id="components.settings.private-key-display.header" />
      </Heading>
      <p>
        <FormattedHTMLMessage
          tagName="span"
          id="components.settings.private-key-display.description"
        />
      </p>
      <ButtonGroup>
        <Button
          data-test-id="private-key-display.copy-to-clipboard"
          className={styles.button}
          innerClassName={styles.content}
          layout={EButtonLayout.SIMPLE}
          onClick={copyPrivateKeyToClipboard}
          type="button"
          svgIcon={clipboardIcon}
          iconPosition={EIconPosition.ICON_AFTER}
        >
          <FormattedMessage id="components.settings.private-key-display.copy-private-key" />
        </Button>
        <Button
          aria-live="polite"
          data-test-id="private-key-display.view-private-key"
          className={styles.button}
          innerClassName={cn(styles.content, { [styles.contentActive]: showPrivateKey })}
          layout={EButtonLayout.SIMPLE}
          onClick={togglePrivateKeyVisibility}
          svgIcon={showPrivateKey ? blindIcon : eyeIcon}
          iconPosition={EIconPosition.ICON_AFTER}
        >
          {showPrivateKey ? (
            process.env.NF_CYPRESS_RUN === "1" ? (
              <div data-test-id="private-key-display.content">{privateKey}</div>
            ) : (
              privateKey
            )
          ) : (
            <FormattedMessage id="components.settings.private-key-display.view-private-key" />
          )}
        </Button>
      </ButtonGroup>
    </section>
  );
};

export { PrivateKeyDisplay };
