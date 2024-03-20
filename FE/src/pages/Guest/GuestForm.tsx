import { PlusOutlined } from "@ant-design/icons";
import {
	Button,
	Checkbox,
	Divider,
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

const GuestForm = () => {
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
				{id ? "Edit Guest " : "Add a new Guest"}
			</div>

			<div className="mt-8">
				<Form
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 20 }}
					layout="vertical"
				>
					<div className="grid grid-cols-2">
						<div>
							<Form.Item label="Username:">
								<Input />
							</Form.Item>
							<Form.Item label="Email:">
								<Input />
							</Form.Item>
							<Form.Item label="Phone Number:">
								<Input />
							</Form.Item>

							<Form.Item label="Gender">
								<Radio.Group>
									<Radio value={true}> Male </Radio>
									<Radio value={false}> Female </Radio>
								</Radio.Group>
							</Form.Item>
						</div>

						<div>
							<Form.Item label="Address:">
								<Input />
							</Form.Item>
							<Form.Item label="ID number:">
								<Input />
							</Form.Item>
							<Form.Item label="Nationality:">
								<Select>
									<Select.Option>VietNam</Select.Option>
									<Select.Option>Japan</Select.Option>
									<Select.Option>China</Select.Option>
								</Select>
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
					</div>
					<Divider />
					<div className="flex gap-4 justify-center">
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

export default GuestForm;
