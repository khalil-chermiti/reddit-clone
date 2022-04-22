import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import createSagaMiddleware from "@redux-saga/core";

import { rootSagas } from "./rootSagas";
import userReducer from './user/userSlice';
import postsReducer from './posts/postsSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        userReducer ,
        postsReducer ,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware, logger),
});


sagaMiddleware.run(rootSagas) ;