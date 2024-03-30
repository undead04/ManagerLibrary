interface IBookEntryEntity {
	id: string;
	create_At: string;
	userName: string;
}

interface IBookEntryPost {
	importBookDetails: {
		bookId: string;
		price: string;
		quantity: string;
	}[];
}

interface IBookEntryDetails {
	id: string;
	nameBook: string;
	importReceiptId: string;
	price: string;
	quantity: string;
	bookId: string;
}
export type { IBookEntryEntity, IBookEntryPost, IBookEntryDetails };
