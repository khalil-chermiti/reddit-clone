import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import createSagaMiddleware from "@redux-saga/core";

import { rootSagas } from "./rootSagas";
import userReducer from './user/userSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {userReducer},
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware, logger),
});


sagaMiddleware.run(rootSagas) ;