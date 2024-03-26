interface IStaff {
	id: string;
	userName: string;
	roleId: string;
	email: string;
	password?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	avatar?: Record<string, any>;
	phone: string;
	gender: boolean;
	address: string;
	role?: string;
	urlAvatar?: string;
}

export default IStaff;
