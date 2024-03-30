import IGuest from "../type/guest.type";
import ResponseWrapper from "./ResponseWrapper";
import api from "./api";

const list = (q?: string) => {
	if (q) {
		return api
			.get<ResponseWrapper<IGuest[]>>(
				`${api.url.guest}?search=${q ? q : ""}`,
			)
			.then((res) => res.data);
	} else {
		return api
			.get<ResponseWrapper<IGuest[]>>(api.url.guest)
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
		.post<ResponseWrapper<null>>(api.url.guest, data, config)
		.then((res) => res.data)
		.catch((err) => {
			throw err.response.data as ResponseWrapper<IGuest>;
		});
};

const read = ({ id }: { id: string }) => {
	return api
		.get<ResponseWrapper<IGuest>>(`${api.url.guest}/${id}`)
		.then((res) => res.data);
};

const edit = ({ id, data }: { id: string; data: FormData }) => {
	const config = {
		headers: {
			"Content-Type": "multipart/form-data", // Thêm header Content-Type là multipart/form-data
		},
	};
	return api
		.put<ResponseWrapper<null>>(
			`${api.url.guest}/${id}`,
			data,
			config,
		)
		.then((res) => res.data)
		.catch((err) => {
			throw err.response.data as ResponseWrapper<IGuest>;
		});
};

const remove = ({ id }: { id: string }) => {
	return api
		.delete<ResponseWrapper<null>>(`${api.url.guest}/${id}`)
		.then((res) => res.data)
		.catch((err) => {
			throw err.response.data;
		});
};

const guestService = {
	list,
	edit,
	read,
	remove,
	create,
};

export default guestService;
