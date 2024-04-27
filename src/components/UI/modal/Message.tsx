import React from "react";
import { message } from "antd";

export const InfoProduct = () => {
  message.info(`Please enter the title !`);
};

export const InfoPrice = () => {
  message.info(`Please enter the sum (in numeric format) !`);
};

export const InfoStock = () => {
  message.info(`Please enter the quantity (in numeric format) !`);
};
