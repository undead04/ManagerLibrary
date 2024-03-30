import {
	PayloadAction,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import { Bounce, toast } from "react-toastify";
import IGuest from "../../type/guest.type";
import guestService from "../../services/guestService";

interface IState {
	guests: IGuest[];
	isLoading: boolean;
	edittingGuest: IGuest | null;
}

const initialState: IState = {
	guests: [],
	edittingGuest: null,
	isLoading: false,
};

export const getGuests = createAsyncThunk<IGuest[], { q?: string }>(
	"guests/get",
	async ({ q }: { q?: string }) => {
		try {
			const data = await guestService.list(q).then((res) => res.data);
			return data ?? []; // Trả về một mảng rỗng nếu data là undefined
		} catch (error) {
			console.log(error);
			throw error; // Ném ra lỗi để createAsyncThunk xử lý
		}
	},
);

export const getGuest = createAsyncThunk(
	"guest/get",
	async (id: string) => {
		try {
			const data = await guestService.read({ id }).then((res) => {
				return res.data;
			});
			return data as IGuest;
		} catch (error) {
			console.error(error);
		}
	},
);

export const addGuest = createAsyncThunk(
	"guests/add",
	async (data: Omit<IGuest, "id">) => {
		try {
			const frm = new FormData();
			frm.append("Name", data.name);
			frm.append("Phone", data.phone);

			frm.append("Address", data.address);
			frm.append("Gender", JSON.stringify(data.gender));

			if (data.avatar) {
				frm.append(
					"Avatar",
					data.avatar[data.avatar.length - 1].originFileObj,
				);
			}
			console.log(data);

			await guestService
				.create({ data: frm })
				.then(() => {
					toast.success("Create successfully", {
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

export const updateGuest = createAsyncThunk(
	"guest/update",
	async ({ data, id }: { data: Omit<IGuest, "id">; id: string }) => {
		try {
			const frm = new FormData();
			frm.append("Name", data.name);
			frm.append("Phone", data.phone);

			frm.append("Address", data.address);
			frm.append("Gender", JSON.stringify(data.gender));

			if (data.avatar) {
				frm.append(
					"Avatar",
					data.avatar[data.avatar.length - 1].originFileObj,
				);
			}
			await guestService
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

export const removeGuest = createAsyncThunk(
	"guest/remove",
	async ({ id }: { id: string }) => {
		await guestService
			.remove({ id })
			.then(() => {
				toast.success(`Remove successfully`, {
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

export const guestSlice = createSlice({
	name: "guest",
	initialState,
	reducers: {
		startEdittingGuest: (state, action: PayloadAction<IGuest>) => {
			state.isLoading = true;
			state.edittingGuest = action.payload;
			state.isLoading = false;
		},
		cancelEdittingGuest: (state) => {
			state.isLoading = true;
			state.edittingGuest = null;
			state.isLoading = false;
		},
	},
	extraReducers: (builder) =>
		builder
			.addCase(getGuests.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getGuests.fulfilled, (state, action) => {
				state.guests = action.payload;
				state.isLoading = false;
			})
			.addCase(getGuests.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(addGuest.fulfilled, (state) => {
				state.edittingGuest = null;
				state.isLoading = false;
			}),
});

// Action creators are generated for each case reducer function

export default guestSlice.reducer;

export const { startEdittingGuest, cancelEdittingGuest } =
	guestSlice.actions;
