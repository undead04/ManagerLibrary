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

const StaffForm = () => {
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
				{id ? "Edit Staff " : "Add a new Staff"}
			</div>

			<div className="mt-8">
				<Form
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 14 }}
					layout="horizontal"
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
							<Form.Item label="Roles:">
								<Select
									mode="multiple"
									defaultValue={["librarian"]}
									placeholder="Outlined"
									style={{ flex: 1 }}
									options={[
										{ value: "admin", label: "Admin" },
										{ value: "supadmin", label: "supadmin" },
										{ value: "librarian", label: "librarian" },
									]}
								/>
							</Form.Item>

							<Form.Item label="Gender">
								<Radio.Group>
									<Radio value={true}> Male </Radio>
									<Radio value={false}> Female </Radio>
								</Radio.Group>
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

					<div className="flex gap-4 justify-end">
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

export default StaffForm;
