import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { 
  addItemToCart, 
  removeItemFromCart, 
  clearItemFromCart 
} from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { CartItem } from '../../store/cart/cart.types';

import { 
  CheckoutImg, CheckoutImgContainer, CheckoutItemContainer, 
  CheckoutItemName, CheckoutItemPrice, CheckoutItemQuantity, 
  CheckoutQuantityArrow, CheckoutQuantityValue, CheckoutRemoveItemButton 
} from './checkout-item.styles';

type CheckoutItemProps = {
  item: CartItem;
}

const CheckoutItem: FC<CheckoutItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { name, quantity, price, imageUrl } = item;

  const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, item));
  const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, item));
  const addItemHandler = () => dispatch(addItemToCart(cartItems, item));

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