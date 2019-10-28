import * as React from "react";
import { Modal as ReactstrapModal } from "reactstrap";

import { CommonHtmlProps } from "../../types";
import { ButtonClose } from "../shared/buttons";
import { Panel } from "../shared/Panel";

import * as styles from "./Modal.module.scss";

export interface IModalComponentProps {
  onClose?: () => void;
  isOpen: boolean;
}

export const Modal: React.FunctionComponent<IModalComponentProps & CommonHtmlProps> = ({
  children,
  onClose,
  isOpen,
  className,
  ...props
}) => (
  <ReactstrapModal isOpen={isOpen} toggle={onClose} className={className} centered={true}>
    <Panel className={styles.modal} {...props}>
      <div className={styles.header}>
        {onClose && <ButtonClose data-test-id="modal-close-button" onClick={onClose} />}
      </div>
      <div className={styles.body}>{children}</div>
    </Panel>
  </ReactstrapModal>
);
