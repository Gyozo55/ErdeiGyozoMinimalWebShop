import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { FiXOctagon } from "react-icons/fi";

import {
  ErrorMessage,
  Product,
  TextWrapper,
  Amount,
  AmountWrapper,
  IconWrapper,
  Button,
} from "../styles/ComponentStyles";

export default function ProductList({ products, setProducts, url, setUrl }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(true);

  function deleteProduct(id){
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id
      }),
    };
    fetch("http://localhost/ErdeiGyozoFalatozzHw/api/product/delete.php", requestOptions)
      .then(setReload(true))
  }

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
        setReload(false)
      });
  }, [reload]);

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
            <Button onClick={() => deleteProduct(product.id)}>
              <FiXOctagon/>
            </Button>
          </Product>
        ))}
    </>
  );
}
