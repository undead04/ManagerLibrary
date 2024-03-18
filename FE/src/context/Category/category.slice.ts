import {
	PayloadAction,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import { ICategory } from "../../type";
import categoryService from "../../services/categoryService";

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

export const getCategorys = createAsyncThunk<ICategory[]>(
	"categorys/get",
	async () => {
		try {
			const data = await categoryService
				.list()
				.then((res) => res.data);
			return data ?? []; // Trả về một mảng rỗng nếu data là undefined
		} catch (error) {
			console.log(error);
			throw error; // Ném ra lỗi để createAsyncThunk xử lý
		}
	},
);

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
			categoryService.create({ data });
			return data;
		} catch (error) {
			console.log(error);
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
			categoryService.edit({ id, data });
			return {
				...data,
				categoryId: id,
			} as ICategory;
		} catch (error) {
			console.log(error);
		}
	},
);

export const removeCategory = createAsyncThunk(
	"category/remove",
	async ({ id }: { id: string }) => {
		try {
			categoryService.remove({ id });
			return id;
		} catch (error) {
			console.log(error);
		}
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
			})
			.addCase(removeCategory.fulfilled, (state, action) => {
				if (action.payload) {
					const filterData = state.categorys.filter(
						(c) => c.categoryId !== action.payload,
					);
					state.categorys = filterData;
				}
			}),
});

// Action creators are generated for each case reducer function

export default categorySlice.reducer;

export const { startEdittingCategory, cancelEdittingCategory } =
	categorySlice.actions;
