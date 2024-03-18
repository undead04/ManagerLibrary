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

const AuthorizationForm = () => {
	const { id } = useParams();
	const normFile = (e: any) => {
		if (Array.isArray(e)) {
			return e;
		}
		return e?.fileList;
	};

	const plainOptions = ["Xem", "Thêm, Sửa", "Xóa"];

	return (
		<div>
			<div className="text-3xl font-semibold my-2">
				{id ? "Edit role " : "Add a new role"}
			</div>

			<div className="mt-8">
				<Form
					layout="horizontal"
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 20 }}
					labelAlign="left"
				>
					<div className="mb-4">
						<div>
							<Form.Item
								label={
									<div className="font-semibold text-lg">Name</div>
								}
							>
								<Input />
							</Form.Item>

							<Divider />

							<div className="font-semibold text-lg">Roles:</div>

							<Divider />

							<div className="flex flex-col gap-y-8">
								<div>
									<Form.Item
										label={
											<div className="font-semibold text-sm">
												Books
											</div>
										}
									>
										<Checkbox.Group options={plainOptions} />
									</Form.Item>
								</div>
								<div>
									<Form.Item
										label={
											<div className="font-semibold text-sm">
												Staffs
											</div>
										}
									>
										<Checkbox.Group options={plainOptions} />
									</Form.Item>
								</div>
								<div>
									<Form.Item
										label={
											<div className="font-semibold text-sm">
												Guests
											</div>
										}
									>
										<Checkbox.Group options={plainOptions} />
									</Form.Item>
								</div>
								<div>
									<Form.Item
										label={
											<div className="font-semibold text-sm">
												Borrow coupon
											</div>
										}
									>
										<Checkbox.Group options={plainOptions} />
									</Form.Item>
								</div>

								<div>
									<Form.Item
										label={
											<div className="font-semibold text-sm">
												Income
											</div>
										}
									>
										<Checkbox.Group options={plainOptions} />
									</Form.Item>
								</div>
								<div>
									<Form.Item
										label={
											<div className="font-semibold text-sm">
												Categories
											</div>
										}
									>
										<Checkbox.Group options={plainOptions} />
									</Form.Item>
								</div>
							</div>
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

export default AuthorizationForm;
