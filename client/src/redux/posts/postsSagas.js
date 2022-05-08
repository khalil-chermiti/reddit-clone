import {takeLatest , all ,  call , put } from 'redux-saga/effects' ;
import { addPostError, addPostSuccess, getPostsError , getPostsSuccess } from './postsSlice';
import axios from 'axios'

const API_URL = "http://localhost:5000/api/v1/posts" ;

function* fetchPosts () {
    try {
        const data = yield call(()=> fetch(API_URL)) ;
        const posts = yield data.json() ;
        yield put(getPostsSuccess(posts));
    } catch(err) {
        yield put(getPostsError(err.message));
    }
}


function* createPost(action){
    try {
        const {data : {post}} = yield call(axios.post , API_URL , action.payload)
        yield put(addPostSuccess(post))
        
    } catch (err) {
        yield put(addPostError(err.message))
    }
}


// watcher
function* onGetPosts () {
    yield takeLatest("posts/getPosts" , fetchPosts);
} ;

function* onAddPost(){
    yield takeLatest("posts/addPost",createPost)
}

// TODO : onUpdatePost
// TODO : onDeletePost 

export default function* postsSagas () {
    yield all([
        call(onGetPosts),
        call(onAddPost)
    ])
} 

