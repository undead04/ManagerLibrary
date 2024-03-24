import { Tuple, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { thunk } from "redux-thunk";
import categoryReducer from "./Category/category.slice";
import bookReducer from "./Book/book.slice";
import guestReducer from "./Guest/guest.slice";

export const store = configureStore({
	reducer: {
		category: categoryReducer,
		book: bookReducer,
		guest: guestReducer,
	},
	middleware: () => new Tuple(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
