import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../../components/categories-preview/categories-preview.component';
import Category from '../category/category.component';

import './shop.styles';

const Shop = () => {
  return (
    <Routes>
      <Route index element={ <CategoriesPreview /> } />
      {/* the : indicates a wildcard so whatever comes after /shop will be a
          dynamic parameter i.e. 'hats', 'jackets', etc. */}
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;