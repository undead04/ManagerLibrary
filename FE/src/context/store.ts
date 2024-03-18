import { Tuple, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { thunk } from "redux-thunk";
import categoryReducer from "./Category/category.slice";

export const store = configureStore({
	reducer: {
		category: categoryReducer,
	},
	middleware: () => new Tuple(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
