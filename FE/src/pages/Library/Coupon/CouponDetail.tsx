import {
	Button,
	Checkbox,
	Descriptions,
	Image,
	Modal,
	Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../../context/store";
import { Link, useParams } from "react-router-dom";
import {
	getBorrowBook,
	returnBooks,
} from "../../../context/BorrowBook/borrowBook.slice";
import { IBorrowBookDetails, IBorrowBookExport } from "../../../type";
import formatDate from "../../../utils/formatDate";
import { getGuest } from "../../../context/Guest/guest.slice";
import IGuest from "../../../type/guest.type";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../../utils/formatCurrency";

const CouponDetail = () => {
	const dispatch = useAppDispatch();
	const { id, mbId } = useParams();

	const [noreturnBooks, setNoreturnBooks] = useState<
		IBorrowBookDetails[]
	>([]);

	const [currentMember, setCurrentMember] = useState<IGuest | null>(
		null,
	);

	const [selectedBorrowBooks, setSelectedBorrowBooks] = useState<
		string[]
	>([]);

	const isLoading = useSelector(
		(state: RootState) => state.borrowBook.isLoading,
	);
	useEffect(() => {
		const reload = () => {
			if (id) {
				dispatch(getBorrowBook(id))
					.unwrap()
					.then((res: unknown) => {
						setNoreturnBooks(res as IBorrowBookDetails[]);
					});
			}
		};
		reload();
	}, [id, dispatch]);

	useEffect(() => {
		if (mbId) {
			dispatch(getGuest(mbId))
				.unwrap()
				.then((res) => {
					setCurrentMember(res as IGuest);
				});
		}
	}, []);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSelectedAll, setIsSelectedAll] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		if (id) {
			const submitData: IBorrowBookExport = {
				bookTranstionId: id,
				bookDetail: selectedBorrowBooks,
			};
			dispatch(returnBooks(submitData))
				.unwrap()
				.then(() => {
					setIsModalOpen(false);

					setSelectedBorrowBooks([]);
					dispatch(getBorrowBook(id))
						.unwrap()
						.then((res: unknown) => {
							setNoreturnBooks(res as IBorrowBookDetails[]);
						});
				});
		}
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handleCheckBorrowBooks = (id: string) => {
		if (selectedBorrowBooks.includes(id)) {
			const filterData = selectedBorrowBooks.filter((s) => s !== id);
			setSelectedBorrowBooks(filterData);
			setIsSelectedAll(false);
		} else {
			setSelectedBorrowBooks((prev) => [...prev, id]);
		}
	};

	const handleCheckBorrowAll = () => {
		if (id) {
			dispatch(getBorrowBook(id))
				.unwrap()
				.then((res) => {
					if (res) {
						const data = res.filter(
							(n) => n.returnDate === "0001-01-01T00:00:00",
						);
						const ids = data.map((d) => d.id);
						setSelectedBorrowBooks(ids);
						setIsSelectedAll(true);
					}
				});
		}
	};

	return (
		<>
			<Modal
				title="Accept action?"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<p>Continue action?</p>
			</Modal>
			{!isLoading && (
				<div>
					<div className="text-center text-4xl uppercase shadow font-semibold my-8 py-4 text-white bg-blue-500">
						Borrow book list
					</div>
					<div className="flex gap-2 justify-end px-3 py-2 my-4">
						<Button
							type="primary"
							disabled={selectedBorrowBooks.length === 0}
							onClick={showModal}
							size="large"
						>
							Return books
						</Button>
					</div>
					<div className="flex gap-2 justify-end px-6">
						<label htmlFor="all">Chọn tất cả</label>
						<span>
							<Checkbox
								checked={isSelectedAll}
								id="all"
								onChange={handleCheckBorrowAll}
							/>
						</span>
					</div>
					<div className="mt-4">
						<div className="divide-y-2">
							{noreturnBooks.map((n) => (
								<div>
									<Descriptions
										className="px-4 pt-8 hover:bg-slate-100"
										title={
											<Link
												className="text-xl"
												to={`/book/d/${n.bookId}`}
											>
												Title: {n.nameBook}
											</Link>
										}
									>
										<Descriptions.Item label="Image">
											<Image width={200} src={n.urlImage} />
										</Descriptions.Item>

										<Descriptions.Item label="Price">
											{formatCurrency(parseFloat(n.price))}
										</Descriptions.Item>

										<Descriptions.Item>
											<div className="flex gap-2 items-center justify-between flex-1">
												{n.status === "Đã quá hạn" ? (
													<>
														<Tag
															className="p-2 rounded-lg"
															color="#f50"
														>
															{n.status}
														</Tag>
													</>
												) : (
													<>
														<Tag
															className="p-2 rounded-lg"
															color="#108ee9"
														>
															{n.status ? n.status : "No return"}
														</Tag>
													</>
												)}

												{n.returnDate === "0001-01-01T00:00:00" && (
													<div className="px-2 py-1">
														<Checkbox
															checked={selectedBorrowBooks.includes(
																n.id,
															)}
															onClick={() =>
																handleCheckBorrowBooks(n.id)
															}
															type="primary"
														/>
													</div>
												)}
											</div>
										</Descriptions.Item>

										<Descriptions.Item label="Borrow date">
											{formatDate(n.borrowDate)}
										</Descriptions.Item>
										<Descriptions.Item label="Borrow deadline">
											{formatDate(n.deadLineDate)}
										</Descriptions.Item>
										<Descriptions.Item label="Return date">
											{n.returnDate === "0001-01-01T00:00:00"
												? "mm/dd/yyyy"
												: formatDate(n.returnDate)}
										</Descriptions.Item>
									</Descriptions>
								</div>
							))}
						</div>

						<div className="text-center text-4xl uppercase shadow font-semibold my-8 py-4 text-white bg-blue-500">
							Member info
						</div>
						<Link to={`/guest/d/${currentMember?.id}`}>
							<div>
								<Descriptions className="p-4 hover:bg-slate-100">
									<Descriptions.Item label="Avatar">
										<Image.PreviewGroup
											items={[
												currentMember?.urlImage
													? currentMember.urlImage
													: "",
											]}
										>
											<Image
												width={200}
												src={currentMember?.urlImage}
											/>
										</Image.PreviewGroup>
									</Descriptions.Item>
									<Descriptions.Item label="Username">
										{currentMember?.name}
									</Descriptions.Item>
									<Descriptions.Item label="Phone number">
										{currentMember?.phone}
									</Descriptions.Item>

									<Descriptions.Item label="Gender">
										{currentMember?.gender ? "Male" : "Female"}
									</Descriptions.Item>
								</Descriptions>
							</div>
						</Link>
					</div>
				</div>
			)}
		</>
	);
};

export default CouponDetail;

// works when >= 5.8.0, recommended ✅
