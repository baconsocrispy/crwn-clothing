// redux saga is an async side-effect handler similar to thunk
import { all, call } from 'redux-saga/effects';

import { categoriesSaga } from './categories/category.saga';
import { userSagas } from './user/user.saga';

// this is a 'generator function'. Operates similar to
// async/await in that it pauses execution when it comes to
// the 'yield' keyword. Declared by the *.
export function* rootSaga() {
  yield all([call(categoriesSaga), call(userSagas)]);
}