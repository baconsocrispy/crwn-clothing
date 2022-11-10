import { CartImg, CartItemContainer, ItemDetails, ItemName, ItemPrice } from './cart-item.styles.jsx';

const CartItem = ({ cartItem }) => {
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
}

export default CartItem;