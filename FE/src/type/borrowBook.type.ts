interface IBorrowBookEntity {
	id: string;
	staffId: string;
	nameStaff: string;
	nameMember: string;
	memebrId: string;
	ballotType: "X" | "N";
}

interface IBorrowBookPost {
	memberId: string;
	transitionBookDetail: {
		bookId: string;
		quantity: string;
		deadLineDate: string;
	}[];
}

interface IBorrowBookExport {
	bookTranstionId: string;
	bookDetail: string[];
}

interface IBorrowBookDetails {
	id: string;
	bookId: string;
	quantity: string;
	nameBook: string;
	deadLineDate: string;
	borrowDate: string;
	status: string;
	returnDate: string;
	urlImage: string;
	price: string;
}
export type {
	IBorrowBookEntity,
	IBorrowBookPost,
	IBorrowBookDetails,
	IBorrowBookExport,
};
