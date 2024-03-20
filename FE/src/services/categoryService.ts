import { ICategory } from "../type";
import ResponseWrapper from "./ResponseWrapper";
import api from "./api";

const list = () => {
	return api
		.get<ResponseWrapper<ICategory[]>>(api.url.category)
		.then((res) => res.data);
};

const create = ({
	data,
}: {
	data: Omit<ICategory, "categoryId">;
}) => {
	return api
		.post<ResponseWrapper<null>>(api.url.category, data)
		.then((res) => res.data);
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
	return api.put<ResponseWrapper<null>>(
		`${api.url.category}/${id}`,
		data,
	);
};

const remove = ({ id }: { id: string }) => {
	return api
		.delete<ResponseWrapper<null>>(`${api.url.category}/${id}`)
		.then((res) => res.data);
};

const categoryService = {
	list,
	edit,
	read,
	remove,
	create,
};

export default categoryService;
