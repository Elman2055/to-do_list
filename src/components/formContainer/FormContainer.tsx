import { TForm } from "../typesDataComponents/TypesDataComponents";

export const FormContainer = (props: TForm) => {
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
        onChange={(e) => props.priceValue(parseFloat(e.target.value))}
        placeholder="sum:"
      />
      <input
        type="text"
        className="manyOne"
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
