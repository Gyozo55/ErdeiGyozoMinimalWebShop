import React from 'react'
import { Popup } from "../styles/ComponentStyles";

function Popup(props) {
  return (props.trigger) ? (
    <div className='popup'>
        <div className='poper-inner'>
            <DeleteButton background-color="red" onClick={() => deleteProduct(product.id)}>
              <FiXOctagon/>
            </DeleteButton>
        </div>
    </div>
  ) : ""
}

export default Popup
