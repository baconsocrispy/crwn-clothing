import { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { Footer, ProductCardButton, ProductCardContainer, ProductCardImg, ProductCardName, ProductCardPrice } from './product-card.styles';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  return (
    <ProductCardContainer>
      <ProductCardImg src={ imageUrl } alt={`${ name }`}/>
      <Footer>
        <ProductCardName>{ name }</ProductCardName>
        <ProductCardPrice>{ price }</ProductCardPrice>
      </Footer>
      <ProductCardButton 
        buttonType={ BUTTON_TYPE_CLASSES.inverted } 
        onClick={ addProductToCart }
      >
        Add to cart
      </ProductCardButton>
    </ProductCardContainer>
  )
}

export default ProductCard;