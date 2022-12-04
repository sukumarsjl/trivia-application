import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer from "./app-reducer";

const reducer = combineReducers({
  trivia: appReducer.reducer,
});

const Store = configureStore({
  reducer,
});

export default Store;
