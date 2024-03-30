import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useAppDispatch } from "../../context/store";
import { authLogin } from "../../context/Auth/auth.slice";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onFinishFailed = (errorInfo: any) => {
	console.log("Failed:", errorInfo);
};

type FieldType = {
	email?: string;
	password?: string;
};

const Login = () => {
	const [form] = useForm();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const onFinish = () => {
		const { email, password } = form.getFieldsValue();
		dispatch(authLogin({ email, password }))
			.unwrap()
			.then(() => {
				navigate("/home");
			});
	};
	return (
		<div className="p-12 rounded-xl shadow-lg w-[700px]">
			<div className="pt-4 pb-2 space-y-2">
				<h5 className="text-center pb-2 text-4xl font-serif">
					Login
				</h5>
				<img src="/login-face.jpeg" className="w-[200px] mx-auto" />
				<p className="text-center text-md font-serif italic">
					Enter your email & password to login
				</p>
			</div>

			<div className="mt-8">
				<Form
					form={form}
					name="basic"
					layout="vertical"
					style={{ maxWidth: 600 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item<FieldType>
						label={<span className="text-base">Email</span>}
						name="email"
						rules={[
							{
								required: true,
								message: "Please input your username!",
							},
						]}
					>
						<Input size="large" />
					</Form.Item>

					<Form.Item<FieldType>
						label={<span className="text-base">Password</span>}
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your password!",
							},
							{
								min: 8,
								message: "Password required at least 8 characters",
							},
						]}
					>
						<Input.Password size="large" />
					</Form.Item>

					<Form.Item className="w-fit mx-auto mt-10">
						<Button
							className="bg-blue-500 text-white w-[200px]"
							htmlType="submit"
							size="large"
						>
							Login
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default Login;
