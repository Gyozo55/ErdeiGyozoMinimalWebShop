import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import {
  ErrorMessage,
  Product,
  TextWrapper,
  Amount,
  AmountWrapper,
} from "../styles/ComponentStyles";

export default function ProductList({ products, setProducts, url, setUrl }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(url, {
      method: "GET",
    })
      .then(async (res) => {
        const body = await res.json();
        return {
          status: res.status,
          body,
        };
      })
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.body);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  if (loading) return <Loader />;

  return (
    <>
      {error && (
        <ErrorMessage>
          The server is probably down. Please try again later.
        </ErrorMessage>
      )}
      {!products.length && !error && (
        <h1 style={{ textAlign: "center", marginTop: "4rem" }}>
          Yay!{" "}
          <span role="img" aria-label="jsx-a11y/accessible-emoji">
            🎉
          </span>{" "}
          Jelenleg nincs elérhető termék.
        </h1>
      )}
      {products.length > 0 &&
        products.map((product) => (
          <Product key={product.id}>
            <TextWrapper>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </TextWrapper>
            <AmountWrapper>
              <Amount>
                {product.price} Ft
              </Amount>
            </AmountWrapper>
            <i class="fa fa-trash" aria-hidden="true"></i>
          </Product>
        ))}
    </>
  );
}
