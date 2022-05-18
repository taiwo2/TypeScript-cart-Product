import React from 'react'
import { Wrapper } from './cartstyle'
import { cartItemType } from '../../App'
import CartItem from '../CartItem'


type Props = {
  cartItem: cartItemType[];
  addToCart: (clickedItem: cartItemType) => void;
  removeCart: (id: number) => void;
}
const Cart: React.FC<Props> = ({cartItem,addToCart,removeCart}) => {

  const calculateTotal = (items: cartItemType[]) => {
    return items.reduce((ack: number, item) => ack + item.amount * item.price,0);
  }
  return (
    <Wrapper>
      <h1>Your Cart</h1>
      {cartItem.length === 0 ? <p>No items in Cart</p> : null}
      {cartItem.map((item) => (
        <CartItem
        key={item.id} 
        item={item}
        addToCart={addToCart}
        removeCart={removeCart} />
      ))}

      <h2>Total: {calculateTotal(cartItem).toFixed(2)}</h2>
    </Wrapper>
  )
}

export default Cart;