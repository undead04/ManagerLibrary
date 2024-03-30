interface ITopBookStatistic {
	id: string;
	urlImage: string;
	title: string;
	borrowCount: string;
}

interface ITopCategoryStatistic {
	id: string;
	name: string;
	description: string;
	borrowCount: string;
}

interface ITopMemberLateStatistic {
	id: string;
	name: string;
	phone: string;
	avatar: string;
	urlImage: string;
	address: string;
	gender: string;
	lateCount: number;
}

interface IBookStatisticDetails {
	bookId: string;
	urlImage: string;
	title: string;
	members: {
		id: string;
		name: string;
		phone: string;
		avatar: string;
		urlImage: string;
		address: string;
		gender: boolean;
	}[];
}

interface IMemberStatisticDetails {
	name: string;
	urlImage: string;
	phone: string;
	bookTranstionDetail: {
		id: string;
		bookId: string;
		quantity: string;
		nameBook: string;
		deadLineDate: string;
		borrowDate: string;
		status: string;
		urlImage: string;
		returnDate: string;
		price: string;
	}[];
}

export type {
	ITopBookStatistic,
	IBookStatisticDetails,
	ITopCategoryStatistic,
	ITopMemberLateStatistic,
	IMemberStatisticDetails,
};
