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

const Login = () => {
	return (
		<div className="p-12 rounded-xl shadow-lg">
			<div className="pt-4 pb-2">
				<h5 className="text-center pb-2 text-4xl">Login</h5>
				<p className="text-center text-md">
					Enter your username & password to login
				</p>
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
				<p className="text-center text-md">
					Not have an account?{" "}
					<Link
						className="text-blue-500 hover:underline"
						to={"/register"}
					>
						Register
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
