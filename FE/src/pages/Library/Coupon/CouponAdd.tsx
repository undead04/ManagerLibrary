import {
	Button,
	DatePicker,
	Divider,
	Form,
	Input,
	Popover,
	SelectProps,
	Table,
	TableColumnsType,
	Tour,
	TourProps,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IBook } from "../../../type/book.type";
import {
	EyeOutlined,
	LineOutlined,
	PlusOutlined,
	QuestionCircleOutlined,
	SwapOutlined,
} from "@ant-design/icons";
import { RootState, useAppDispatch } from "../../../context/store";
import { useSelector } from "react-redux";
import { SearchProps } from "antd/es/input";
import { getBook, getBooks } from "../../../context/Book/book.slice";
import {
	getGuest,
	getGuests,
} from "../../../context/Guest/guest.slice";
import IGuest from "../../../type/guest.type";
import {
	addBorrowBooks,
	getUnpaidBooks,
} from "../../../context/BorrowBook/borrowBook.slice";
import { IBorrowBookPost } from "../../../type";
import { toast } from "react-toastify";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DebounceSelectProps<ValueType = any>
	extends Omit<
		SelectProps<ValueType | ValueType[]>,
		"options" | "children"
	> {
	fetchOptions: (search: string) => Promise<ValueType[]>;
	debounceTimeout?: number;
}

const { Search } = Input;

interface IBookExtend extends IBook {
	key: React.Key;
	index: number;
}

interface IBookEntry extends IBook {
	key: React.Key;
	index: number;
	deadLineDate: string;
}

