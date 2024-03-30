import { IRole } from "../type";
import ResponseWrapper from "./ResponseWrapper";
import api from "./api";

const list = () => {
	return api
		.get<ResponseWrapper<IRole[]>>(api.url.role)
		.then((res) => res.data);
};

const create = ({ data }: { data: Omit<IRole, "id"> }) => {
	return api
		.post<ResponseWrapper<string>>(api.url.role, data)
		.then((res) => res.data)
		.catch((err) => {
			throw err.response.data;
		});
};

const read = ({ id }: { id: string }) => {
	return api
		.get<ResponseWrapper<IRole>>(`${api.url.role}/${id}`)
		.then((res) => res.data);
};

const edit = ({
	id,
	data,
}: {
	id: string;
	data: Omit<IRole, "id">;
}) => {
	return api
		.put<ResponseWrapper<null>>(`${api.url.role}/${id}`, data)
		.then((res) => res.data)
		.catch((err) => {
			throw err;
		});
};

const remove = ({ id }: { id: string }) => {
	return api
		.delete<ResponseWrapper<string>>(`${api.url.role}/${id}`)
		.then((res) => res.data)
		.catch((err) => {
			throw err.response.data;
		});
};

const roleService = {
	list,
	edit,
	read,
	remove,
	create,
};

export default roleService;
