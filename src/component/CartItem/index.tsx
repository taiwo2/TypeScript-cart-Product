import React from 'react'
import { Wrapper } from './cartItemStyle'
import { cartItemType } from '../../App'
import Item from '../Item';
import { Button } from '@material-ui/core';

type Props ={
  item: cartItemType;
  addToCart: (clickedItem: cartItemType) => void;
  removeCart: (id: number) => void;
}
const CartItem: React.FC<Props> = ({item,addToCart,removeCart}) => {
  return (
    <Wrapper>
      <div>
      <h3>{item.title}</h3>
      <div className='information'>
        <p>Price: ${item.price}</p>
        <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
      </div>
      <div className='buttons'>
        <Button
          size='small'
          disableElevation
          variant='contained'
          onClick={() => removeCart(item.id)}
        >
          -
        </Button>
        <p>{item.amount}</p>
        <Button
          size='small'
          disableElevation
          variant='contained'
          onClick={() => addToCart(item)}
        >
          +
        </Button>
      </div>
      </div>
      <img src={item.image} alt={item.title} />
    </Wrapper>
  
  )
}

export default CartItem
