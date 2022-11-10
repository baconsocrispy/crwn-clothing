// Fragment element wraps content in a div that doesn't show up in the DOM
import { Fragment, useContext } from 'react';

// Outlet component indicates where child route content will display
// Link component turns content into a link to the specified 'to' route
import { Outlet, Link } from 'react-router-dom';

// ReactComponent turns content like svgs into a React component
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>
          { currentUser ? (
              <NavLink as='span' onClick={ signOutUser }>
                SIGN OUT
              </NavLink>
            ) : (
              <NavLink to='/auth'>
                SIGN IN
              </NavLink>
            )
          }
          <CartIcon />
          {isCartOpen && <CartDropDown />}
        </NavLinks>
      </NavigationContainer>
      <Outlet />
     </Fragment>
  );
};

export default Navigation;