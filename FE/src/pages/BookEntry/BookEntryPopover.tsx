import React, { useEffect, useState } from "react";
import { IBookEntryDetails } from "../../type";
import bookEntryService from "../../services/bookEntryService";
import { formatCurrency } from "../../utils/formatCurrency";

const BookEntryPopover = ({ id }: { id: string }) => {
	const [currentBookEntry, setCurrentBookEntry] = useState<
		IBookEntryDetails[]
	>([]);

	useEffect(() => {
		const loadData = async () => {
			const data = await bookEntryService.read({ id });
			setCurrentBookEntry(data.data);
		};
		loadData();
	}, [id]);

	return (
		<div className="px-3 py-2 shadow rounded-md divide-y-2">
			{currentBookEntry.map((c) => (
				<div className="py-2">
					<div className="flex items-center gap-2">
						<div>Title:</div>
						<div>{c.nameBook}</div>
					</div>

					<div className="flex items-center gap-2">
						<div>Quantity:</div>
						<div>{c.quantity}</div>
					</div>

					<div className="flex items-center gap-2">
						<div>Price:</div>
						<div>{formatCurrency(parseFloat(c.price))}</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default BookEntryPopover;
