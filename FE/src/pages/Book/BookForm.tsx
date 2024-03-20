import { PlusOutlined } from "@ant-design/icons";
import {
	Button,
	Checkbox,
	Form,
	Input,
	InputNumber,
	Radio,
	Select,
	Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { useParams } from "react-router-dom";

const BookForm = () => {
	const { id } = useParams();
	const normFile = (e: any) => {
		if (Array.isArray(e)) {
			return e;
		}
		return e?.fileList;
	};

	return (
		<div>
			<div className="text-3xl font-semibold my-2">
				{id ? "Edit book " : "Add a new book"}
			</div>

			<div className="mt-8">
				<Form
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 20 }}
					layout="horizontal"
				>
					<div className="">
						<div>
							<Form.Item label="Title:">
								<Input />
							</Form.Item>
							<Form.Item label="ISBN id:">
								<Input />
							</Form.Item>
							<Form.Item label="Category:">
								<Select>
									<Select.Option value="demo">Demo</Select.Option>
									<Select.Option value="demo1">Demo1</Select.Option>
									<Select.Option value="demo2">Demo2</Select.Option>
									<Select.Option value="demo3">Demo3</Select.Option>
								</Select>
							</Form.Item>

							<Form.Item label="Author:">
								<Input />
							</Form.Item>
							<Form.Item
								label="Images"
								valuePropName="fileList"
								getValueFromEvent={normFile}
							>
								<Upload action="/upload.do" listType="picture-card">
									<button
										style={{ border: 0, background: "none" }}
										type="button"
									>
										<PlusOutlined />
										<div style={{ marginTop: 8 }}>Upload</div>
									</button>
								</Upload>
							</Form.Item>
						</div>

						<div>
							<Form.Item label="Amount">
								<InputNumber />
							</Form.Item>

							<Form.Item label="Price">
								<InputNumber />
							</Form.Item>

							<Form.Item label="Publish year:">
								<Select>
									<Select.Option value="2000">2000</Select.Option>
									<Select.Option value="2001">2001</Select.Option>
									<Select.Option value="2002">2002</Select.Option>
									<Select.Option value="2003">2003</Select.Option>
								</Select>
							</Form.Item>

							<Form.Item label="Description">
								<TextArea rows={4} />
							</Form.Item>
						</div>
					</div>

					<div className="flex items-center justify-center gap-2">
						<Form.Item>
							<Button type="primary" htmlType="submit" size="large">
								Save
							</Button>
						</Form.Item>
						<Form.Item>
							<Button type="default" htmlType="reset" size="large">
								Cancel
							</Button>
						</Form.Item>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default BookForm;
