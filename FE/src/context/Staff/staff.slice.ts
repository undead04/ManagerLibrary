import {
	PayloadAction,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import { Bounce, toast } from "react-toastify";
import { IStaff } from "../../type";
import staffService from "../../services/staffService";

interface IState {
	staffs: IStaff[];
	isLoading: boolean;
	edittingStaff: IStaff | null;
}

const initialState: IState = {
	staffs: [],
	edittingStaff: null,
	isLoading: false,
};

export const getStaffs = createAsyncThunk<
	IStaff[],
	{ q?: string; roleId?: string }
>(
	"staffs/get",
	async ({ q, roleId }: { q?: string; roleId?: string }) => {
		try {
			const data = await staffService
				.list(q, roleId)
				.then((res) => res.data);
			return data ?? []; // Trả về một mảng rỗng nếu data là undefined
		} catch (error) {
			console.log(error);
			throw error; // Ném ra lỗi để createAsyncThunk xử lý
		}
	},
);

export const getStaff = createAsyncThunk(
	"staff/get",
	async (id: string) => {
		try {
			const data = await staffService.read({ id }).then((res) => {
				return res.data;
			});
			return data as IStaff;
		} catch (error) {
			console.error(error);
		}
	},
);

export const addStaff = createAsyncThunk(
	"staffs/add",
	async (data: Omit<IStaff, "id">) => {
		try {
			const frm = new FormData();
			frm.append("UserName", data.userName);
			frm.append("Phone", data.phone);
			frm.append("RoleId", data.roleId);
			frm.append("Email", data.email);
			if (data.password) {
				frm.append("Password", data.password);
			}

			frm.append("Address", data.address);
			frm.append("Gender", JSON.stringify(data.gender));

			if (data.avatar) {
				frm.append(
					"Avatar",
					data.avatar[data.avatar.length - 1].originFileObj,
				);
			}
			console.log(data);

			await staffService
				.create({ data: frm })
				.then(() => {
					toast.success("Create staff successfully", {
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
					throw err;
				});
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			const messages = error.message;
			for (const key in messages) {
				const value = messages[key];
				toast.error(`${key}: ${value}`, {
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
			}

			throw error;
		}
	},
);

export const updateStaff = createAsyncThunk(
	"staff/update",
	async ({ data, id }: { data: Omit<IStaff, "id">; id: string }) => {
		try {
			const frm = new FormData();
			frm.append("UserName", data.userName);
			frm.append("Phone", data.phone);
			frm.append("RoleId", data.roleId);
			frm.append("Email", data.email);
			if (data.password) {
				frm.append("Password", data.password);
			}

			frm.append("Address", data.address);
			frm.append("Gender", JSON.stringify(data.gender));

			if (data.avatar) {
				frm.append(
					"Avatar",
					data.avatar[data.avatar.length - 1].originFileObj,
				);
			}
			await staffService
				.edit({ id, data: frm })
				.then(() => {
					toast.success("Update successfully!", {
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
					throw err;
				});
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			const messages = error.message;
			for (const key in messages) {
				const value = messages[key];
				toast.error(`${key}: ${value}`, {
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
			}

			throw error;
		}
	},
);

export const removeStaff = createAsyncThunk(
	"staff/remove",
	async ({ id }: { id: string }) => {
		await staffService
			.remove({ id })
			.then((res) => {
				console.log(res);
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

export const staffSlice = createSlice({
	name: "staff",
	initialState,
	reducers: {
		startEdittingStaff: (state, action: PayloadAction<IStaff>) => {
			state.isLoading = true;
			state.edittingStaff = action.payload;
			state.isLoading = false;
		},
		cancelEdittingStaff: (state) => {
			state.isLoading = true;
			state.edittingStaff = null;
			state.isLoading = false;
		},
	},
	extraReducers: (builder) =>
		builder
			.addCase(getStaffs.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getStaffs.fulfilled, (state, action) => {
				state.staffs = action.payload;
				state.isLoading = false;
			})
			.addCase(getStaffs.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(addStaff.fulfilled, (state) => {
				state.edittingStaff = null;
				state.isLoading = false;
			}),
});

// Action creators are generated for each case reducer function

export default staffSlice.reducer;

export const { startEdittingStaff, cancelEdittingStaff } =
	staffSlice.actions;
