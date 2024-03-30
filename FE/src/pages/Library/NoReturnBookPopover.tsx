import React, { useEffect, useState } from "react";
import { IBorrowBookDetails } from "../../type";
import { useAppDispatch } from "../../context/store";
import { getBorrowBook } from "../../context/BorrowBook/borrowBook.slice";
import formatDate from "../../utils/formatDate";

const NoReturnBookPopover = ({ id }: { id: string }) => {
	const dispatch = useAppDispatch();
	const [noreturnBooks, setNoreturnBooks] = useState<
		IBorrowBookDetails[]
	>([]);

	useEffect(() => {
		if (id) {
			dispatch(getBorrowBook(id))
				.unwrap()
				.then((res: unknown) => {
					setNoreturnBooks(res as IBorrowBookDetails[]);
				});
		}
	}, []);
	return (
		<div>
			<div>
				Process:{" "}
				{noreturnBooks &&
					noreturnBooks.filter(
						(n) => n.returnDate !== "0001-01-01T00:00:00",
					).length}
				/{noreturnBooks && noreturnBooks.length}
			</div>
			<div className="divide-y-2">
				{noreturnBooks && (
					<>
						{noreturnBooks.map((n) => (
							<div className="p-2">
								<div className="flex items-center gap-2">
									<div>Title: </div>
									<div>{n.nameBook} </div>
								</div>
								<div className="flex items-center gap-2">
									<div>Deadline: </div>
									<div>{formatDate(n.deadLineDate)} </div>
								</div>
								<div className="flex items-center gap-2">
									<div>Status: </div>
									<div
										className={`${
											n.status === "Đã quá hạn"
												? "text-red-600"
												: n.status === ""
												? "text-green-500"
												: ""
										}`}
									>
										{n.status === "" ? "Chưa trả" : n.status}
									</div>
								</div>
							</div>
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default NoReturnBookPopover;
