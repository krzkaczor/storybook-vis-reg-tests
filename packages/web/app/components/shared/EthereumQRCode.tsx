import * as QRCode from "qrcode";
import * as React from "react";

import { TDataTestId } from "../../types";

interface IProps {
  address: string;
  value?: number;
  gas?: number;
}

export class EthereumQRCode extends React.Component<IProps & TDataTestId> {
  state = {
    qrCodeImage: "",
  };

  private generateQRCode(): void {
    const { address, value, gas } = this.props;
    const computedValue = value ? `?value=${value}` : "";
    const computedGas = gas ? `?gas=${gas}` : "";
    const url = `ethereum:${address}${computedValue}${computedGas}`;

    QRCode.toString(url, { margin: 0 }).then((svg: string) => {
      this.setState({ qrCodeImage: `data:image/svg+xml;base64,${btoa(svg)}` });
    });
  }

  componentDidMount(): void {
    this.generateQRCode();
  }

  render(): React.ReactNode {
    return (
      <img
        src={this.state.qrCodeImage}
        alt={this.props.address}
        title={this.props.address}
        data-test-id={this.props["data-test-id"]}
      />
    );
  }
}
