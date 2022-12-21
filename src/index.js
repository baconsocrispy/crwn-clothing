import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // adds routing functionality to child components
import { Provider } from 'react-redux'; // single source for state management, provides store of state for all child components
import { PersistGate } from 'redux-persist/integration/react'; // adds memoization/state persistence to all child components
import { Elements } from '@stripe/react-stripe-js'; // provides access to Stripe functionality to all child components

import App from './App';

import { store, persistor } from './store/store';
import { stripePromise } from './utils/stripe/stripe.utils';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider loading={null} store={ store }>
      <PersistGate persistor={ persistor }>
        <BrowserRouter>
          <Elements stripe={ stripePromise }>
            <App />
          </Elements>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();