import React, { useState } from 'react';
import { useQuery } from 'react-query';
import LinearProgress from '@material-ui/core/LinearProgress'
import { StyledButton, Wrapper } from './App.styles';
import { Badge, Drawer, Grid } from '@material-ui/core';
import Card from './item/Item';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import { Cart } from './Cart/Cart';
export type CartItemType = {
  id:number;
  category:string;
  description:string;
  image:string;
  price:number;
  title:string;
  amount:number
}

const getBase = async (): Promise<CartItemType[]> => 
  await (await fetch('https://fakestoreapi.com/products')).json();


function App() {
  const [cartOpen , setCartOpen] = useState(false)
  const [cartItem , setCartItem] = useState([] as CartItemType[])
  const {data , isLoading , error} = useQuery<CartItemType[]>(
    'products',
    getBase
  )
  console.log(data)

  const getTotalItems = (items:CartItemType[]) => 
    items.reduce((ack: number , item) => ack + item.amount, 0)

  const handleAddToCart = (clickedItem:CartItemType) => {
    setCartItem(prev => {

      const isItemInCart = prev.find(item => item.id === clickedItem.id)

      if(isItemInCart){
        return prev.map(item => (
          item.id === clickedItem.id 
          ? {...item , amount:item.amount + 1}
          : item
        ))
      }

      return [...prev, {...clickedItem, amount: 1}]
    })
  }

  const handleRemoveFromCart = (id:number) => {
    setCartItem(prev => (
      prev.reduce((ack , item) => {
        if(item.id === id){
          if(item.amount === 1) return ack;
          return [...ack,{...item , amount: item.amount - 1}]
        }else {
          return [...ack, item]
        }
      }, [] as CartItemType[])
    ))
  }

  if(isLoading) return <LinearProgress />
  if(error) return <div>Something went wrong!</div>

  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItem} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}/>
      </Drawer> 
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItem)} color='error'>
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={2}>
        {data?.map(item => (  
          <Grid item key={item.id} xs={12} sm={3}>
            <Card item={item} handleAddToCart={handleAddToCart}/>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
