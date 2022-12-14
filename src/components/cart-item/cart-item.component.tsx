import { FC, memo } from 'react';
import { CartItem as TCartItem } from '../../store/cart/cart.types';
import { CartImg, CartItemContainer, ItemDetails, ItemName, ItemPrice } from './cart-item.styles';

type CartItemProps = {
  cartItem: TCartItem;
}

// wrapping the component in memo keeps it from rerendering 
// unless something has changed. 
const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
  const { name, quantity, price, imageUrl } = cartItem;
  return (
    <CartItemContainer>
      <CartImg src={ imageUrl } alt={ `${ name }` } />
      <ItemDetails>
        <ItemName>{ name }</ItemName>
        <ItemPrice>
          { quantity } x ${ price }
        </ItemPrice>
      </ItemDetails>
    </CartItemContainer>
  )
});

export default CartItem;