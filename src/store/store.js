import { compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";

import thunk from "redux-thunk";

import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger, thunk],
});

export const persistor = persistStore(store);
