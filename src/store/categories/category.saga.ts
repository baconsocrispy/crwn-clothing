// in order to type Sagas, need to yarn add typed-redux-saga 
// and yarn add --dev babel-plugin-macros
import { takeLatest, all, call, put } from 'typed-redux-saga/macro'; 
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action';
import { CATEGORIES_ACTION_TYPES } from './category.types';

export function* fetchCategoriesAsync() {
  try {
    // call takes 2 arguments, a callable method, and that function's
    // parameters (if any). Here yield operates like the await keyword. 
    // yield* is the typeScript implementation from typed-redux-saga
    const categoriesArray = yield* call(getCategoriesAndDocuments);
    // put() is the generator function version of dispatch()
    yield* put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield* put(fetchCategoriesFailed(error as Error));
  }
}

// listener for the fetch categories start action. Accepts action to listen for
// and function generator to call when it hears that action
export function* onFetchCategories() {
  yield* takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, 
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  // all requires everything passed to it as an array to run
  // before moving on
  yield* all([call(onFetchCategories)]);
}