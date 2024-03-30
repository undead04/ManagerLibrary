import {
	IBookStatisticDetails,
	ITopBookStatistic,
} from "../type/static.type";
import ResponseWrapper from "./ResponseWrapper";
import api from "./api";

const listTopBook = (from?: string, to?: string) => {
	return api
		.get<ResponseWrapper<ITopBookStatistic[]>>(
			`${api.url.statistic}/topbook?from=${from ? from : ""}&to=${
				to ? to : ""
			}`,
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

const getQuantity = () => {
	return api
		.get<
			ResponseWrapper<{
				quantityBook: string;
				qunatityPresentBook: string;
			}>
		>(`${api.url.statistic}/Statistis`)
		.then((res) => res.data);
};

const statisticService = {
	listTopBook,
	read,
	getQuantity,
};

export default statisticService;
