import { Button } from "@material-ui/core";
import { CartItemType } from "../App";
import React from 'react';
import { Wrapper } from "./Item.styles";


type Props = {
  item:CartItemType;
  handleAddToCart: (clickedItem:CartItemType) => void;
}

const Card:React.FC<Props> = ({item, handleAddToCart}) => (
  <React.Fragment>
    <Wrapper>
      <img src={item.image} alt={item.title}/>
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>${item.price}</h3>
      </div>
      <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
    </Wrapper>
  </React.Fragment>
)

export default Card;