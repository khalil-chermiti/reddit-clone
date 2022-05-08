import { createSlice} from "@reduxjs/toolkit";

// * selectors
export const selectPosts = state => state.postsReducer.posts;

const initialState = {
    posts: [],
    isFetching: true,
    error: false,
    creating: false,
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        getPosts: state => {
            state.isFetching = true;
        },
        getPostsSuccess: (state, action) => {
            state.error = false;
            state.isFetching = false;
            state.posts = action.payload;
        },
        getPostsError: (state, action) => {
            state.posts = [];
            state.isFetching = false;
            state.error = action.payload;
        },
        addPost: state=>{
            state.creating = true;
        },
        addPostSuccess: (state,action)=>{
            state.creating = false;
            state.posts.unshift(action.payload);
        },
        addPostError: (state,action)=>{
            state.creating = false;
        }
    },
});

export const { getPosts, getPostsSuccess, getPostsError ,
    addPost,addPostError,addPostSuccess
                } = postsSlice.actions;
export default postsSlice.reducer;
