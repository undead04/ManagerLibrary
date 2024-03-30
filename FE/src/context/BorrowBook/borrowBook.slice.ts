import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	IBorrowBookDetails,
	IBorrowBookEntity,
	IBorrowBookExport,
	IBorrowBookPost,
} from "../../type";
import { Bounce, toast } from "react-toastify";
import borrowBookService from "../../services/borrowBookService";

interface IState {
	borrowBooks: IBorrowBookEntity[];
	unpaidBooks: IBorrowBookEntity[];
	isLoading: boolean;
}

const initialState: IState = {
	borrowBooks: [],
	unpaidBooks: [],

	isLoading: false,
};

export const getBorrowBooks = createAsyncThunk(
	"borrowBooks/get",
	async ({
		ballotType,
		staffId,
		memberId,
	}: {
		ballotType?: "X" | "N";
		staffId?: string;
		memberId?: string;
	}) => {
		try {
			const data =
				(await borrowBookService
					.list(ballotType, staffId, memberId)
					.then((res) => res.data as IBorrowBookEntity[])) ?? [];
			return data;
		} catch (error) {
			console.log(error);
			return error; // Trả về lỗi
		}
	},
);

export const getUnpaidBooks = createAsyncThunk(
	"unpaidBooks/get",
	async ({
		search,
		bookId,
	}: {
		search?: string;
		bookId?: string;
	}) => {
		try {
			const data =
				(await borrowBookService
					.unpaidList({ search, bookId })
					.then((res) => res.data as IBorrowBookEntity[])) ?? [];
			return data;
		} catch (error) {
			console.log(error);
			return error; // Trả về lỗi
		}
	},
);

export const getBorrowBook = createAsyncThunk(
	"borrowBook/get",
	async (id: string) => {
		try {
			const data = borrowBookService.read({ id }).then((res) => {
				return res.data as IBorrowBookDetails[];
			});

			return data;
		} catch (error) {
			console.error(error);
		}
	},
);

export const addBorrowBooks = createAsyncThunk(
	"borrowBooks/add",
	async (data: IBorrowBookPost) => {
		try {
			await borrowBookService
				.create({ data })
				.then((res) => {
					toast.success(res.message, {
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
					toast.error(err.message.Name, {
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
					throw err;
				});
		} catch (error) {
			console.log(error);

			throw error;
		}
	},
);

export const returnBooks = createAsyncThunk(
	"borrowBooks/return",
	async (data: IBorrowBookExport) => {
		try {
			await borrowBookService
				.returnBooks({ data })
				.then((res) => {
					toast.success(res.message, {
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
					toast.error(err.message.Name, {
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
					throw err;
				});
		} catch (error) {
			console.log(error);

			throw error;
		}
	},
);

export const borrowBookSlice = createSlice({
	name: "bookEntry",
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(getBorrowBooks.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getBorrowBooks.fulfilled, (state, action) => {
				state.borrowBooks = action.payload as IBorrowBookEntity[];
				state.isLoading = false;
			})
			.addCase(getBorrowBook.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getBorrowBook.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(getUnpaidBooks.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUnpaidBooks.fulfilled, (state, action) => {
				state.unpaidBooks = action.payload as IBorrowBookEntity[];
				state.isLoading = false;
			})
			.addCase(getBorrowBooks.rejected, (state) => {
				state.isLoading = false;
			})

			.addCase(addBorrowBooks.fulfilled, (state) => {
				state.isLoading = false;
			}),
});

// Action creators are generated for each case reducer function

export default borrowBookSlice.reducer;
