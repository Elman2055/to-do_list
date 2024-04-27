import React, { useState, useEffect } from "react";
import Store from "../components/store/Store";
import {
  InfoProduct,
  InfoPrice,
  InfoStock,
} from "../components/UI/modal/Message";
import { showDeleteConfirm } from "../components/UI/confirm/Confirm";
import { TStoreContainer } from "./TypeDataContainer";
import { FormContainer } from "../components/formContainer/FormContainer";
import "./StoreContainer.scss";

const RandomId = (): number => Math.floor(Math.random() * Date.now());

const StoreContainer = () => {
  const [product, setProduct] = useState<TStoreContainer[]>([
    { id: RandomId(), product: "Iphone", price: 1200, stock: 3 },
    { id: RandomId(), product: "Laptop", price: 3400, stock: 2 },
  ]);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>();
  const [stock, setStock] = useState<number>();

  const [notProduct, setNotProduct] = useState<boolean>(false);

  const HandleSort = (
    key: "title" | "price" | "stock",
    direction: "asc" | "desc"
  ) => {
    const sortproducts = [...product].sort((a, b) => {
      if (key === "title") {
        return direction === "asc"
          ? a.product.localeCompare(b.product)
          : b.product.localeCompare(a.product);
      } else if (key === "price") {
        return direction === "asc" ? a.price - b.price : b.price - a.price;
      } else if (key === "stock") {
        return direction === "asc" ? a.stock - b.stock : b.stock - a.stock;
      }
      return 0;
    });
    setProduct(sortproducts);
  };

  const CreateProduct = () => {
    const newProduct = {
      id: RandomId(),
      product: title,
      price: price as number,
      stock: stock as number,
    };

    setProduct([...product, newProduct]);
  };

  const SameProduct = () => {
    const newProduct = {
      id: RandomId(),
      product: `${title} ${product.length + 1}`,
      price: price as number,
      stock: stock as number,
    };

    setProduct([...product, newProduct]);
  };

  const SameTitle = async () => {
    const existingProductIndex = product.findIndex(
      (item) => item.product.toLowerCase() === title.toLowerCase()
    );

    if (existingProductIndex !== -1) {
      const show = await showDeleteConfirm();
      if (show) {
        const updatedProduct = [...product];
        updatedProduct[existingProductIndex] = {
          ...updatedProduct[existingProductIndex],
          price: price as number,
          stock: stock as number,
        };
        setProduct(updatedProduct);
      } else {
        SameProduct();
      }
    } else {
      CreateProduct();
    }
  };

  const OnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title === "") {
      InfoProduct();
      return;
    } else if (isNaN(price as number)) {
      InfoPrice();
      return;
    } else if (isNaN(stock as number)) {
      InfoStock();
      return;
    }

    SameTitle();
    setNotProduct(false);
  };

  const OnRemove = (id: number) => {
    setProduct((prevProduct) =>
      prevProduct.map((item) => {
        if (item.stock === 0) {
          return item;
        } else if (item.id === id) {
          return { ...item, stock: item.stock - 1 };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    if (!notProduct) {
      const notProduct =
        product.filter((elem) => elem.stock === 0).length === product.length;
      if (notProduct) {
        setNotProduct(true);
        setProduct([]);
      }
    }
  }, [product]);

  return (
    <>
      {notProduct ? (
        <div className="notProduct">
          <h2>No products available</h2>
        </div>
      ) : (
        <div className="storeContainer">
          <div className="title">
            <div className="downTitle listTitle">
              <button className="sort" onClick={() => HandleSort("title", "asc")}>⬆️</button>
              <h3>Title</h3>
              <button className="sort" onClick={() => HandleSort("title", "desc")}>⬇️</button>
            </div>
            <div className="price listTitle">
              <button className="sort" onClick={() => HandleSort("price", "asc")}>⬆️</button>
              <h3>Price</h3>
              <button className="sort" onClick={() => HandleSort("price", "desc")}>⬇️</button>
            </div>
            <div className="stock listTitle">
              <button className="sort" onClick={() => HandleSort("stock", "asc")}>⬆️</button>
              <h3>Stock</h3>
              <button className="sort" onClick={() => HandleSort("stock", "desc")}>⬇️</button>
            </div>
          </div>
          <div className="storeShell">
            {product.map((elem) => (
              <Store
                key={elem.id}
                product={elem.product}
                price={elem.price}
                stock={elem.stock}
                remove={() => OnRemove(elem.id)}
              />
            ))}
          </div>
        </div>
      )}
      <FormContainer
        onSubmit={OnSubmit}
        titleValue={setTitle}
        priceValue={setPrice}
        stockValue={setStock}
      />
    </>
  );
};

export default StoreContainer;