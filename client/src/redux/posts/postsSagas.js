import {takeLatest , all ,  call , put } from 'redux-saga/effects' ;
import { getPostsError , getPostsSuccess } from './postsSlice';

const API_URL = "http://localhost:5000/api/v1/posts" ;

function* fetchPosts () {
    try {
        const data = yield call(()=> fetch(API_URL)) ;
        const posts = yield data.json() ;
        console.log(posts) ;
        yield put(getPostsSuccess(posts));
    } catch(err) {
        yield put(getPostsError(err.message));
    }
}

// watcher
function* onGetPosts () {
    yield takeLatest("posts/getPosts" , fetchPosts);
} ;

// TODO : onUpdatePost
// TODO : onDeletePost 

export default function* postsSagas () {
    yield all([
        call(onGetPosts),
    ])
} 