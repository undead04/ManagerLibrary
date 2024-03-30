import storage from "redux-persist/lib/storage";
import { Tuple, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { thunk } from "redux-thunk";
import categoryReducer from "./Category/category.slice";
import bookReducer from "./Book/book.slice";
import guestReducer from "./Guest/guest.slice";
import persistReducer from "redux-persist/es/persistReducer";
import authReducer from "./Auth/auth.slice";
import persistStore from "redux-persist/es/persistStore";
import roleReducer from "./Role/role.slice";
import staffReducer from "./Staff/staff.slice";
import bookEntryReducer from "./BookEntry/bookEntry.slice";
import borrowBookReducer from "./BorrowBook/borrowBook.slice";

const authPersistConfig = { key: "auth", storage };

export const store = configureStore({
	reducer: {
		auth: persistReducer(authPersistConfig, authReducer),
		category: categoryReducer,
		book: bookReducer,
		guest: guestReducer,
		role: roleReducer,
		staff: staffReducer,
		bookEntry: bookEntryReducer,
		borrowBook: borrowBookReducer,
	},
	middleware: () => new Tuple(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const persistor = persistStore(store);
