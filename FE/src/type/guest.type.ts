interface IGuest {
	id: string;
	name: string;
	phone: string;
	address: string;
	gender: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	avatar?: Record<string, any>;
	urlImage?: string;
}

export default IGuest;
