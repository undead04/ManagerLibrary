import { IClaim } from "../type";
import api from "./api";
import ResponseWrapper from "./ResponseWrapper";

export type OrderInfo = {
	id: number;
	total: number;
	userId: number;
	created_at: Date;
	updated_at: Date;
};

export type OrderDetailInfo = {
	id: number;
	name_Game: string;
};

export type accountInfo<T> = {
	title: string;
	subtitle: string;
	orders: Array<T>;
	ordersDetail: Array<Array<{ id: number; name_Game: string }>>;
};

const login = (email: string, password: string) => {
	const data = { email, password };
	return api
		.post<ResponseWrapper<{ token: string; claims: IClaim }>>(
			api.url.login,
			data,
		)
		.then((res) => res.data)
		.catch((err) => {
			console.log(err);
			throw err.response.data as ResponseWrapper<string>;
		});
};

const userService = {
	login,
};

export default userService;
