import {
	PayloadAction,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import { ICategory } from "../../type";
import categoryService from "../../services/categoryService";
import { Bounce, toast } from "react-toastify";

interface IState {
	categorys: ICategory[];
	isLoading: boolean;
	edittingCategory: ICategory | null;
}

const initialState: IState = {
	categorys: [],
	edittingCategory: null,
	isLoading: false,
};

export const getCategorys = createAsyncThunk<
	ICategory[],
	{ q?: string }
>("categorys/get", async ({ q }: { q?: string }) => {
	try {
		const data = await categoryService
			.list(q)
			.then((res) => res.data);
		return data ?? []; // Trả về một mảng rỗng nếu data là undefined
	} catch (error) {
		console.log(error);
		throw error; // Ném ra lỗi để createAsyncThunk xử lý
	}
});

export const getCategory = createAsyncThunk(
	"category/get",
	async (id: string) => {
		try {
			categoryService.read({ id }).then((res) => {
				return res.data;
			});
		} catch (error) {
			console.error(error);
		}
	},
);

export const addCategory = createAsyncThunk(
	"categorys/add",
	async (data: Omit<ICategory, "categoryId">) => {
		try {
			await categoryService.create({ data }).catch((err) => {
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

export const updateCategory = createAsyncThunk(
	"category/update",
	async ({
		data,
		id,
	}: {
		data: Omit<ICategory, "categoryId">;
		id: string;
	}) => {
		try {
			await categoryService.edit({ id, data }).catch((err) => {
				toast.error(err.response.data.message.Name, {
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

			return {
				...data,
				categoryId: id,
			} as ICategory;
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
);

export const removeCategory = createAsyncThunk(
	"category/remove",
	async ({ id }: { id: string }) => {
		await categoryService
			.remove({ id })
			.then(() => {
				toast.success(`Delete successfully`, {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
					transition: Bounce,
				});
				return id;
			})
			.catch((err) => {
				toast.error(`${err.message}`, {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
					transition: Bounce,
				});
			});
	},
);

export const categorySlice = createSlice({
	name: "category",
	initialState,
	reducers: {
		startEdittingCategory: (
			state,
			action: PayloadAction<ICategory>,
		) => {
			state.isLoading = true;
			state.edittingCategory = action.payload;
			state.isLoading = false;
		},
		cancelEdittingCategory: (state) => {
			state.isLoading = true;
			state.edittingCategory = null;
			state.isLoading = false;
		},
	},
	extraReducers: (builder) =>
		builder
			.addCase(getCategorys.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCategorys.fulfilled, (state, action) => {
				state.categorys = action.payload;
				state.isLoading = false;
			})
			.addCase(getCategorys.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(updateCategory.fulfilled, (state, action) => {
				state.edittingCategory = null;
				state.categorys.find((c, index) => {
					if (c.categoryId === action.payload?.categoryId) {
						state.categorys[index] = action.payload;
						return true;
					}
					return false;
				});
			})
			.addCase(addCategory.fulfilled, (state) => {
				state.edittingCategory = null;
				state.isLoading = false;
			}),
});

// Action creators are generated for each case reducer function

export default categorySlice.reducer;

export const { startEdittingCategory, cancelEdittingCategory } =
	categorySlice.actions;
