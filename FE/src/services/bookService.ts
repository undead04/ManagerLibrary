import { IBook, IBookPost } from "../type/book.type";
import ResponseWrapper from "./ResponseWrapper";
import api from "./api";

const list = (q?: string, categoryId?: string) => {
	if (q || categoryId) {
		return api
			.get<ResponseWrapper<IBook[]>>(
				`${api.url.book}?search=${q ? q : ""}&categoryId=${
					categoryId ? categoryId : ""
				}`,
			)
			.then((res) => res.data);
	} else {
		return api
			.get<ResponseWrapper<IBook[]>>(api.url.book)
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
		.post<ResponseWrapper<null>>(api.url.book, data, config)
		.then((res) => res.data)
		.catch((err) => {
			throw err.response.data as ResponseWrapper<IBookPost>;
		});
};

const read = ({ id }: { id: string }) => {
	return api
		.get<ResponseWrapper<IBook>>(`${api.url.book}/${id}`)
		.then((res) => res.data);
};

const edit = ({ id, data }: { id: string; data: FormData }) => {
	const config = {
		headers: {
			"Content-Type": "multipart/form-data", // Thêm header Content-Type là multipart/form-data
		},
	};
	return api
		.put<ResponseWrapper<null>>(`${api.url.book}/${id}`, data, config)
		.then((res) => res.data)
		.catch((err) => {
			throw err.response.data as ResponseWrapper<IBookPost>;
		});
};

const remove = ({ id }: { id: string }) => {
	return api
		.delete<ResponseWrapper<null>>(`${api.url.book}/${id}`)
		.then((res) => res.data);
};

const bookService = {
	list,
	edit,
	read,
	remove,
	create,
};

export default bookService;
