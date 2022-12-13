import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import CategoriesPreview from '../../components/categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { setCategories } from '../../store/categories/category.action';

import './shop.styles';

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments('categories');
      dispatch(setCategories(categoriesArray));
    }
    getCategoriesMap();
  }, []);

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