import { ICategory } from "../type";
import ResponseWrapper from "./ResponseWrapper";
import api from "./api";

const list = (q?: string) => {
	if (q) {
		return api
			.get<ResponseWrapper<ICategory[]>>(
				`${api.url.category}?search=${q}`,
			)
			.then((res) => res.data);
	} else {
		return api
			.get<ResponseWrapper<ICategory[]>>(api.url.category)
			.then((res) => res.data);
	}
};

const create = ({
	data,
}: {
	data: Omit<ICategory, "categoryId">;
}) => {
	return api
		.post<ResponseWrapper<null>>(api.url.category, data)
		.then((res) => res.data)
		.catch((err) => {
			throw err.response.data;
		});
};

const read = ({ id }: { id: string }) => {
	return api
		.get<ResponseWrapper<ICategory>>(`${api.url.category}/${id}`)
		.then((res) => res.data);
};

const edit = ({
	id,
	data,
}: {
	id: string;
	data: Omit<ICategory, "categoryId">;
}) => {
	return api
		.put<ResponseWrapper<null>>(`${api.url.category}/${id}`, data)
		.then((res) => res.data)
		.catch((err) => {
			throw err;
		});
};

const remove = ({ id }: { id: string }) => {
	return api
		.delete<ResponseWrapper<null>>(`${api.url.category}/${id}`)
		.then((res) => res.data)
		.catch((err) => {
			throw err.response.data;
		});
};

const categoryService = {
	list,
	edit,
	read,
	remove,
	create,
};

export default categoryService;
