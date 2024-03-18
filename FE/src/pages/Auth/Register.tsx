import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const onFinish = (values: any) => {
	console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
	console.log("Failed:", errorInfo);
};

type FieldType = {
	username?: string;
	password?: string;
	remember?: string;
};

const Register = () => {
	return (
		<div className="p-12 rounded-xl shadow-lg">
			<div className="pt-4 pb-2">
				<h5 className="text-center pb-2 text-4xl">Register</h5>
			</div>

			<div className="mt-8">
				<Form
					name="basic"
					labelCol={{ span: 10 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item<FieldType>
						label={<span className="text-base">Username</span>}
						name="username"
						rules={[
							{
								required: true,
								message: "Please input your username!",
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item<FieldType>
						label={<span className="text-base">Email</span>}
						name="username"
						rules={[
							{
								required: true,
								message: "Please input your username!",
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item<FieldType>
						label={<span className="text-base">Password</span>}
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your password!",
							},
						]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item
						label={
							<span className="text-base">Confirm password</span>
						}
						name="passwordConfirm"
						rules={[
							{
								required: true,
								message: "Please input your password!",
							},
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item<FieldType>
						name="remember"
						valuePropName="checked"
						wrapperCol={{ offset: 10, span: 16 }}
					>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 10, span: 16 }}>
						<Button
							className="bg-blue-500 text-white"
							htmlType="submit"
						>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</div>
			<p className="text-center text-md">
				Already hava an account?{" "}
				<Link className="text-blue-500 hover:underline" to={"/login"}>
					Login
				</Link>
			</p>
		</div>
	);
};

export default Register;
