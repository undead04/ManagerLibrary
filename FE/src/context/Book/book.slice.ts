import {
	PayloadAction,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import { Bounce, toast } from "react-toastify";
import { IBook, IBookPost } from "../../type/book.type";
import bookService from "../../services/bookService";

interface IState {
	books: IBookPost[];
	booksDetail: IBook[];
	isLoading: boolean;
	edittingBook: IBookPost | IBook | null;
}

const initialState: IState = {
	books: [],
	booksDetail: [],
	edittingBook: null,
	isLoading: false,
};

export const getBooks = createAsyncThunk<
	IBook[],
	{ q?: string; categoryId?: string }
>(
	"books/get",
	async ({ q, categoryId }: { q?: string; categoryId?: string }) => {
		try {
			const data = await bookService
				.list(q, categoryId)
				.then((res) => res.data);
			return data ?? []; // Trả về một mảng rỗng nếu data là undefined
		} catch (error) {
			console.log(error);
			throw error; // Ném ra lỗi để createAsyncThunk xử lý
		}
	},
);

export const getBook = createAsyncThunk(
	"book/get",
	async (id: string) => {
		try {
			const data = await bookService.read({ id }).then((res) => {
				return res.data;
			});
			return data;
		} catch (error) {
			console.error(error);
		}
	},
);

export const addBook = createAsyncThunk(
	"books/add",
	async (data: Omit<IBookPost, "id">) => {
		try {
			const frm = new FormData();
			frm.append("Title", data.title);
			frm.append("ISBN", data.isbn);
			frm.append("Author", data.author);
			frm.append("CategoryId", data.categoryId);
			frm.append("Price", data.price.toString());
			frm.append("Title", data.title);
			if (data.image) {
				frm.append(
					"Image",
					data.image[data.image.length - 1].originFileObj,
				);
			}
			frm.append("Title", data.title);
			frm.append("PublishedYear", data.publishedYear);
			await bookService
				.create({ data: frm })
				.then(() => {
					toast.success("Add books successfully", {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
						transition: Bounce,
					});
				})
				.catch((err) => {
					throw err;
				});
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			const messages = error.message;
			for (const key in messages) {
				const value = messages[key];
				toast.error(`${key}: ${value}`, {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
					transition: Bounce,
				});
			}

			throw error;
		}
	},
);

export const updateBook = createAsyncThunk(
	"book/update",
	async ({
		data,
		id,
	}: {
		data: Omit<IBookPost, "id">;
		id: string;
	}) => {
		try {
			const frm = new FormData();
			frm.append("Title", data.title);
			frm.append("ISBN", data.isbn);
			frm.append("Author", data.author);
			frm.append("CategoryId", data.categoryId);
			frm.append("Price", data.price.toString());
			frm.append("Title", data.title);
			if (data.image) {
				frm.append(
					"Image",
					data.image[data.image.length - 1].originFileObj,
				);
			}
			frm.append("Title", data.title);
			frm.append("PublishedYear", data.publishedYear);
			await bookService
				.edit({ id, data: frm })
				.then(() => {
					toast.success("Update successfully!", {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
						transition: Bounce,
					});
				})
				.catch((err) => {
					throw err;
				});
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			const messages = error.message;
			for (const key in messages) {
				const value = messages[key];
				toast.error(`${key}: ${value}`, {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
					transition: Bounce,
				});
			}

			throw error;
		}
	},
);

export const removeBook = createAsyncThunk(
	"book/remove",
	async ({ id }: { id: string }) => {
		try {
			bookService.remove({ id }).then((res) => {
				console.log(res);
			});
			return id;
		} catch (error) {
			console.log(error);
		}
	},
);

export const bookSlice = createSlice({
	name: "book",
	initialState,
	reducers: {
		startEdittingBook: (state, action: PayloadAction<IBook>) => {
			state.isLoading = true;
			state.edittingBook = action.payload;
			state.isLoading = false;
		},
		cancelEdittingBook: (state) => {
			state.isLoading = true;
			state.edittingBook = null;
			state.isLoading = false;
		},
	},
	extraReducers: (builder) =>
		builder
			.addCase(getBooks.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getBooks.fulfilled, (state, action) => {
				state.booksDetail = action.payload;
				state.isLoading = false;
			})
			.addCase(getBooks.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(addBook.fulfilled, (state) => {
				state.edittingBook = null;
				state.isLoading = false;
			})

			.addCase(removeBook.fulfilled, (state, action) => {
				if (action.payload) {
					console.log(action.payload);

					const filterData = state.books.filter(
						(c) => c.id !== action.payload,
					);
					state.books = filterData;
				}
			}),
});

// Action creators are generated for each case reducer function

export default bookSlice.reducer;

export const { startEdittingBook, cancelEdittingBook } =
	bookSlice.actions;
