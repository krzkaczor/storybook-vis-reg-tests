import * as React from "react";

import { TFileDescription } from "../../lib/api/file-storage/FileStorage.interfaces";
import { actions } from "../../modules/actions";
import { appConnect } from "../../store";

interface IOwnProps {
  url: string;
  children: (fileDescription: TFileDescription) => any;
}

interface IDispatchProps {
  getFileInfo: (
    fileUrl: string,
    onDone: (error: any, fileDescription?: TFileDescription) => any,
  ) => any;
}

interface IState {
  isLoading: boolean;
  fileDescription?: TFileDescription;
}

type TProps = IOwnProps & IDispatchProps;

/**
 * Allows to easily access information about remote file without putting data anywhere in the redux store.
 */
export class RemoteFileComponent extends React.Component<TProps, IState> {
  state: IState = {
    isLoading: true,
  };

  constructor(props: TProps) {
    super(props);

    this.props.getFileInfo(this.props.url, this.onDone);
  }

  private onDone = (_error: any, fileDescription?: TFileDescription) => {
    this.setState({
      isLoading: false,
      fileDescription,
    });
  };

  render(): React.ReactNode {
    const { children } = this.props;
    const { isLoading, fileDescription } = this.state;

    if (!isLoading && fileDescription) {
      return children(fileDescription);
    }
    return <div />;
  }
}

export const RemoteFile = appConnect<{}, IDispatchProps, IOwnProps>({
  dispatchToProps: dispatch => ({
    getFileInfo: (fileUrl, onDone) => dispatch(actions.remoteFile.getRemoteFile(fileUrl, onDone)),
  }),
})(RemoteFileComponent);
