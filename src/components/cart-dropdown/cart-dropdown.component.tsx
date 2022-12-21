import { useCallback, useMemo } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../button/button.component';

import { selectCartItems } from '../../store/cart/cart.selector';
import CartItem from '../cart-item/cart-item.component';
import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';

const CartDropDown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  // use callback is a potentially unnecessary optimization
  // it takes 2 parameters, a callback to memoize, and an array of
  // dependencies that tell it when to re-memoize the callback
  const goToCheckoutHandler = useCallback(() => {
    navigate('/checkout');
  }, []);

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={ goToCheckoutHandler }>
        Go To Checkout
      </Button>
    </CartDropdownContainer>
  )
}

export default CartDropDown;