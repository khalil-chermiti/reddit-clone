import { createSlice} from "@reduxjs/toolkit";
// * selectors
export const selectPosts = state => state.postsReducer.posts;
export const selectShowAlert = state => state.postsReducer.showAlert;
export const selectError = state => state.postsReducer.error;

export const hasVoted = state => {
    //
}

const initialState = {
    posts: [],
    isFetching: true,
    error: '',
    creating: false,
    showAlert:false,
    voter:'', 
};

/*

*/

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        getPosts: state => {
            state.isFetching = true;
        },
        getPostsSuccess: (state, action) => {
            state.error = '';
            state.isFetching = false;
            state.posts = action.payload;
        },
        getPostsError: (state, action) => {
            state.posts = [];
            state.isFetching = false;
            state.error = action.payload;
        },
        displayAlert:(state,action)=>{
            state.showAlert = true;
            
        } ,
        removeAlert:(state,action)=>{
            state.showAlert = false;
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
        },
        upvote:(state,action)=>{
            state.voter = action.payload;
        },
        upvoteSuccess:(state,action)=>{
            const id = action.payload;
            //console.log(action.payload);
            const postIndex = state.posts.findIndex((post)=>post._id===id);
            console.log(id,postIndex)
            state.posts[postIndex].upvotes +=1;
        } ,
        upvoteError:(state , action) => {},
        downvote:(state,action)=>{
            state.voter = action.payload;
        },
        downvoteSuccess:(state,action)=>{
            const id = action.payload;
            const postIndex = state.posts.findIndex((post)=>post._id===id);
            console.log(id,postIndex)
            state.posts[postIndex].downvotes +=1;
        } ,
        downvoteError:(state,action)=>{}

        
    },
});

export const { getPosts, getPostsSuccess, getPostsError ,
    addPost,addPostError,addPostSuccess,removeAlert,
    displayAlert , upvote,upvoteSuccess,upvoteError,
    downvote,downvoteSuccess,downvoteError
                } = postsSlice.actions;
export default postsSlice.reducer;
