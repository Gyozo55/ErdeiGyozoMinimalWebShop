import React, { useState } from 'react';
import { InputStyles } from '../styles/InputStyles';
import { FormStyles } from '../styles/ComponentStyles';
import { HeaderStyles, FlexWrapper } from '../styles/ComponentStyles';

export default function Form({ setReload }) {
  const [state, setState] = useState({
    name: '',
    description: '',
    price: 0,
  });

  function handleChange(e) {
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


  function createNewProduct() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: state.name,
        description: state.description,
        price: state.price
      }),
    };
    if(checkFields()){
      fetch("http://localhost/ErdeiGyozoFalatozzHw/api/product/create.php", requestOptions)
      .then((response) => {if (response.status === 200){
        setState({
          name: '',
          description: '',
          price: 0,
        })
        alert('Sikeres termék létrehozás!')
        setReload(true)
      }})
  }
  }


  return (
    <>
      <HeaderStyles>
        <FlexWrapper>
          <h1>Új Termék Létrehozása</h1>
        </FlexWrapper>
      </HeaderStyles>
      <FormStyles>
        <InputStyles
          name='name'
          type='text'
          placeholder='name'
          value={state.name}
          onChange={handleChange}
          />
        <InputStyles
          name='description'
          type='text'
          placeholder='description'
          value={state.description}
          onChange={handleChange}
          />
        <InputStyles
          name='price'
          type='currency'
          placeholder='price'
          value={state.price}
          onChange={handleChange}
          />
        <InputStyles type='submit' value='Mentés' onClick={() => createNewProduct()}/>
      </FormStyles>
  </>
  );
}
