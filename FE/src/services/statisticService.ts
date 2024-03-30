import {
	IBookStatisticDetails,
	IMemberStatisticDetails,
	ITopBookStatistic,
	ITopCategoryStatistic,
	ITopMemberLateStatistic,
} from "../type/static.type";
import ResponseWrapper from "./ResponseWrapper";
import api from "./api";

const listTopBook = (from?: string, to?: string, search?: string) => {
	return api
		.get<ResponseWrapper<ITopBookStatistic[]>>(
			`${api.url.statistic}/topbook?from=${from ? from : ""}&to=${
				to ? to : ""
			}&search=${search ? search : ""}`,
		)
		.then((res) => res.data);
};

const listTopCategory = (
	from?: string,
	to?: string,
	search?: string,
) => {
	return api
		.get<ResponseWrapper<ITopCategoryStatistic[]>>(
			`${api.url.statistic}/topCategory?from=${from ? from : ""}&to=${
				to ? to : ""
			}&search=${search ? search : ""}`,
		)
		.then((res) => res.data);
};

const listTopMemberLate = (
	from?: string,
	to?: string,
	search?: string,
) => {
	return api
		.get<ResponseWrapper<ITopMemberLateStatistic[]>>(
			`${api.url.statistic}/topMemberLate?from=${
				from ? from : ""
			}&to=${to ? to : ""}&search=${search ? search : ""}`,
		)
		.then((res) => res.data);
};

const read = ({ id }: { id: string }) => {
	return api
		.get<ResponseWrapper<IBookStatisticDetails>>(
			`${api.url.statistic}/book/${id}`,
		)
		.then((res) => res.data);
};

const memberRead = ({ id }: { id: string }) => {
	return api
		.get<ResponseWrapper<IMemberStatisticDetails>>(
			`${api.url.statistic}/topMemberLateDetail/${id}`,
		)
		.then((res) => res.data);
};

const getQuantity = () => {
	return api
		.get<
			ResponseWrapper<{
				quantityBook: string;
				quantityPresentBook: string;
			}>
		>(`${api.url.statistic}/Statistis`)
		.then((res) => res.data);
};

const statisticService = {
	listTopBook,
	listTopCategory,
	listTopMemberLate,
	read,
	memberRead,
	getQuantity,
};

export default statisticService;
