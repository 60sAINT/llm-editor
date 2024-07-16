import React from "react";
import Clipboard from "clipboard";
import Button, { ButtonType } from "antd/es/button";
import { Component, Fragment } from "react";
import { showMessage } from "@/common/utils/message";

export interface ICopyButtonProps {
  copyText?: any;
  title: string | React.ReactNode;
  successCallBack?: () => void;
  errorCallBack?: () => void;
  useButton?: boolean; // 使用antd button
  buttonType?: ButtonType;
}
export class CopyButton extends Component<ICopyButtonProps> {
  private clipboard!: Clipboard;

  public componentDidMount() {
    const { successCallBack, errorCallBack } = this.props;
    this.clipboard = new Clipboard(".copy-button");
    this.clipboard.on("success", () => {
      if (successCallBack) {
        successCallBack();
      } else {
        showMessage("Successful copy");
      }
    });
    this.clipboard.on("error", () => {
      if (errorCallBack) {
        errorCallBack();
      }
    });
  }

  public componentWillUnmount() {
    this.clipboard.destroy();
  }

  public render() {
    return (
      <Fragment>
        {this.props.useButton ? (
          <Button
            className="copy-button"
            type={this.props.buttonType || "default"}
            data-clipboard-text={this.props.copyText}
            disabled={!this.props.copyText}
          >
            {this.props.title}
          </Button>
        ) : (
          <span
            className="btn-link copy-button"
            data-clipboard-text={this.props.copyText}
          >
            {this.props.title}
          </span>
        )}
      </Fragment>
    );
  }
}
