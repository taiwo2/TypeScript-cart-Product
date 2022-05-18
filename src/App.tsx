import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { LinearProgress } from '@material-ui/core';
import { AddShoppingCart, PersonalVideo } from '@material-ui/icons';
import { Drawer } from '@material-ui/core';
import { Badge } from '@material-ui/core';
import {Wrapper,StyleButton} from './AppStyles';
import { useQuery } from 'react-query';
import Item from './component/Item';
import Cart from './component/Cart';


export type cartItemType = {
  id: number,
  description: string,
  price: number,
  category: string,
  amount: number,
  image: string,
  title: string
}
const getProducts = async (): Promise<cartItemType[]> => {
  return await (await fetch('https://fakestoreapi.com/products')).json();
}
function App() {
  const [open,setOpen] = useState(false);
  const [cartItem,setCartItem] = useState([] as cartItemType[]);

  const handleAddToCart = (clickedItem: cartItemType) => {
    setCartItem((prev) => {
        // if exist
        const isExist = prev.find(fm => fm.id === clickedItem.id);
      if (isExist) {
        return prev.map(f => (
          f.id === clickedItem.id ?
            {...f, amount: f.amount + 1} : f
        ));
      }
      return [...prev,{...clickedItem,  amount: 1}]
    })
    
  }
  const getTotalItems = (item: cartItemType[]) => {
    return item.reduce((ack: number, item) => ack + item.amount,0)
  };
  const handleRemoveCart = (id: number) => {
    setCartItem(prev =>
      prev.reduce((ack,item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, {...item,amount: item.amount -1}]
        }else {
          return [...ack,item]
        }
      },[] as cartItemType[])
    );

  }
  const {data,isLoading,error} = useQuery<cartItemType[]>('products',getProducts);
  console.log(data)
  if (isLoading) return  <LinearProgress />
  if (error) return <div>somethimg wrong</div>
  return (
    <Wrapper>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)} >
          <Cart cartItem={cartItem} addToCart={handleAddToCart} removeCart={handleRemoveCart} />
      </Drawer>
      <StyleButton onClick={() => setOpen(true)}> 
        <Badge badgeContent={getTotalItems(cartItem)} color='error'> 
          <AddShoppingCart />
        </Badge>
      </StyleButton>
     <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} sm={4} xs={12}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
     </Grid>
    </Wrapper>
  );
}

export default App;
