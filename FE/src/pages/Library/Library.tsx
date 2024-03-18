import React, { useState } from "react";
import { Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface DataType {
	key: React.Key;
	username: string;
	title: string;
	borrowAt: string;
	state: number;
}

const columns: TableColumnsType<DataType> = [
	{
		title: "Username",
		dataIndex: "username",
	},
	{
		title: "Book title",
		dataIndex: "title",
	},
	{
		title: "Borrow At",
		dataIndex: "borrowAt",
	},
	{
		title: "State",
		dataIndex: "state",
		render: (state: number) => {
			switch (state) {
				case 0:
					return (
						<div className="flex items-center gap-2 ">
							<div className="w-2 h-2 bg-green-500 rounded-full"></div>
							<div>Return</div>
						</div>
					);
					break;
				case 1:
					return (
						<div className="flex items-center gap-2 ">
							<div className="w-2 h-2 bg-red-500 rounded-full"></div>
							<div>Not return</div>
						</div>
					);

				default:
					break;
			}
		},
	},
	{
		title: "",
		dataIndex: "key",
		render: (id: string) => {
			return (
				<Link
					className="text-blue-500 underline"
					to={`/Library/d/${id} `}
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
					to={`/Library/edit/${id} `}
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
					to={`/Library/delete/${id} `}
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
		username: `Library ${i}`,
		title: `Books ${i}`,
		borrowAt: `6/3/2024 12:00:${i}`,
		state: i % 2 == 0 ? 0 : 1,
	});
}

const Library = () => {
	const navigate = useNavigate();
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>(
		[],
	);
	const [loading, setLoading] = useState(false);

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

	return (
		<div>
			<div className="text-3xl font-semibold my-2">
				Library - Dashboard
			</div>

			<div style={{ marginBottom: 16 }}>
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

export default Library;
