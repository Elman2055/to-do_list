import React from "react";

export type TStore = {
  product: string;
  price: number;
  stock: number;
  remove: VoidFunction;
};

export type TForm = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  titleValue: (e: string) => void;
  priceValue: (e: number) => void;
  stockValue: (e: number) => void;
};
