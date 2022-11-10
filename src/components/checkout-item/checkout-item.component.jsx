import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { CheckoutImg, CheckoutImgContainer, CheckoutItemContainer, CheckoutItemName, CheckoutItemPrice, CheckoutItemQuantity, CheckoutQuantityArrow, CheckoutQuantityValue, CheckoutRemoveItemButton } from './checkout-item.styles';

const CheckoutItem = ({ item }) => {
  const { name, quantity, price, imageUrl } = item;
  const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);

  const clearItemHandler = () => clearItemFromCart(item);
  const removeItemHandler = () => removeItemFromCart(item);
  const addItemHandler = () => addItemToCart(item);

  return (
    <CheckoutItemContainer>
      <CheckoutImgContainer>
        <CheckoutImg src={ imageUrl } alt={ `${ name }`} /> 
      </CheckoutImgContainer>
      <CheckoutItemName>{ name }</CheckoutItemName>
      <CheckoutItemQuantity>
        <CheckoutQuantityArrow onClick={ removeItemHandler }>
          ❮
        </CheckoutQuantityArrow>
        <CheckoutQuantityValue>{ quantity }</CheckoutQuantityValue>
        <CheckoutQuantityArrow onClick={ addItemHandler }>
          ❯
        </CheckoutQuantityArrow>
      </CheckoutItemQuantity>
      <CheckoutItemPrice>{ price }</CheckoutItemPrice>
      <CheckoutRemoveItemButton onClick={ clearItemHandler }>
        &#10005;
      </CheckoutRemoveItemButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem;