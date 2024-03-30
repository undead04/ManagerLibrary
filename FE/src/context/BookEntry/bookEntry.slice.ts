import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IBookEntryEntity, IBookEntryPost } from "../../type";
import { Bounce, toast } from "react-toastify";
import bookEntryService from "../../services/bookEntryService";

interface IState {
	bookEntries: IBookEntryEntity[];
	isLoading: boolean;
}

const initialState: IState = {
	bookEntries: [],
	isLoading: false,
};

export const getBookEntries = createAsyncThunk<
	IBookEntryEntity[],
	{ staffId?: string }
>("bookEntries/get", async ({ staffId }: { staffId?: string }) => {
	try {
		const data = await bookEntryService
			.list(staffId)
			.then((res) => res.data);
		return data ?? []; // Trả về một mảng rỗng nếu data là undefined
	} catch (error) {
		console.log(error);
		throw error; // Ném ra lỗi để createAsyncThunk xử lý
	}
});

export const getBookEntry = createAsyncThunk(
	"bookEntry/get",
	async (id: string) => {
		try {
			bookEntryService.read({ id }).then((res) => {
				return res.data;
			});
		} catch (error) {
			console.error(error);
		}
	},
);

export const addBookEntry = createAsyncThunk(
	"bookEntries/add",
	async (data: Omit<IBookEntryPost, "id">) => {
		try {
			await bookEntryService
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

export const bookEntrySlice = createSlice({
	name: "bookEntry",
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(getBookEntries.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getBookEntries.fulfilled, (state, action) => {
				state.bookEntries = action.payload;
				state.isLoading = false;
			})
			.addCase(getBookEntries.rejected, (state) => {
				state.isLoading = false;
			})

			.addCase(addBookEntry.fulfilled, (state) => {
				state.isLoading = false;
			}),
});

// Action creators are generated for each case reducer function

export default bookEntrySlice.reducer;
