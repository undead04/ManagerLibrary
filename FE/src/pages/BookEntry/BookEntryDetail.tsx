import React, { useEffect, useState } from "react";
import { IBookEntryDetails } from "../../type";
import bookEntryService from "../../services/bookEntryService";
import { formatCurrency } from "../../utils/formatCurrency";
import { useParams } from "react-router-dom";
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
		(prev, cur) => (prev += parseFloat(cur.price)),
		0,
	);
	return (
		<div>
			<div className="text-center text-4xl uppercase shadow font-semibold my-8 py-4">
				Entry book list
			</div>
			<div className="px-3 py-2 shadow rounded-md divide-y-2">
				{currentBookEntry.map((c, i) => (
					<Descriptions className="py-2 flex justify-around">
						<Descriptions.Item>
							<div className="space-x-4 flex gap-1 p-4">
								<div>#</div>
								<div>{i + 1}</div>
							</div>
						</Descriptions.Item>
						<Descriptions.Item>
							<div className="space-x-4 flex gap-1 p-4">
								<div>Title:</div>
								<div>{c.nameBook}</div>
							</div>
						</Descriptions.Item>

						<Descriptions.Item>
							<div className="space-x-4 flex gap-1 p-4">
								<div>Quantity:</div>
								<div>{c.quantity}</div>
							</div>
						</Descriptions.Item>

						<Descriptions.Item>
							<div className="space-x-4 flex gap-1 p-4">
								<div>Price:</div>
								<div>{formatCurrency(parseFloat(c.price))}</div>
							</div>
						</Descriptions.Item>
					</Descriptions>
				))}
			</div>

			<div className="text-end text-3xl font-semibold shadow my-8 py-4">
				Total: {formatCurrency(total)}
			</div>
		</div>
	);
};

export default BookEntryDetails;
