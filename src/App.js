import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from "react-redux";

import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import Spinner from './components/spinner/spinner.component';
import { checkUserSession } from "./store/user/user.action";
import { GlobalStyle } from "./global.styles";

// lazy allows for route components to only load when called
// rather than get sent with the entire bundle.js
// used in conjunction with Suspense wrapper below
const Home = lazy(() => import('./routes/home/home.component'))
const Authentication = lazy(() => import('./routes/authentication/authentication.component'));

const App = () => {
  const dispatch = useDispatch() ;

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return ( 
    <Suspense fallback={ <Spinner /> }> 
      <GlobalStyle />
      <Routes>
        <Route path='/' element={ <Navigation /> }>
          <Route index element={ <Home /> } />
          <Route path='auth' element={ <Authentication /> } />
          <Route path='home' element={ <Home /> } />
          <Route path='shop/*' element={ <Shop /> } />
          <Route path='checkout' element={ <Checkout /> } />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
