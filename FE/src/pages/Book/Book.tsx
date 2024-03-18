import React, { useState } from "react";
import { Button, Input, Modal, Space, Table } from "antd";
import type { TableColumnsType } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
	DeleteOutlined,
	EditOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons";

import type { SearchProps } from "antd/es/input/Search";
import BookForm from "./BookForm";

const { Search } = Input;

interface DataType {
	key: React.Key;
	title: string;
	author: string;
	publishYear: string;
	price: string;
}

const columns: TableColumnsType<DataType> = [
	{
		title: "Title",
		dataIndex: "title",
	},
	{
		title: "Author",
		dataIndex: "author",
	},

	{
		title: "Publish year",
		dataIndex: "publishYear",
	},
	{
		title: "",
		dataIndex: "key",
		render: (id: string) => {
			return (
				<Link
					className="text-blue-500 underline"
					to={`/book/d/${id} `}
				>
					Details
				</Link>
			);
		},
	},
	{
		title: "",
		dataIndex: "key",
		render: (id: string) => {
			return (
				<Link
					className="text-blue-500 underline"
					to={`/book/edit/${id} `}
				>
					<EditOutlined />
				</Link>
			);
		},
	},
	{
		title: "",
		dataIndex: "key",
		render: (id: string) => {
			return (
				<Link
					className="text-red-500 underline"
					to={`/book/delete/${id} `}
				>
					<DeleteOutlined />
				</Link>
			);
		},
	},
];

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
	data.push({
		key: i,
		title: `Edward King ${i}`,
		author: `Author ${i}`,
		publishYear: `200${i}`,
		price: ` ${i}`,
	});
}

const Book = () => {
	const navigate = useNavigate();
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>(
		[],
	);
	const [loading, setLoading] = useState(false);
	// Modal
	const [open, setOpen] = useState(false);
	const showModal = () => {
		setOpen(true);
	};

	const hideModal = () => {
		setOpen(false);
	};
	const start = () => {
		setLoading(true);
		// ajax request after empty completing
		setTimeout(() => {
			setSelectedRowKeys([]);
			setLoading(false);
		}, 1000);
	};

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		console.log("selectedRowKeys changed: ", newSelectedRowKeys);
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	};
	const hasSelected = selectedRowKeys.length > 0;
	const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
		console.log(info?.source, value);

	return (
		<div>
			<Modal
				width={800}
				open={open}
				onOk={hideModal}
				onCancel={hideModal}
				footer={null}
			>
				<BookForm />
			</Modal>

			<div className="text-3xl font-semibold my-2">Books - List</div>

			<div className="mb-4 flex items-center justify-between">
				<div>
					<Button
						type="primary"
						onClick={start}
						disabled={!hasSelected}
						loading={loading}
					>
						Reload
					</Button>
					<span style={{ marginLeft: 8 }}>
						{hasSelected
							? `Selected ${selectedRowKeys.length} items`
							: ""}
					</span>
				</div>

				<div>
					<Button
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
					placeholder="input search text"
					onSearch={onSearch}
					enterButton
				/>
			</div>
			<Table
				onRow={(book) => {
					return {
						onDoubleClick: (event) => {
							event.preventDefault();
							navigate(`/book/d/${book.key}`);
						},
					};
				}}
				rowSelection={rowSelection}
				columns={columns}
				dataSource={data}
			/>
		</div>
	);
};

export default Book;
