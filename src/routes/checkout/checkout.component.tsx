import { useSelector } from 'react-redux';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import PaymentForm  from '../../components/payment-form/payment-form.component';

import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';

import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles';


const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>Product</HeaderBlock>
        <HeaderBlock>Description</HeaderBlock>
        <HeaderBlock>Quantity</HeaderBlock>
        <HeaderBlock>Price</HeaderBlock>
        <HeaderBlock>Remove</HeaderBlock>
      </CheckoutHeader>
      { cartItems.map((item) => (
        <CheckoutItem key={ item.id } item={ item } />
      ))};
      <Total>${ cartTotal }</Total>
      <PaymentForm />
    </CheckoutContainer>
  )
}

export default Checkout;