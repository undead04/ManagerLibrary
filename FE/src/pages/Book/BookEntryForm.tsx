import {
	DeleteOutlined,
	EditOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import {
	Button,
	Checkbox,
	Form,
	Input,
	InputNumber,
	Radio,
	Select,
	Table,
	Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

interface DataType {
	key: React.Key;
	title: string;
	count: number;
	price: number;
}

const columns: TableColumnsType<DataType> = [
	{
		title: "Title",
		dataIndex: "title",
	},

	{
		title: "Price",
		dataIndex: "price",
	},
	{
		title: "Amount",
		dataIndex: "count",
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

		count: 100,
		price: 1000,
	});
}

const BookEntryForm = () => {
	const { id } = useParams();
	const [entryBooks, setEntryBooks] = useState();
	return (
		<div>
			<div className="text-3xl font-semibold my-2">
				{id ? "Edit book " : "Book entry"}
			</div>

			<div className="mt-8">
				<Form
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 20 }}
					layout="horizontal"
					labelAlign="left"
				>
					<div className="">
						<div>
							<Form.Item label="Select books:">
								<Select>
									<Select.Option value="demo">Book </Select.Option>
									<Select.Option value="demo1">Book 1</Select.Option>
									<Select.Option value="demo2">Book 2</Select.Option>
									<Select.Option value="demo3">Book 3</Select.Option>
								</Select>
							</Form.Item>
						</div>

						<div>
							<Form.Item label="Amount">
								<InputNumber />
							</Form.Item>

							<Form.Item label="Price">
								<InputNumber />
							</Form.Item>
						</div>
					</div>

					<div className="flex items-center justify-end gap-2">
						<Form.Item>
							<Button type="primary" htmlType="submit" size="large">
								Add
							</Button>
						</Form.Item>
					</div>
				</Form>

				<div>
					<Table columns={columns} dataSource={data} />
					<div className="mx-auto w-fit flex items-center gap-2">
						<Form.Item>
							<Button type="primary" htmlType="reset" size="large">
								Save
							</Button>
						</Form.Item>
						<Form.Item>
							<Button type="default" htmlType="reset" size="large">
								Cancel
							</Button>
						</Form.Item>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookEntryForm;
