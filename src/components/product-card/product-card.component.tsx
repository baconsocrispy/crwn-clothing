import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { CategoryItem } from '../../store/categories/category.types';

import { 
  Footer, ProductCardButton, ProductCardContainer, 
  ProductCardImg, ProductCardName, ProductCardPrice 
} from './product-card.styles';


type ProductCardProps = {
  product: CategoryItem;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  
  const cartItems = useSelector(selectCartItems);
  const { name, price, imageUrl } = product;
  
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

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