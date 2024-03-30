interface ITopBookStatistic {
	id: string;
	urlImage: string;
	title: string;
	borrowCount: string;
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
export type { ITopBookStatistic, IBookStatisticDetails };
