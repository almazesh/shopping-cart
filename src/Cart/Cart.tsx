import { CartItemType } from "../App"
import React  from 'react';
import { Wrapper } from './Cart.styles';
import { CartItem } from './CartItem';


type Props = {
  cartItems:CartItemType[];
  addToCart: (clickedItem:CartItemType) => void; 
  removeFromCart: (id:number ) => void;
}


export const Cart:React.FC<Props> = ({cartItems, addToCart, removeFromCart}) => {
  return(
    <Wrapper >
        <h2>Sopping Cart</h2>
        {cartItems.length === 0 ? <p>No items in cart</p> : null}
        {cartItems.map(item => (
          <CartItem 
            key={item.id}
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
    </Wrapper>
  )
}