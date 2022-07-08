import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Layout from './components/Layout';

export default function App() {
  const [products, setProducts] = useState([]);
  const [url, setUrl] = useState([`http://localhost/ErdeiGyozoFalatozzHw/api/product/read_all.php`]);

  return (
    <>
      <Layout>
        <ProductList
          products={products}
          setProducts={setProducts}
          url={url}
          setUrl={setUrl}
        />
      </Layout>
    </>
  );
}
