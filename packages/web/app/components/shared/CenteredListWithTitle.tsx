import * as React from "react";
import { Col } from "reactstrap";

import { EHeadingSize, Heading } from "./Heading";
import { HorizontalLine } from "./HorizontalLine";

import * as styles from "./CenteredListWithTitle.module.scss";

interface IProps {
  title: string;
  list: string[];
}

export const CenteredListWithTitle: React.FunctionComponent<IProps> = ({ title, list }) => (
  <Col xs={12} md={6} className="py-4">
    <Heading decorator={false} level={3} size={EHeadingSize.HUGE} titleClassName={styles.title}>
      {title}
    </Heading>
    <HorizontalLine theme="yellow" size="narrow" className="my-3" />
    <div>
      {list.map((listElement, index) => (
        <div key={index}>{listElement}</div>
      ))}
    </div>
  </Col>
);
