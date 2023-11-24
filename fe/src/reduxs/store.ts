import {
  AnyAction,
  configureStore,
  Reducer,
  Store,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { setupListeners } from '@reduxjs/toolkit/query'

import { 
  combineReducer
 } from "./rootReducer";
import { api } from "@/services/api";

// logger,
export type RootState = ReturnType<typeof combineReducer>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === "account/logoutAction") {
    state = {} as RootState;
  }
  return combineReducer(state, action);
};


export type AppStore = Omit<Store<RootState, AnyAction>, "dispatch"> & {
  dispatch: AppThunkDispatch;
};



const store: AppStore = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([api.middleware]),
});


setupListeners(store.dispatch);

export const persistor = persistStore(store);
export default store;
