import { IStaff } from "../type";
import ResponseWrapper from "./ResponseWrapper";
import api from "./api";

const list = (q?: string, roleId?: string) => {
	if (q || roleId) {
		return api
			.get<ResponseWrapper<IStaff[]>>(
				`${api.url.staff}?search=${q ? q : ""}&roleId=${
					roleId ? roleId : ""
				}`,
			)
			.then((res) => res.data);
	} else {
		return api
			.get<ResponseWrapper<IStaff[]>>(api.url.staff)
			.then((res) => res.data);
	}
};

const create = ({ data }: { data: FormData }) => {
	const config = {
		headers: {
			"Content-Type": "multipart/form-data", // Thêm header Content-Type là multipart/form-data
		},
	};

	return api
		.post<ResponseWrapper<string>>(api.url.staff, data, config)
		.then((res) => res.data)
		.catch((err) => {
			throw err.response.data;
		});
};

const read = ({ id }: { id: string }) => {
	return api
		.get<ResponseWrapper<IStaff>>(`${api.url.staff}/${id}`)
		.then((res) => res.data);
};

const edit = ({ id, data }: { id: string; data: FormData }) => {
	const config = {
		headers: {
			"Content-Type": "multipart/form-data", // Thêm header Content-Type là multipart/form-data
		},
	};
	return api
		.put<ResponseWrapper<string>>(
			`${api.url.staff}/${id}`,
			data,
			config,
		)
		.then((res) => res.data)
		.catch((err) => {
			throw err.response.data as ResponseWrapper<IStaff>;
		});
};

const remove = ({ id }: { id: string }) => {
	return api
		.delete<ResponseWrapper<string>>(`${api.url.staff}/${id}`)
		.then((res) => res.data)
		.catch((err) => {
			throw err.response.data;
		});
};

const staffService = {
	list,
	edit,
	read,
	remove,
	create,
};

export default staffService;
