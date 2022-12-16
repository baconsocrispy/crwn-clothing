import { takeLatest, all, call, put } from 'redux-saga/effects';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action';
import { CATEGORIES_ACTION_TYPES } from './category.types';

export function* fetchCategoriesAsync() {
  try {
    // call takes 2 arguments, a callable method, and that function's
    // parameters (if any). Here yield operates like the await keyword. 
    const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
    // put() is the generator function version of dispatch()
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

// listener for the fetch categories start action. Accepts action to listen for
// and function generator to call when it hears that action
export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, 
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  // all requires everything passed to it as an array to run
  // before moving on
  yield all([call(onFetchCategories)]);
}