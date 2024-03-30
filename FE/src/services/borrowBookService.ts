import {
	IBorrowBookDetails,
	IBorrowBookEntity,
	IBorrowBookExport,
	IBorrowBookPost,
} from "../type";
import ResponseWrapper from "./ResponseWrapper";
import api from "./api";

const list = (
	ballotType?: "X" | "N",
	staffId?: string,
	memberId?: string,
) => {
	if (ballotType || staffId || memberId) {
		return api
			.get<ResponseWrapper<IBorrowBookEntity[]>>(
				`${api.url.borrowBook}?ballotType=${
					ballotType ? ballotType : ""
				}&staffId=${staffId ? staffId : ""}&memberId=${
					memberId ? memberId : ""
				}`,
			)
			.then((res) => res.data);
	} else {
		return api
			.get<ResponseWrapper<IBorrowBookEntity[]>>(api.url.borrowBook)
			.then((res) => res.data);
	}
};

const create = ({ data }: { data: IBorrowBookPost }) => {
	return api
		.post<ResponseWrapper<string>>(api.url.borrowBook, data)
		.then((res) => res.data)
		.catch((err) => {
			throw err.response.data;
		});
};

const returnBooks = ({ data }: { data: IBorrowBookExport }) => {
	return api
		.post<ResponseWrapper<string>>(
			`${api.url.borrowBook}/export`,
			data,
		)
		.then((res) => res.data)
		.catch((err) => {
			throw err.response.data;
		});
};

const read = ({ id }: { id: string }) => {
	return api
		.get<ResponseWrapper<IBorrowBookDetails[]>>(
			`${api.url.borrowBook}/${id}`,
		)
		.then((res) => res.data);
};

const unpaidList = ({
	search,
	bookId,
}: {
	search?: string;
	bookId?: string;
}) => {
	return api
		.get<ResponseWrapper<IBorrowBookEntity[]>>(
			`${api.url.borrowBook}/unpaidbook?search=${
				search ? search : ""
			}&bookId=${bookId ? bookId : ""}`,
		)
		.then((res) => res.data);
};

const borrowBookService = {
	list,
	read,
	create,
	unpaidList,
	returnBooks,
};

export default borrowBookService;
