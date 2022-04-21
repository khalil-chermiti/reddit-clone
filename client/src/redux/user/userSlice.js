import {createSlice } from '@reduxjs/toolkit' ;

// * selectors 
export const selectCurrentUser = (state) => state.userReducer.user ;

const initialState  = {
    user : null ,
    error : null ,
    isFetching : false ,
} ;

const userSlice = createSlice({
    name : 'user' ,
    initialState ,
    reducers :{
        userSignIn : (state , action) => {
            state.isFetching = true ;
        } ,
        userSignInSuccess : (state , action) => {
            state.user = action.payload ;
            state.error = false ;
            state.isFetching = false ;
        } ,
        userSignInError : (state , action) => {
            state.error = action.payload ;
            state.isFetching = false ; 
        } , 
    },
}) ;

export const {userSignInError , userSignInSuccess , userSignIn} = userSlice.actions ;
export default userSlice.reducer ;