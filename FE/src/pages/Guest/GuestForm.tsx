import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
	Button,
	Divider,
	Form,
	FormInstance,
	GetProp,
	Input,
	Radio,
	Upload,
	UploadProps,
	message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../context/store";
import { useSelector } from "react-redux";
import {
	addGuest,
	getGuests,
	updateGuest,
} from "../../context/Guest/guest.slice";

interface GuestFormProps {
	form: FormInstance;
	handleClose: () => void;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

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

const GuestForm = (props: GuestFormProps) => {
	const dispatch = useAppDispatch();
	const edittingGuest = useSelector(
		(state: RootState) => state.guest.edittingGuest,
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
		edittingGuest?.urlImage ? edittingGuest.urlImage : "",
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
		const { name, phone, address, avatar, gender } =
			props.form.getFieldsValue();

		if (edittingGuest?.id) {
			dispatch(
				updateGuest({
					data: {
						name,
						phone,
						address,
						avatar,
						gender,
					},
					id: edittingGuest.id,
				}),
			)
				.unwrap()
				.then(() => {
					dispatch(getGuests({}));
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
				addGuest({
					name,
					phone,
					address,
					avatar,
					gender,
				}),
			)
				.unwrap()
				.then(() => {
					dispatch(getGuests({}));
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
		console.log(edittingGuest?.urlImage);

		setImageUrl(
			edittingGuest?.id
				? edittingGuest?.urlImage
					? edittingGuest?.urlImage
					: ""
				: "",
		);
	}, [edittingGuest, props.form]);

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
							initialValue={edittingGuest?.name}
							label="Username:"
						>
							<Input />
						</Form.Item>

						<Form.Item
							name={"phone"}
							initialValue={edittingGuest?.phone}
							label="Phone Number:"
						>
							<Input />
						</Form.Item>

						<Form.Item
							name={"gender"}
							initialValue={edittingGuest?.gender}
							label="Gender"
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
							initialValue={edittingGuest?.address}
							label="Address:"
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

export default GuestForm;
