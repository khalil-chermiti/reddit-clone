import { all, put, call, takeLatest } from "redux-saga/effects";
import { axiosLogin } from "../../api/axios";

import { userSignInSuccess, userSignInError } from "./userSlice";

// TODO : onUserSignUp
// TODO : onUserSignOut

// sign in user
function* userSignIn({ payload }) {
  const { username, password } = payload;

  try {
    const {
      data: { jwt },
    } = yield call(axiosLogin, { username, password });
    yield put(userSignInSuccess(jwt));
  } catch (err) {
    err.response?.data
      ? yield put(userSignInError(err.response?.data))
      : yield put(userSignInError(err.message));
  }
}

// user watcher
function* onUserSignIn() {
  yield takeLatest("user/userSignIn", userSignIn);
}

// calls all user's sagas
export default function* userSagas() {
  yield all([call(onUserSignIn)]);
}
