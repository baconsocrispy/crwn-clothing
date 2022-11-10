import ProductCard from '../product-card/product-card.component';
import { CategoryLink, CategoryPreviewContainer, CategoryPreviewHeader, Preview } from './category-preview.styles';


const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <CategoryPreviewHeader>
        <CategoryLink to={ title }>{ title.toUpperCase() }</CategoryLink>
      </CategoryPreviewHeader>
      <Preview>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => 
            <ProductCard key={ product.id } product={ product } />
          )
        }
      </Preview>
    </CategoryPreviewContainer>
  );
}

export default CategoryPreview;