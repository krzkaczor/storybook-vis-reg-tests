import * as React from "react";

interface IState {
  isOpen: boolean;
}

interface IProps {
  renderMenu: React.ReactNode;
  openElement?: React.ReactNode;
  closedElement: React.ReactNode;
  className: string;
}

export class MenuBase extends React.Component<IProps, IState> {
  state = {
    isOpen: false,
  };

  menuRef = React.createRef<HTMLDivElement>();

  openElement = this.props.openElement || this.props.closedElement;

  toggleMenu = () => {
    if (this.state.isOpen) {
      this.stopWatchingForClickOutside();
    } else {
      this.watchForClickOutside();
    }
    this.setState(s => ({
      isOpen: !s.isOpen,
    }));
  };

  watchForClickOutside = () => {
    document.addEventListener("mouseup", this.outsideClickHandler);
  };

  stopWatchingForClickOutside = () => {
    document.removeEventListener("mouseup", this.outsideClickHandler);
  };

  outsideClickHandler = (e: MouseEvent) => {
    if (this.menuRef.current !== null && !e.composedPath().includes(this.menuRef.current)) {
      this.toggleMenu();
    }
  };

  render(): React.ReactNode {
    return (
      <div ref={this.menuRef} className={this.props.className} onClick={this.toggleMenu}>
        {this.state.isOpen ? this.openElement : this.props.closedElement}
        {this.state.isOpen && this.props.renderMenu}
      </div>
    );
  }
}
