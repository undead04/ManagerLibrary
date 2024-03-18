import api from "./api";
import ResponseWrapper from "./ResponseWrapper";

export type LoginInfo = {
	id: number;
	name: string;
	email: string;
	password: string;
	accessToken: string;
};

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
		.post<ResponseWrapper<LoginInfo>>(api.url.login, data)
		.then((res) => res.data);
};

const register = (name: string, email: string, password: string) => {
	const data = { name, email, password };
	return api
		.post<ResponseWrapper<LoginInfo>>(api.url.register, data)
		.then((res) => res.data);
};

const order = (userId: number) => {
	const data = { userId };
	return api
		.post<ResponseWrapper<accountInfo<OrderInfo>>>(
			`${api.url.cart}/myAccount`,
			data,
		)
		.then((res) => res.data);
};
const userService = {
	login,
	register,
	order,
};

export default userService;
