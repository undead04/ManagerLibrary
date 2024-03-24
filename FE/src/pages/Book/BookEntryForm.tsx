import {
	EyeOutlined,
	LineOutlined,
	PlusOutlined,
	SwapOutlined,
} from "@ant-design/icons";
import {
	Button,
	Descriptions,
	Image,
	Input,
	InputNumber,
	Table,
	TableColumnsType,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../../context/store";
import { useSelector } from "react-redux";
import { IBook } from "../../type/book.type";
import { getBook, getBooks } from "../../context/Book/book.slice";
import IGuest from "../../type/guest.type";
import { getGuests } from "../../context/Guest/guest.slice";
import { SearchProps } from "antd/es/input";

const { Search } = Input;

interface IBookExtend extends IBook {
	key: React.Key;
	index: number;
}

interface IBookEntry extends IBook {
	key: React.Key;
	index: number;
	quantity: number;
}

interface GuestExtend extends IGuest {
	key: React.Key;
	index: number;
}

const BookEntryForm = () => {
	const dispatch = useAppDispatch();
	const books = useSelector(
		(state: RootState) => state.book.booksDetail,
	);

	const guests = useSelector(
		(state: RootState) => state.guest.guests,
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
			render: (id: string) => {
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
							disabled={!!entryBooks.find((e) => e.id === id)}
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
			title: "Quantity",
			dataIndex: "quantity",
			sorter: (a, b) => a.author.localeCompare(b.author),
			render: (quantity: number, item) => {
				return (
					<div className="">
						<InputNumber
							defaultValue={item.quantity}
							onChange={(e) => {
								const index = filterEntryBooks.findIndex(
									(fe) => fe.id === item.id,
								);
								if (e) {
									filterEntryBooks[index].quantity = e;
								}
							}}
						/>
					</div>
				);
			},
			key: "quantity",
		},

		{
			title: "Price",
			dataIndex: "price",
			sorter: (a, b) => a.author.localeCompare(b.author),
			render: (price: number, item) => {
				return (
					<div className="">
						<InputNumber
							defaultValue={price}
							onChange={(e) => {
								const index = filterEntryBooks.findIndex(
									(fe) => fe.id === item.id,
								);
								if (e) {
									filterEntryBooks[index].price = e;
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

					console.log(filterEntryBooks);
				});
		}
	};

	const handleRemoveList = (id: string) => {
		const filterData = entryBooks.filter((e) => e.id !== id);
		setEntryBooks(filterData);
	};

	const onSearchBooks: SearchProps["onSearch"] = (value) => {
		dispatch(getBooks({ q: value }));
	};

	useEffect(() => {
		dispatch(getBooks({}));
		dispatch(getGuests({}));
	}, [dispatch]);

	// Store book entry
	const [entryBooks, setEntryBooks] = useState<IBook[]>([]);
	const filterEntryBooks: IBookEntry[] = entryBooks.map(
		(e, index) => {
			return {
				...e,
				key: e.id,
				index,
				quantity: 1,
			};
		},
	);

	// Selected guest state (only 1)
	const [selectedGuest, setSelectedGuest] = useState<GuestExtend>();

	const filterGuestData: GuestExtend[] = guests.map((g, index) => {
		return {
			...g,
			key: g.id,
			index: index + 1,
		};
	});

	const guestColumns: TableColumnsType<GuestExtend> = [
		{
			title: "Username",
			dataIndex: "name",
		},
		{
			title: "Phone",
			dataIndex: "phone",
		},

		{
			title: "Gender",
			dataIndex: "gender",
			render: (gender: boolean) => (gender ? "Male" : "Female"),
		},
		{
			title: "Address",
			dataIndex: "address",
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
								to={`/guest/d/${id} `}
							>
								<EyeOutlined />
							</Link>
						</Button>
						{item.id !== selectedGuest?.id ? (
							<Button
								onClick={() => setSelectedGuest(item)}
								className="text-blue-500 underline p-0 aspect-square flex items-center justify-center"
							>
								{selectedGuest?.id ? (
									<>
										<SwapOutlined />
									</>
								) : (
									<>
										<PlusOutlined />
									</>
								)}
							</Button>
						) : (
							<></>
						)}
					</div>
				);
			},
			key: "id",
			fixed: "right",
		},
	];

	const onSearchGuest: SearchProps["onSearch"] = (value) => {
		dispatch(getGuests({ q: value }));
	};

	const onFinish = () => {};
	return (
		<div>
			<div className="text-3xl font-semibold my-2 bg-blue-500 py-4 text-white text-center">
				Book entry
			</div>

			<div className="mt-8 space-y-10">
				<div className="grid grid-cols-2 gap-8">
					{!isLoading && (
						<div className="space-y-4 shadow-md p-4">
							<div className="text-xl font-semibold">
								Choose a guest
							</div>

							<Search
								size="large"
								placeholder="Search for guests"
								onSearch={onSearchGuest}
								enterButton
							/>
							<Table
								columns={guestColumns}
								dataSource={filterGuestData}
								pagination={{
									showTotal: (t) => <div>Totals: {t}</div>,
									total: filterGuestData.length,
									defaultPageSize: 4,
									pageSizeOptions: [4, 10, 20, 30, 50, 100],
									showSizeChanger: true,
								}}
							/>
						</div>
					)}

					<div className="shadow-md p-4">
						{selectedGuest?.id && (
							<Descriptions title="Selected Guest: ">
								<Descriptions.Item label="Name">
									{selectedGuest?.name}
								</Descriptions.Item>
								<Descriptions.Item label="Telephone">
									{selectedGuest?.phone}
								</Descriptions.Item>
								<Descriptions.Item label="Address">
									{selectedGuest?.address}
								</Descriptions.Item>

								<Descriptions.Item label="Avatar">
									<Image
										style={{ width: "80px" }}
										className="aspect-square object-contain"
										src={selectedGuest?.urlImage}
									/>
								</Descriptions.Item>

								<Descriptions.Item label="Gender">
									{selectedGuest?.gender ? "Male" : "Female"}
								</Descriptions.Item>
							</Descriptions>
						)}

						{!selectedGuest?.id && (
							<div className="text-3xl font-semibold text-center text-wrap mt-10">
								Please select a guest to <br /> start book entry
							</div>
						)}
					</div>
				</div>
				<div className="grid grid-cols-2 gap-8">
					<div>
						{!isLoading && (
							<div className="space-y-4 shadow-md p-4">
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
									scroll={{ x: 600, y: 3000 }}
									pagination={{
										showTotal: (t) => <div>Totals: {t}</div>,
										total: filteredData.length,
										defaultPageSize: 4,
										pageSizeOptions: [4, 10, 20, 30, 50, 100],
										showSizeChanger: true,
									}}
								/>
							</div>
						)}
					</div>
					<div>
						{!isLoading && (
							<div className="space-y-4 shadow-md p-4">
								<div className="text-xl font-semibold">
									Select books to entry
								</div>
								<Table
									size="large"
									columns={entryBookcolumns}
									dataSource={filterEntryBooks}
									scroll={{ x: 600, y: 3000 }}
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
					</div>
				</div>

				<div className="space-x-4 w-fit ml-auto">
					<Button size="large" type="primary" onClick={onFinish}>
						Save
					</Button>
					<Button
						size="large"
						type="primary"
						onClick={() => console.log(filterEntryBooks)}
					>
						Clear
					</Button>
				</div>
			</div>
		</div>
	);
};

export default BookEntryForm;
