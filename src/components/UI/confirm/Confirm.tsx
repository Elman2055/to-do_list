import React from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";

export const showDeleteConfirm = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      title: "Do you really want to change the data of an existing product?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => resolve(true),
      onCancel: () => resolve(false),
    });
  });
};
