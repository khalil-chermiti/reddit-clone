import {all , put , call , takeLatest} from 'redux-saga/effects' ;

import {userSignInSuccess , userSignInError} from './userSlice';

function* userSignIn({payload}) {
    // console.log(payload) ;
    try {
        const data = yield call(()=> fetch("https://jsonplaceholder.typicode.com/users/1/"));
        const user = yield data.json() ;
        yield put(userSignInSuccess(user));
    } catch(err) {
        yield put(userSignInError(err.message));
    }
}


// listens to user signin actions 
function* onUserSignIn() {
    yield takeLatest('user/userSignIn' , userSignIn);
};

// TODO : onUserSignUp 
// TODO : onUserSignIn 
// TODO : onUserSignOut


// calls all user's sagas 
export default function* userSagas () {
    yield all([
        call(onUserSignIn),
    ]) ;
};