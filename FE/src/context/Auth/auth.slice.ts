import {
	PayloadAction,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import userService from "../../services/userService";
import { toast } from "react-toastify";
import { IClaim } from "../../type";

interface IUser {
	email: string;
	token: string;
	claims: IClaim;
}

interface UserType {
	user: IUser | null;
	isEditing: boolean;
	isLoading: boolean;
}

const initialState: UserType = {
	user: null,
	isEditing: false,
	isLoading: false,
};

// export const getUser = createAsyncThunk<IUser>(
// 	"auth/getUser",
// 	async () => {},
// );

// Login function
export const authLogin = createAsyncThunk(
	"auth/login",
	async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => {
		try {
			const user = await userService.login(email, password);

			console.log(user);

			return {
				email,
				token: user.data.token as string,
				claims: user.data.claims,
			};
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error.message);
			throw error;
		}
	},
);

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		authLogout: (state) => {
			state.user = null;
			state.isLoading = false;
		},
	},
	extraReducers: (builder) =>
		builder
			.addCase(authLogin.fulfilled, (state, action) => {
				if (action.payload) {
					state.user = action.payload;
				}
			})
			.addCase(authLogin.rejected, (_, action) => {
				const error = {
					message: "",
				};
				switch (action.error.code) {
					case "auth/invalid-email":
						error.message = "Email không hợp lệ";
						break;
					case "auth/invalid-credential":
						error.message = "Email và mật khẩu không đúng";
						break;
					default:
						error.message = "Enexpected error";
						break;
				}
				throw error;
			}),
});

// Action creators are generated for each case reducer function
export const { setLoading, authLogout } = authSlice.actions;

export default authSlice.reducer;
