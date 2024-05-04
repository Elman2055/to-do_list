import { TStore } from "../typesDataComponents/TypesDataComponents";
import "./Store.scss";

const Store = (props: TStore) => {
  return (
    <div className="store">
      <h3 className="product">{props.product}</h3>
      <h3 className="priceOn">{props.price}</h3>
      <div className="change">
        <h3>{props.stock}</h3>
        <button className="remove" onClick={props.remove}>
          &minus;
        </button>
      </div>
    </div>
  );
};

export default Store;
