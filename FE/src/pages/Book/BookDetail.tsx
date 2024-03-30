import { Descriptions, Image } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import bookService from "../../services/bookService";
import { IBook } from "../../type/book.type";
import { formatCurrency } from "../../utils/formatCurrency";

const BookDetail = () => {
	const { id } = useParams();
	const [currentBook, setCurrentBook] = useState<IBook | null>(null);

	useEffect(() => {
		const loadData = async () => {
			try {
				if (id) {
					const data = await bookService.read({ id });

					setCurrentBook(data.data as IBook);
				}
			} catch (error) {
				console.log(error);
			}
		};

		loadData();
	}, [id]);
	return (
		<div>
			<div>
				<Descriptions title="Book Info">
					<Descriptions.Item label="Image">
						<Image.PreviewGroup>
							<Image width={200} src={currentBook?.urlImage} />
						</Image.PreviewGroup>
					</Descriptions.Item>
					<Descriptions.Item label="Title">
						{currentBook?.title}
					</Descriptions.Item>
					<Descriptions.Item label="Category">
						{currentBook?.nameCategory}
					</Descriptions.Item>
					<Descriptions.Item label="ISBN ID">
						{currentBook?.isbn}
					</Descriptions.Item>
					<Descriptions.Item label="Author">
						{currentBook?.author}
					</Descriptions.Item>
					<Descriptions.Item label="Publish year">
						{currentBook?.publishedYear}
					</Descriptions.Item>
					<Descriptions.Item label="Quantity">
						{currentBook?.presentQuantity}/{currentBook?.quantity}
					</Descriptions.Item>

					<Descriptions.Item label="Price">
						{currentBook?.price && formatCurrency(currentBook.price)}
					</Descriptions.Item>
				</Descriptions>
			</div>
		</div>
	);
};

export default BookDetail;

// works when >= 5.8.0, recommended ✅
