interface IBook {
	id: string;
	title: string;
	author: string;
	isbn: string;
	publishedYear: string;
	price: number;
	image: string;
	categoryId: string;
	nameCategory: string;
	urlImage: string;
	quatity: string;
	presentQuantity: string;
}

interface IBookPost {
	id: string;
	title: string;
	author: string;
	isbn: string;
	publishedYear: string;
	price: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	image: Record<string, any>;
	urlImage?: string;
	categoryId: string;
}

export type { IBook, IBookPost };
