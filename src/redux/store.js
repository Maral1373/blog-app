import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import usersSlice from "./reducers/usersSlice";
import postsSlice from "./reducers/postsSlice";

// Combine your reducers
const rootReducer = combineReducers({
	users: usersSlice, // Use .reducer to access the reducer from the slice
	posts: postsSlice,
});

// Configuration for redux-persist
const persistConfig = {
	key: "root",
	storage, // specify storage
	whitelist: ["users", "posts"], // specify which state you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
	reducer: persistedReducer,
});

// Export persistor
export const persistor = persistStore(store);
