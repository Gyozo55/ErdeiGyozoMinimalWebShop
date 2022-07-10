import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Layout from './components/Layout';
import Form from './components/Form';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { UpdateButton } from "./styles/ComponentStyles";

export default function App() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(true);

  return (
    <>
      <Layout>
        <Popup contentStyle={{width: "400px", height: "390px"}} trigger={<UpdateButton>Új Termék Létrehozása</UpdateButton>} position="right center">
          <Form
            setReload={setReload}
          />
        </Popup>
        <ProductList
          products={products}
          setProducts={setProducts}
          reload={reload}
          setReload={setReload}
        />
      </Layout>
    </>
  );
}
