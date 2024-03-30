import {
	PayloadAction,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import { IRole } from "../../type";
import roleService from "../../services/roleService";
import { Bounce, toast } from "react-toastify";

interface IState {
	roles: IRole[];
	isLoading: boolean;
	edittingRole: IRole | null;
}

const initialState: IState = {
	roles: [],
	edittingRole: null,
	isLoading: false,
};

export const getRoles = createAsyncThunk<IRole[]>(
	"roles/get",
	async () => {
		try {
			const data = await roleService.list().then((res) => res.data);
			return data ?? []; // Trả về một mảng rỗng nếu data là undefined
		} catch (error) {
			console.log(error);
			throw error; // Ném ra lỗi để createAsyncThunk xử lý
		}
	},
);

export const getRole = createAsyncThunk(
	"role/get",
	async (id: string) => {
		try {
			const data = await roleService.read({ id }).then((res) => {
				console.log(res.data);

				return res.data;
			});

			return data as IRole;
		} catch (error) {
			console.error(error);
		}
	},
);

export const addRole = createAsyncThunk(
	"roles/add",
	async (data: Omit<IRole, "id">) => {
		try {
			await roleService
				.create({ data })
				.then((res) => {
					toast.success(res.message, {
						position: "top-right",
						delay: 3000,
					});
				})
				.catch((err) => {
					console.log(err);

					toast.error(err.message.Name, {
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
					throw err;
				});
		} catch (error) {
			console.log(error);

			throw error;
		}
	},
);

export const updateRole = createAsyncThunk(
	"role/update",
	async ({ data, id }: { data: Omit<IRole, "id">; id: string }) => {
		try {
			await roleService
				.edit({ id, data })
				.then((res) => {
					toast.success(res.message, {
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
				})
				.catch((err) => {
					toast.error(err.response.data.message.Name, {
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
					throw err;
				});

			return {
				...data,
				id: id,
			} as IRole;
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
);

export const removeRole = createAsyncThunk(
	"role/remove",
	async ({ id }: { id: string }) => {
		await roleService
			.remove({ id })
			.then((res) => {
				toast.success(res.message, {
					position: "top-right",
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

export const roleSlice = createSlice({
	name: "role",
	initialState,
	reducers: {
		startEdittingRole: (state, action: PayloadAction<IRole>) => {
			state.isLoading = true;
			state.edittingRole = action.payload;
			state.isLoading = false;
		},
		cancelEdittingRole: (state) => {
			state.isLoading = true;
			state.edittingRole = null;
			state.isLoading = false;
		},
	},
	extraReducers: (builder) =>
		builder
			.addCase(getRoles.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getRoles.fulfilled, (state, action) => {
				state.roles = action.payload;
				state.isLoading = false;
			})
			.addCase(getRoles.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(getRole.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getRole.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(updateRole.fulfilled, (state, action) => {
				state.edittingRole = null;
				state.roles.find((c, index) => {
					if (c.id === action.payload?.id) {
						state.roles[index] = action.payload;
						return true;
					}
					return false;
				});
			})
			.addCase(addRole.fulfilled, (state) => {
				state.edittingRole = null;
				state.isLoading = false;
			}),
});

// Action creators are generated for each case reducer function

export default roleSlice.reducer;

export const { startEdittingRole, cancelEdittingRole } =
	roleSlice.actions;
