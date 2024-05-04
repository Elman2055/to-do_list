import React from "react";
import { TForm } from "../typesDataComponents/TypesDataComponents";

export const FormContainer = (props: TForm) => {
  const HandleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  return (
    <form onSubmit={props.onSubmit}>
      <input
        type="text"
        className="titleOne"
        onChange={(e) => props.titleValue(e.target.value)}
        placeholder="title:"
      />
      <input
        type="text"
        className="sumOne"
        onKeyDown={HandleKeyDown}
        onChange={(e) => props.priceValue(parseFloat(e.target.value))}
        placeholder="sum:"
      />
      <input
        type="text"
        className="manyOne"
        onKeyDown={HandleKeyDown}
        onChange={(e) => props.stockValue(parseFloat(e.target.value))}
        placeholder="quantity:"
      />
      <div className="btnContainer">
        <button type="submit" className="createBtn">
          Create
        </button>
      </div>
    </form>
  );
};
