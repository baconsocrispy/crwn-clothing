import { FC } from 'react';
import { DirectoryItemBackgroundImg, DirectoryItemBody, DirectoryItemContainer, DirectoryItemCTA, DirectoryItemTitle } from './directory-item.styles';

import { useNavigate } from 'react-router-dom';
import { Category } from '../../store/categories/category.types';

type DirectoryItemProps = {
  category: { 
    id: number, 
    imageUrl: string, 
    title: string, 
    route: string 
  }
};

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route)
  return (
    <DirectoryItemContainer onClick={ onNavigateHandler }>
      <DirectoryItemBackgroundImg imageUrl={ imageUrl } />
      <DirectoryItemBody>
        <DirectoryItemTitle>{ title }</DirectoryItemTitle>
        <DirectoryItemCTA>Shop Now</DirectoryItemCTA>
      </DirectoryItemBody>
    </DirectoryItemContainer>
  )
};

export default DirectoryItem;