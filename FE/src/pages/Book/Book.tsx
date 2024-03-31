import React, { useEffect, useState } from "react";
import {
	Alert,
	Button,
	Image,
	Input,
	Modal,
	Spin,
	Table,
} from "antd";
import type { TableColumnsType } from "antd";
import { Link } from "react-router-dom";
import {
	DeleteOutlined,
	EditOutlined,
	EyeOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons";

import type { SearchProps } from "antd/es/input/Search";
import BookForm from "./BookForm";
import { RootState, useAppDispatch } from "../../context/store";
import {
	cancelEdittingBook,
	getBook,
	getBooks,
	removeBook,
	startEdittingBook,
} from "../../context/Book/book.slice";
import { useSelector } from "react-redux";
import { IBook } from "../../type/book.type";
import { formatCurrency } from "../../utils/formatCurrency";
import { useForm } from "antd/es/form/Form";

const { Search } = Input;

interface IBookExtend extends IBook {
	key: React.Key;
	index: number;
}

const Book = () => {
	const dispatch = useAppDispatch();
	const books = useSelector(
		(state: RootState) => state.book.booksDetail,
	);

	const edittingBook = useSelector(
		(state: RootState) => state.book.edittingBook,
	);
	const isLoading = useSelector(
		(state: RootState) => state.book.isLoading,
	);

	const claims = useSelector(
		(state: RootState) => state.auth.user?.claims,
	);

	const filteredData: IBookExtend[] = books.map((b, index) => {
		return {
			...b,
			key: b.id,
			index: index + 1,
		};
	});

	// Form
	const [form] = useForm();
	// Modal
	const [open, setOpen] = useState(false);
	const showModal = () => {
		setOpen(true);
	};

	const hideModal = () => {
		setOpen(false);
		dispatch(cancelEdittingBook());
	};
	const reload = () => {
		dispatch(getBooks({}));
	};

	useEffect(() => {
		dispatch(getBooks({}));
	}, [dispatch]);

	const handleStartEdit = (id: string) => {
		dispatch(getBook(id))
			.unwrap()
			.then((res) => {
				if (res) {
					dispatch(startEdittingBook(res));
				}
			});
		setOpen(true);
	};

	const [deleteId, setDeleteId] = useState<string>();
	const [openDelete, setOpenDelete] = useState(false);
	const handleDelete = (id: string) => {
		dispatch(removeBook({ id }))
			.unwrap()
			.then(() => {
				dispatch(getBooks({}));
			})
			.catch((err) => {
				console.log(err);
			});
		setOpenDelete(false);
	};

	const handleStartDelete = (id: string) => {
		setDeleteId(id);
		setOpenDelete(true);
	};

	const handleCancelDelete = () => {
		setOpenDelete(false);
		setDeleteId("");
	};

	const columns: TableColumnsType<IBookExtend> = [
		{
			title: "STT",
			dataIndex: "index",
			align: "center",
		},
		{
			title: "Image",
			dataIndex: "urlImage",
			align: "center",
			render: (url: string, item) => {
				return (
					<div className="mx-auto w-fit">
						{url && (
							<img
								className="w-[40px] aspect-square object-fill rounded-full"
								alt={item.title}
								src={url}
							/>
						)}
						{!url && (
							<img
								className="w-[40px] aspect-square object-fill rounded-full"
								alt={item.title}
								src={"/login-face.jpeg"}
							/>
						)}
					</div>
				);
			},
		},
		{
			title: "ISBN Id",
			dataIndex: "isbn",
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
		},
		{
			title: "Category",
			dataIndex: "nameCategory",
		},
		{
			title: "Price",
			dataIndex: "price",
			render: (price: number) => {
				return <div>{formatCurrency(price)}</div>;
			},
			sorter: (a, b) => a.price - b.price,
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
							disabled={!claims?.isBookEditAndCreate}
							onClick={() => handleStartEdit(id)}
							className="text-blue-500 underline p-0 aspect-square flex items-center justify-center"
						>
							<EditOutlined />
						</Button>
						<Button
							disabled={!claims?.isBookDelete}
							className="text-red-500 underline p-0 aspect-square flex items-center justify-center"
							onClick={() => handleStartDelete(id)}
						>
							<DeleteOutlined />
						</Button>
					</div>
				);
			},
		},
	];

	const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
		dispatch(getBooks({ q: value }));
		console.log(info?.source, value);
	};

	return (
		<div>
			<Modal
				title="Delete a category"
				open={openDelete}
				onOk={() => {
					if (deleteId) {
						handleDelete(deleteId);
					}
				}}
				onCancel={handleCancelDelete}
			>
				<p>This action will not allow redo. Confirm deletion?</p>
			</Modal>
			<Modal
				title={
					<div className="text-3xl font-semibold my-2 bg-blue-500 mx-8 py-2 text-white text-center">
						{edittingBook?.id ? "Edit book " : "Add a new book"}
					</div>
				}
				width={800}
				open={open}
				onOk={hideModal}
				onCancel={hideModal}
				footer={null}
			>
				<BookForm form={form} handleClose={hideModal} />
			</Modal>

			<h4 className="text-3xl bg-blue-600 py-4 text-white font-semibold mb-4 text-center rounded-sm">
				Books - List
			</h4>

			<div className="mb-4 flex items-center justify-between">
				<div>
					<Button
						size="large"
						type="primary"
						disabled={isLoading}
						loading={isLoading}
						onClick={reload}
					>
						Reload
					</Button>
				</div>

				<div>
					<Button
						disabled={!claims?.isBookEditAndCreate}
						size="large"
						type="primary"
						icon={<PlusCircleOutlined />}
						onClick={showModal}
					>
						Add
					</Button>
				</div>
			</div>
			<div className="mb-4">
				<Search
					size="large"
					placeholder="Search for books"
					onSearch={onSearch}
					enterButton
				/>
			</div>
			{!isLoading && (
				<Table
					size="large"
					pagination={{
						position: ["bottomRight"],
						showSizeChanger: true,
						pageSizeOptions: [4, 8, 16, 32, 64, 128, 256],
					}}
					columns={columns}
					dataSource={filteredData}
				/>
			)}

			{isLoading && (
				<div className="w-[50%] my-8 mx-auto">
					<Spin tip={"Loading"} spinning={true}>
						<Alert
							type="info"
							message="Loading data"
							description="Data is loading. Please wait..."
						/>
					</Spin>
				</div>
			)}
		</div>
	);
};

export default Book;
