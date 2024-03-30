import {
	DeleteOutlined,
	EditOutlined,
	StopOutlined,
} from "@ant-design/icons";
import React from "react";
import { Button, Table, Descriptions, Divider, Image } from "antd";
import type { TableColumnsType } from "antd";
import { Link, useNavigate } from "react-router-dom";

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
		title: "Borrow at",
		render: () => "6/2/2004 12:00:04",
	},
	{
		title: "State",
		render: () => (
			<div className="flex gap-1 items-center">
				<div className="w-2 h-2 rounded-full bg-green-500"></div>
				<div>Returned</div>
			</div>
		),
	},
	{
		title: "",
		dataIndex: "key",
		render: (id: string) => {
			return (
				<Link
					className="text-blue-500 underline"
					to={`/library/coupon/d/${id} `}
				>
					Details
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

const GuessDetail = () => {
	const navigate = useNavigate();
	return (
		<div>
			<div className="ml-auto w-fit mb-4">
				<Button
					type="primary"
					icon={<StopOutlined />}
					size={"middle"}
					danger
				>
					Ban / Unban
				</Button>
			</div>
			<div className="ml-auto w-fit flex items-center gap-2">
				<Button
					type="primary"
					icon={<EditOutlined />}
					size={"middle"}
				>
					Edit
				</Button>
				<Button
					type="primary"
					danger
					icon={<DeleteOutlined />}
					size={"middle"}
				>
					Delete
				</Button>
			</div>
			<div>
				<Descriptions title="Guest Info">
					<Descriptions.Item label="Avatar">
						<Image.PreviewGroup
							items={[
								"https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
							]}
						>
							<Image
								width={200}
								src="https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							/>
						</Image.PreviewGroup>
					</Descriptions.Item>
					<Descriptions.Item label="Username">
						Zhou Maomao
					</Descriptions.Item>
					<Descriptions.Item label="Phone number">
						1810000000
					</Descriptions.Item>
					<Descriptions.Item label="Email">
						Maomao@gmail.com
					</Descriptions.Item>
					<Descriptions.Item label="Gender">Female</Descriptions.Item>
					<Descriptions.Item label="Address">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit.
						Corrupti, maiores.
					</Descriptions.Item>
				</Descriptions>
			</div>
			<Divider />
			<div className="text-xl my-4">Borrow book history:</div>
			<Table
				onRow={(book) => {
					return {
						onDoubleClick: (event) => {
							event.preventDefault();
							navigate(`/book/d/${book.key}`);
						},
					};
				}}
				columns={columns}
				dataSource={data}
			/>
		</div>
	);
};

export default GuessDetail;

// works when >= 5.8.0, recommended ✅
