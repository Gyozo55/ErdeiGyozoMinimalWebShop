import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { FiXOctagon, FiPlus, FiCheck } from "react-icons/fi";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { InputStyles } from '../styles/InputStyles';
import {
  ErrorMessage,
  Product,
  TextWrapper,
  Amount,
  AmountWrapper,
  DeleteButton,
  UpdateButton,
  FormStyles,
} from "../styles/ComponentStyles";


export default function ProductList({ products, setProducts, reload, setReload}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [id, setId] = useState();
  const url = `http://localhost/ErdeiGyozoFalatozzHw/api/product/read_all.php`

  const [state, setState] = useState({
    name: '',
    description: '',
    price: 0,
  });

  function handleChange(e) {
    setId(e.target.id)
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  }

  function checkFields() {
    if (state.name === '' || state.price <= 0) {
      alert('Nem Megfelelő Adatok: Próbálkozzon Újra!')
      return false
    }
    return true
  }


  function updateProduct() {
    checkFields()
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        name: state.name,
        description: state.description,
        price: state.price
      }),
    };
    if(checkFields()){
      fetch("http://localhost/ErdeiGyozoFalatozzHw/api/product/update.php", requestOptions)
      .then((response) => {if (response.status === 200){
        setState({
          name: '',
          description: '',
          price: 0,
        })
        alert('Sikeres termék módosítás!')
        setReload(true)
      }})
  }
  }

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
          A szerver jelenleg nem elérhető, próbálkozzon később!
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
            <Popup contentStyle={{width: "300px", height: "300px"}} trigger={<UpdateButton><FiPlus/></UpdateButton>} position="right center">
              <TextWrapper>
                <h3>Termék Módosítása:</h3>
              </TextWrapper>
              <FormStyles>
                <InputStyles
                  id={product.id}
                  name='name'
                  type='text'
                  placeholder={product.name}
                  value={state.name}
                  onChange={handleChange}
                  />
                <InputStyles
                  id={product.id}
                  name='description'
                  type='text'
                  placeholder={product.description}
                  value={state.description}
                  onChange={handleChange}
                  />
                <InputStyles
                  id={product.id}
                  name='price'
                  type='number'
                  placeholder={product.price}
                  value={state.price}
                  onChange={handleChange}
                  />
              <UpdateButton onClick={() => updateProduct()}>
                <FiCheck/>
              </UpdateButton>
              <DeleteButton onClick={() => setReload(true)}>
                <FiXOctagon/>
              </DeleteButton>
              </FormStyles>
            </Popup>
            <DeleteButton onClick={() => deleteProduct(product.id)}>
              <FiXOctagon/>
            </DeleteButton>
          </Product>
        ))}
    </>
  );
}
