// typed-redux-saga/macro comes from the yarn add --dev bable-plugin-macros 
import { takeLatest, put, all, call } from "typed-redux-saga/macro";
import { USER_ACTION_TYPES } from "./user.types";
import { User } from "firebase/auth";

import { 
  signInSuccess, 
  signInFailed, 
  signUpSuccess, 
  signOutSuccess, 
  signOutFailed,
  EmailSignInStart,
  SignUpStart,
  SignUpSuccess,
} from "./user.action";

import { 
  getCurrentUser, 
  createUserDocumentFromAuth, 
  createAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  signOutUser,
  AdditionalInformation
} from "../../utils/firebase/firebase.utils";

export function* getSnapShotFromUserAuth(userAuth: User, addtionalDetails?: AdditionalInformation) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth, 
      userAuth, 
      addtionalDetails
    );
    
    if (userSnapshot) {
      yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signUp({ payload: { email, password, displayName }}: SignUpStart) {
  try {
    const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password);

    if (userCredential) {
      const { user } = userCredential;
      yield* put(signUpSuccess(user, { displayName }));
    }
  } catch(error) {
      put(signInFailed(error as Error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails }}: SignUpSuccess) {
  yield* call(getSnapShotFromUserAuth, user, additionalDetails);
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapShotFromUserAuth, user);
  } catch(error) {
    yield* put(signInFailed(error as Error));
  }
}

// takeLatest hands action object to the functions it calls
// so we have access to the type and payload 
// we are destructuring off an action, so we need type to be the action type (EmailSignInStart)
export function* signInWithEmail({ payload: { email, password }}: EmailSignInStart) {
  try {
    const userCredential = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );

    if (userCredential) {
      const { user } = userCredential
      yield* call(getSnapShotFromUserAuth, user);
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapShotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signOut() {
  try {
    yield* call(signOutUser);
    yield put(signOutSuccess());
  } catch(error) {
    yield put(signOutFailed(error as Error));
  }
}


// ENTRY POINT SAGAS (ACTION LISTENERS)
// listen for actions and call appropriate saga function
export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

// MASTER SAGA
// hooks into root saga
export function* userSagas() {
  yield* all([
    call(onCheckUserSession), 
    call(onGoogleSignInStart), 
    call(onEmailSignInStart), 
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}