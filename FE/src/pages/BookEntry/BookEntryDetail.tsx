import React, { useEffect, useState } from "react";
import { IBookEntryDetails } from "../../type";
import bookEntryService from "../../services/bookEntryService";
import { formatCurrency } from "../../utils/formatCurrency";
import { Link, useParams } from "react-router-dom";
import { Descriptions } from "antd";

const BookEntryDetails = () => {
	const [currentBookEntry, setCurrentBookEntry] = useState<
		IBookEntryDetails[]
	>([]);

	const { id } = useParams();

	useEffect(() => {
		const loadData = async () => {
			if (id) {
				const data = await bookEntryService.read({ id });
				setCurrentBookEntry(data.data);
			}
		};
		loadData();
	}, [id]);

	const total = currentBookEntry.reduce(
		(prev, cur) =>
			(prev += parseFloat(cur.price) * parseInt(cur.quantity)),
		0,
	);
	return (
		<div>
			<div className="text-center text-4xl uppercase shadow font-semibold my-8 py-4 text-white bg-blue-500">
				Entry book list
			</div>
			<div className="py-2 rounded-md space-y-2">
				{currentBookEntry.map((c, i) => (
					<div>
						<Link to={`/book/d/${c.bookId}`}>
							<Descriptions
								column={2}
								className="py-2 flex justify-around hover:bg-slate-100 shadow"
							>
								<Descriptions.Item>
									<div className="space-x-4 flex gap-1 p-4 text-xl">
										<div>#</div>
										<div>{i + 1}</div>
									</div>
								</Descriptions.Item>
								<Descriptions.Item>
									<div className="space-x-4 flex gap-1 p-4 text-xl">
										<div>Title:</div>
										<div>{c.nameBook}</div>
									</div>
								</Descriptions.Item>

								<Descriptions.Item>
									<div className="space-x-4 flex gap-1 p-4 text-xl">
										<div>Quantity:</div>
										<div>{c.quantity}</div>
									</div>
								</Descriptions.Item>

								<Descriptions.Item>
									<div className="space-x-4 flex gap-1 p-4 text-xl">
										<div>Price:</div>
										<div>{formatCurrency(parseFloat(c.price))}</div>
									</div>
								</Descriptions.Item>
							</Descriptions>
						</Link>
					</div>
				))}
			</div>

			<div className="text-end text-3xl font-semibold shadow my-8 py-4 pr-4">
				Total: {formatCurrency(total)}
			</div>
		</div>
	);
};

export default BookEntryDetails;
