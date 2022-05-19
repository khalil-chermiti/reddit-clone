import {takeLatest , all ,  call , put } from 'redux-saga/effects' ;
import { addPostError, addPostSuccess, displayAlert,
     getPostsError , getPostsSuccess, removeAlert,
     upvoteError , upvoteSuccess,downvoteError,downvoteSuccess } from './postsSlice';
import axios from 'axios'

const API_URL = "http://localhost:5000/api/v1/posts" ;
const delay = time => new Promise(resolve => setTimeout(resolve, time));



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
        console.log(action.payload)
        yield put(addPostSuccess(post))
        yield put(displayAlert())
        yield call(delay,2000);
        yield put(removeAlert())
        
    } catch (err) {
        yield put(addPostError(err.message))
        yield put(displayAlert())
        yield call(delay,2000);
        yield put(removeAlert())
    }
}

function* runUpvote(action) {
    const {id} = action.payload ;

    try {
        const {data : {hasVoted}} = yield call(axios.patch , `${API_URL}/${id}` , action.payload ) ;
        console.log(hasVoted);
        if (hasVoted) yield put(upvoteError());
        else yield put(upvoteSuccess(id));

    } catch (error) {
        yield put(upvoteError());
    }
}

function* runDownvote(action) {
    const {id} = action.payload ;

    try {
        const {data : {hasVoted}} = yield call(axios.patch , `${API_URL}/${id}` , action.payload ) ;
        console.log(hasVoted);
        if (hasVoted) yield put(downvoteError());
        else yield put(downvoteSuccess(id));

    } catch (error) {
        yield put(downvoteError());
    }
}


// watcher
function* onGetPosts () {
    yield takeLatest("posts/getPosts" , fetchPosts);
} ;

function* onAddPost(){
    yield takeLatest("posts/addPost",createPost)
}

function* onUpvote() {
    yield takeLatest("posts/upvote", runUpvote)
}

function* onDownvote() {
    yield takeLatest("posts/downvote", runDownvote)
}

// TODO : onUpdatePost
// TODO : onDeletePost 

export default function* postsSagas () {
    yield all([
        call(onGetPosts),
        call(onAddPost),
        call(onUpvote),
        call(onDownvote)
    ])
} 



