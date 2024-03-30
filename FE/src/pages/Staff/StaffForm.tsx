import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
	Button,
	Divider,
	Form,
	FormInstance,
	GetProp,
	Input,
	Radio,
	Select,
	Upload,
	UploadProps,
	message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../context/store";
import { useSelector } from "react-redux";

import {
	addStaff,
	getStaffs,
	updateStaff,
} from "../../context/Staff/staff.slice";
import { emailRegex } from "../../regex";
import { getRoles } from "../../context/Role/role.slice";

interface StaffFormProps {
	form: FormInstance;
	handleClose: () => void;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const { Password } = Input;
const getBase64 = (
	img: FileType,
	callback: (url: string) => void,
) => {
	const reader = new FileReader();
	reader.addEventListener("load", () =>
		callback(reader.result as string),
	);
	reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
	const isJpgOrPng =
		file.type === "image/jpeg" || file.type === "image/png";
	if (!isJpgOrPng) {
		message.error("You can only upload JPG/PNG file!");
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error("Image must smaller than 2MB!");
	}
	return isJpgOrPng && isLt2M;
};

const StaffForm = (props: StaffFormProps) => {
	const dispatch = useAppDispatch();
	const edittingStaff = useSelector(
		(state: RootState) => state.staff.edittingStaff,
	);

	const roles = useSelector((state: RootState) => state.role.roles);

	const roleLoading = useSelector(
		(state: RootState) => state.role.isLoading,
	);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const normFile = (e: any) => {
		if (Array.isArray(e)) {
			return e;
		}
		return e?.fileList;
	};

	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string>(
		edittingStaff?.urlAvatar ? edittingStaff.urlAvatar : "",
	);

	const handleChange: UploadProps["onChange"] = (info) => {
		// Get this url from response in real world.
		getBase64(info.file.originFileObj as FileType, (url) => {
			setLoading(false);
			setImageUrl(url);
		});
	};

	const uploadButton = (
		<button style={{ border: 0, background: "none" }} type="button">
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</button>
	);

	const onFinish = () => {
		const {
			name,
			phone,
			email,
			address,
			avatar,
			gender,
			roleId,
			password,
		} = props.form.getFieldsValue();

		if (edittingStaff?.id) {
			dispatch(
				updateStaff({
					data: {
						userName: name,
						email,
						roleId,
						password,
						phone,
						address,
						avatar,
						gender,
					},
					id: edittingStaff.id,
				}),
			)
				.unwrap()
				.then(() => {
					dispatch(getStaffs({}));
					props.handleClose();
					setImageUrl("");
					props.form.resetFields();
				})
				.catch((err) => {
					const messages = err;
					console.log(messages);

					// for (const key in messages.message) {
					// 	console.log(messages.message);
					// }
				});
		} else {
			dispatch(
				addStaff({
					userName: name,
					email,
					roleId,
					password,
					phone,
					address,
					avatar,
					gender,
				}),
			)
				.unwrap()
				.then(() => {
					dispatch(getStaffs({}));
					props.handleClose();
					setImageUrl("");
					props.form.resetFields();
				})
				.catch((err) => {
					const messages = err;
					console.log(messages);

					// for (const key in messages.message) {
					// 	console.log(messages.message);
					// }
				});
		}
	};

	useEffect(() => {
		props.form.resetFields();
		console.log(edittingStaff?.urlAvatar);

		setImageUrl(
			edittingStaff?.id
				? edittingStaff?.urlAvatar
					? edittingStaff?.urlAvatar
					: ""
				: "",
		);
	}, [edittingStaff, props.form]);

	useEffect(() => {
		dispatch(getRoles());
	}, [dispatch]);

	return (
		<div>
			<div className="mt-8">
				<Form
					form={props.form}
					onFinish={onFinish}
					layout="horizontal"
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 14 }}
				>
					<div>
						<Form.Item
							name={"name"}
							initialValue={edittingStaff?.userName}
							label="Username:"
							rules={[
								{
									required: true,
									message: "This field is required",
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							name={"email"}
							initialValue={edittingStaff?.email}
							label="Email:"
							rules={[
								{
									required: true,
									message: "This field is required",
								},
								{
									pattern: emailRegex,
									message: "Not a valid email",
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							initialValue={edittingStaff?.roleId}
							name={"roleId"}
							label="Role:"
							rules={[
								{
									required: true,
									message: "This field is required",
								},
							]}
						>
							<Select>
								{!roleLoading &&
									roles.map((c) => (
										<Select.Option key={c.id} value={c.id}>
											{c.name}
										</Select.Option>
									))}
							</Select>
						</Form.Item>

						<Form.Item
							rules={[
								{
									min: 8,
									message: "Password required at least 8 characters!",
								},
							]}
							name={"password"}
							label="Password"
						>
							<Password placeholder="At least 8 characters" />
						</Form.Item>
						<Form.Item
							name={"phone"}
							initialValue={edittingStaff?.phone}
							label="Phone Number:"
							rules={[
								{
									required: true,
									message: "This field is required",
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							name={"gender"}
							initialValue={edittingStaff?.gender}
							label="Gender"
							rules={[
								{
									required: true,
									message: "This field is required",
								},
							]}
						>
							<Radio.Group>
								<Radio value={true}> Male </Radio>
								<Radio value={false}> Female </Radio>
							</Radio.Group>
						</Form.Item>
					</div>

					<div>
						<Form.Item
							name={"address"}
							initialValue={edittingStaff?.address}
							label="Address:"
							rules={[
								{
									required: true,
									message: "This field is required",
								},
							]}
						>
							<TextArea rows={2} />
						</Form.Item>

						<Form.Item
							name={"avatar"}
							label="Avatar"
							valuePropName="fileList"
							getValueFromEvent={normFile}
						>
							<Upload
								name="avatar"
								listType="picture-card"
								className="avatar-uploader"
								showUploadList={false}
								beforeUpload={beforeUpload}
								onChange={handleChange}
							>
								{imageUrl ? (
									<img
										src={imageUrl}
										alt="avatar"
										style={{ width: "100%" }}
									/>
								) : (
									uploadButton
								)}
							</Upload>
						</Form.Item>
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

export default StaffForm;
