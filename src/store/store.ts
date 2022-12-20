import { compose, createStore, applyMiddleware, Middleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';
import storage from 'redux-persist/lib/storage';
// import thunk from 'redux-thunk';
import createSagaMiddleware from '@redux-saga/core';

export type RootState = ReturnType<typeof rootReducer>

// type declaration for Chrome Redux dev tools
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// redux-persist configuration
// white/blacklist reducers whose session state
// you wish to persist/memoize in browser cache
type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  blacklist: [],
  whitelist: ['cart']
};

// redux-saga is an async side-effect library similar to Thunk
// add it to the middleWares array below
const sagaMiddleware = createSagaMiddleware();

// the persisted reducer takes the place of the root reducer when creating the store
// pass the config and rootReducer to persistReducer to create
const persistedReducer = persistReducer(persistConfig, rootReducer);

// use environment variable to determine whether middlewares are passed into production or not
const middleWares = [
  process.env.NODE_ENV !== 'production' && logger, 
  sagaMiddleware
].filter((middleware): middleware is Middleware => Boolean(middleware)); 


// adding environment variable and devtools extension callback allows for
// use of redux devtools extension in Chrome browser
const composeEnhancer = 
  (process.env.NODE_ENV !== 'production' && 
    window && 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
  compose;

// call applyMiddleware function inside composeEnhancer to apply above 
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// primary store creation function. Middlewares must be 3rd argument
// configureStore is preferred over createStore.
export const store = createStore(persistedReducer, undefined, composedEnhancers);

// need to tell sagaMiddleware to run and pass in the root Saga
// after initializing the store
sagaMiddleware.run(rootSaga);

// the persistor argument is given to the PersistGate wrapper in index.js
export const persistor = persistStore(store);