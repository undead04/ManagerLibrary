import {
	IBookEntryDetails,
	IBookEntryEntity,
	IBookEntryPost,
} from "../type";
import ResponseWrapper from "./ResponseWrapper";
import api from "./api";

const list = (staffId?: string) => {
	return api
		.get<ResponseWrapper<IBookEntryEntity[]>>(
			`${api.url.importBook}?staffId=${staffId ? staffId : ""}`,
		)
		.then((res) => res.data);
};

const create = ({ data }: { data: Omit<IBookEntryPost, "id"> }) => {
	return api
		.post<ResponseWrapper<string>>(api.url.importBook, data)
		.then((res) => res.data)
		.catch((err) => {
			throw err.response.data;
		});
};

const read = ({ id }: { id: string }) => {
	return api
		.get<ResponseWrapper<IBookEntryDetails[]>>(
			`${api.url.importBook}/${id}`,
		)
		.then((res) => res.data);
};

const bookEntryService = {
	list,
	read,
	create,
};

export default bookEntryService;
