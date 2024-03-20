type ResponseWrapper<T> = {
	statusCode: number;
	message: string | null;
	data: T;
};

export default ResponseWrapper;