const CouponAdd = () => {
	const dispatch = useAppDispatch();
	const books = useSelector(
		(state: RootState) => state.book.booksDetail,
	);
	const unpaidBooks = useSelector(
		(state: RootState) => state.borrowBook.unpaidBooks,
	);
	const [entryBooks, setEntryBooks] = useState<IBook[]>([]);
	const filterEntryBooks: IBookEntry[] = entryBooks.map(
		(e, index) => {
			return {
				...e,
				key: e.id,
				index,
				deadLineDate: new Date().toISOString(),
			};
		},
	);
	const isLoading = useSelector(
		(state: RootState) => state.book.isLoading,
	);

	const filteredData: IBookExtend[] = books.map((b, index) => {
		return {
			...b,
			key: b.id,
			index: index + 1,
		};
	});

	const hanlePlus = (id: string) => {
		const isExisting = entryBooks.find((e) => e.id === id);

		if (!isExisting) {
			dispatch(getBook(id))
				.unwrap()
				.then((res) => {
					console.log(res);

					setEntryBooks((prev) => {
						console.log(prev);
						return [...prev, res as IBook];
					});
				});
		}
	};

	const handleRemoveList = (id: string) => {
		const filterData = entryBooks.filter((e) => e.id !== id);
		setEntryBooks(filterData);
	};

	const columns: TableColumnsType<IBookExtend> = [
		{
			title: "STT",
			dataIndex: "index",
			align: "center",
			key: "index",
			fixed: "left",
		},

		{
			title: "ISBN Id",
			dataIndex: "isbn",
			key: "isbn",
			fixed: "left",
		},
		{
			title: "Title",
			dataIndex: "title",
			sorter: (a, b) => a.title.localeCompare(b.title),
			render: (title: string) => {
				return (
					<div className="max-w-[300px] line-clamp-2">{title}</div>
				);
			},
			key: "title",
		},
		{
			title: "Author",
			dataIndex: "author",
			sorter: (a, b) => a.author.localeCompare(b.author),
			render: (title: string) => {
				return (
					<div className="max-w-[300px] text-wrap line-clamp-2">
						{title}
					</div>
				);
			},
			key: "author",
		},

		{
			title: "",
			dataIndex: "id",
			align: "end",
			render: (id: string, item) => {
				return (
					<div className="flex gap-2 items-center justify-center">
						<Button className="p-0 aspect-square flex items-center justify-center">
							<Link
								className="text-blue-500 underline"
								to={`/book/d/${id} `}
							>
								<EyeOutlined />
							</Link>
						</Button>
						<Button
							disabled={
								!!entryBooks.find((e) => e.id === id) ||
								item.presentQuantity === 0
							}
							onClick={() => hanlePlus(id)}
							className="text-blue-500 underline p-0 aspect-square flex items-center justify-center"
						>
							<PlusOutlined />
						</Button>
					</div>
				);
			},
			key: "id",
			fixed: "right",
		},
	];

	const entryBookcolumns: TableColumnsType<IBookEntry> = [
		{
			title: "STT",
			dataIndex: "index",
			align: "center",
			key: "index",
			fixed: "left",
			width: 70,
		},

		{
			title: "ISBN Id",
			dataIndex: "isbn",
			key: "isbn",
			fixed: "left",
		},
		{
			title: "Title",
			dataIndex: "title",
			sorter: (a, b) => a.title.localeCompare(b.title),
			render: (title: string) => {
				return (
					<div className="max-w-[300px] line-clamp-2">{title}</div>
				);
			},
			key: "title",
		},
		{
			title: "Deadline",
			dataIndex: "deadLineDate",
			render: (_, item) => {
				return (
					<div className="">
						<DatePicker
							// defaultValue={price}
							onChange={(e) => {
								const index = filterEntryBooks.findIndex(
									(fe) => fe.id === item.id,
								);
								if (e) {
									const newDeadLineDate = e.toISOString();

									console.log(newDeadLineDate);

									filterEntryBooks[index].deadLineDate =
										newDeadLineDate;
								}
							}}
						/>
					</div>
				);
			},
			key: "quantity",
		},

		{
			title: "",
			dataIndex: "id",
			align: "end",
			render: (id: string) => {
				return (
					<div className="flex gap-2 items-center justify-center">
						<Button
							onClick={() => handleRemoveList(id)}
							className="text-blue-500 underline p-0 aspect-square flex items-center justify-center"
						>
							<LineOutlined />
						</Button>
					</div>
				);
			},
			key: "id",
			fixed: "right",
		},
	];

	const onSearchBooks: SearchProps["onSearch"] = (value) => {
		dispatch(getBooks({ q: value }));
	};

	const guests = useSelector(
		(state: RootState) => state.guest.guests,
	);

	const unpaidIds = unpaidBooks.map((u) => u.memebrId);
	const guestOptions = guests.map((g) => {
		if (unpaidIds.includes(g.id)) {
			return {
				...g,
				paid: false,
			};
		} else {
			return {
				...g,
				paid: true,
			};
		}
	});

	const [selectedGuest, setSelectedGuest] = useState<IGuest | null>();
	const [selectedGuestId, setSelectedGuestId] = useState<string>("");
	useEffect(() => {
		dispatch(getBooks({}));
		dispatch(getUnpaidBooks({}));
		dispatch(getGuests({}));
	}, [dispatch]);

	const onSearchGuests: SearchProps["onSearch"] = (value) => {
		dispatch(getGuests({ q: value }));
		console.log(guests);
	};

	const reloadGuests = () => {
		dispatch(getGuests({}));
	};
	useEffect(() => {
		dispatch(getGuest(selectedGuestId))
			.unwrap()
			.then((res) => {
				setSelectedGuest(res);
			});
	}, [dispatch, selectedGuestId]);

	const onFinish = () => {
		const submitData: IBorrowBookPost = {
			memberId: selectedGuestId,
			transitionBookDetail: filterEntryBooks.map((f) => ({
				bookId: f.id,
				quantity: "1",
				deadLineDate: f.deadLineDate,
			})),
		};

		if (
			submitData &&
			submitData.memberId &&
			submitData.transitionBookDetail[0]?.bookId
		) {
			dispatch(addBorrowBooks(submitData))
				.unwrap()
				.then(() => {
					setEntryBooks([]);
					setSelectedGuestId("");
					setSelectedGuest(null);
					dispatch(getGuests({}));
					dispatch(getBooks({}));
					dispatch(getUnpaidBooks({}));
				});
		} else {
			toast.info("Please choose books for the service");
		}
	};

	// Tour
	const ref1 = useRef(null);
	const ref2 = useRef(null);
	const ref3 = useRef(null);
	const ref4 = useRef(null);
	const [open, setOpen] = useState<boolean>(false);

	const steps: TourProps["steps"] = [
		{
			title: "Choose books for lending",
			description: "Click the + button behind the row",
			target: () => ref1.current,
		},
		{
			title: "Set the deadline date",
			description:
				"You can set the deadline return date for each book",
			target: () => ref2.current,
		},
		{
			title: "Select a member continue ",
			description: "Click the + button behind the row",
			target: () => ref3.current,
		},

		{
			title: "Save",
			description: "Click here to save",
			target: () => ref4.current,
		},
	];

	return (
		<>
			<Tour
				open={open}
				onClose={() => setOpen(false)}
				steps={steps}
			/>
			<div>
				<h4 className="text-3xl bg-blue-600 py-4 text-white font-semibold mb-4 text-center rounded-sm">
					Create lending coupon
				</h4>
				<Button
					type="primary"
					className="p-2 flex ml-auto mb-2 items-center"
					onClick={() => setOpen(true)}
				>
					<QuestionCircleOutlined />
				</Button>
				<Form>
					<div className="grid grid-cols-2 gap-8">
						<div>
							{!isLoading && (
								<div className="space-y-4 shadow-md p-4" ref={ref1}>
									<div className="text-xl font-semibold">
										Select books to entry
									</div>
									<Search
										size="large"
										placeholder="Search for books"
										onSearch={onSearchBooks}
										enterButton
									/>
									<Table
										columns={columns}
										dataSource={filteredData}
										pagination={{
											showTotal: (t) => <div>Totals: {t}</div>,
											total: filteredData.length,
											defaultPageSize: 8,
											pageSizeOptions: [8, 10, 20, 30, 50, 100],
											showSizeChanger: true,
										}}
									/>
								</div>
							)}
						</div>
						<div className="flex flex-col">
							{!isLoading && (
								<div
									className="space-y-4 shadow-md p-4 h-auto flex-1"
									ref={ref2}
								>
									<div className="text-xl font-semibold">
										Choosed books
									</div>
									<Table
										className="h-auto"
										size="large"
										columns={entryBookcolumns}
										dataSource={filterEntryBooks}
										pagination={{
											showTotal: (t) => <div>Totals: {t}</div>,
											total: entryBooks.length,
											defaultPageSize: 4,
											pageSizeOptions: [4, 10, 20, 30, 50, 100],
											showSizeChanger: true,
										}}
									/>
								</div>
							)}

							<div
								className="space-y-8 rounded-md shadow-md p-4 flex-1"
								ref={ref3}
							>
								<div className="font-bold text-xl">
									Member Information
								</div>

								<div className="space-y-4">
									<div className="flex justify-between items-center">
										<div className="text-lg font-semibold">
											Choose a member:
										</div>
										<div>
											<Button
												type="primary"
												size="large"
												onClick={reloadGuests}
											>
												Reload
											</Button>
										</div>
									</div>

									<Search
										size="large"
										placeholder="Search for member"
										onSearch={onSearchGuests}
										enterButton
									/>

									<div className="h-[200px] overflow-y-scroll flex-1">
										{guestOptions.map((g) => (
											<Popover
												placement="leftBottom"
												key={g.id}
												title={
													<div className="flex items-center text-lg font-semibold">
														<div>{g.name} - Details</div>
													</div>
												}
												content={
													<div className="text-sm space-y-4">
														<div className="flex justify-between">
															<div>Name: </div>
															<div>{g?.name}</div>
														</div>
														<div className="flex justify-between">
															<div>Gender: </div>
															<div>
																{g?.gender ? "Male" : "Female"}
															</div>
														</div>
														<div className="flex justify-between">
															<div>Phone: </div>
															<div>{g?.phone}</div>
														</div>
														<div className="flex justify-between">
															<div>Address: </div>
															<div>{g?.address}</div>
														</div>

														<div>
															<div className="flex justify-between">
																<div>State: </div>
																{g.paid ? (
																	<div className="flex items-center flex-nowrap gap-1">
																		<div className="w-2 h-2 rounded-full bg-green-500"></div>{" "}
																		<div>Available</div>
																	</div>
																) : (
																	<div className="flex items-center flex-nowrap gap-1">
																		<div className="w-2 h-2 rounded-full bg-red-500"></div>
																		<div>Borrowing</div>
																	</div>
																)}
															</div>
														</div>
													</div>
												}
											>
												<div>
													<div className="flex items-center gap-2 py-2 px-4 hover:bg-gray-50">
														<div className="rounded-full overflow-hidden">
															<img
																className="w-[40px] aspect-square object-fill"
																alt={g.name}
																src={g.urlImage}
															/>
														</div>
														<div className="text-lg font-normal flex-1">
															<div className="flex justify-between">
																<div className="flex-1">{g.name}</div>
																<Button
																	disabled={
																		g.id === selectedGuestId ||
																		!g.paid
																	}
																	type="primary"
																	className="p-2 flex items-center justify-center"
																	onClick={() =>
																		setSelectedGuestId(g.id)
																	}
																>
																	{selectedGuestId ? (
																		<SwapOutlined />
																	) : (
																		<PlusOutlined />
																	)}
																</Button>
															</div>
														</div>
													</div>
												</div>
											</Popover>
										))}
									</div>
								</div>

								<Divider />

								{selectedGuest?.id && (
									<>
										<div className="font-semibold text-lg">
											Selected member:
										</div>
										<div className="flex gap-10">
											<div>
												<img
													className="w-[40px] aspect-square object-fill"
													alt={selectedGuest.name}
													src={selectedGuest.urlImage}
												/>
											</div>

											<div className="text-lg flex-1 mr-8 space-y-4">
												<div className="flex justify-between">
													<div>Name: </div>
													<div>{selectedGuest?.name}</div>
												</div>
												<div className="flex justify-between">
													<div>Gender: </div>
													<div>
														{selectedGuest?.gender
															? "Male"
															: "Female"}
													</div>
												</div>
												<div className="flex justify-between">
													<div>Phone: </div>
													<div>{selectedGuest?.phone}</div>
												</div>
												<div className="flex justify-between">
													<div>Address: </div>
													<div>{selectedGuest?.address}</div>
												</div>
											</div>
										</div>

										<div
											className="flex justify-end gap-4"
											ref={ref4}
										>
											<Button
												type="default"
												htmlType="reset"
												size="large"
											>
												Cancel
											</Button>

											<Button
												type="primary"
												htmlType="submit"
												size="large"
												onClick={onFinish}
											>
												Save
											</Button>
										</div>
									</>
								)}
							</div>
						</div>
					</div>

					<Divider />

					<div className="flex gap-4 justify-center mt-20">
						<Form.Item></Form.Item>
					</div>
				</Form>
			</div>
		</>
	);
};

export default CouponAdd;
