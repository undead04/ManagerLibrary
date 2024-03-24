import { Button, Form, Input } from "antd";
import { FormInstance } from "antd/es/form/Form";
import { RootState, useAppDispatch } from "../../context/store";
import {
	addCategory,
	getCategorys,
	updateCategory,
} from "../../context/Category/category.slice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const CategoryForm = ({
	form,
	handleClose,
}: {
	form: FormInstance;
	handleClose: () => void;
}) => {
	const dispatch = useAppDispatch();
	const isLoading = useSelector(
		(state: RootState) => state.category.isLoading,
	);

	const edittingCategory = useSelector(
		(state: RootState) => state.category.edittingCategory,
	);

	const onFinish = () => {
		const { name, description } = form.getFieldsValue();

		if (edittingCategory?.categoryId) {
			dispatch(
				updateCategory({
					id: edittingCategory.categoryId,
					data: { description, name },
				}),
			)
				.unwrap()
				.then(() => {
					dispatch(getCategorys({}));
					handleClose();
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			dispatch(addCategory({ name, description }))
				.then(() => {
					dispatch(getCategorys({}));
				})
				.then(() => {
					handleClose();
				});
		}
		form.resetFields();
	};

	useEffect(() => {
		form.resetFields();
		if (edittingCategory) {
			// Xóa các giá trị trường cũ
			// Cập nhật giá trị các trường mới
			form.setFieldsValue({
				name: edittingCategory.name,
				description: edittingCategory.description,
			});
		}
	}, [edittingCategory]);

	return (
		<>
			{!isLoading && (
				<>
					<div>
						<div className="text-3xl font-semibold mb-8">
							{edittingCategory?.categoryId
								? `Edit Category ${edittingCategory?.categoryId} `
								: "Add a new Category"}
						</div>
						<Form
							onFinish={onFinish}
							form={form}
							layout="horizontal"
							labelCol={{ span: 4 }}
							wrapperCol={{ span: 20 }}
						>
							<Form.Item
								initialValue={edittingCategory?.name}
								name={"name"}
								label="Category name:"
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
								rules={[
									{
										required: true,
										message: "This field is required",
									},
								]}
								initialValue={edittingCategory?.description}
								name={"description"}
								label="Description:"
							>
								<Input />
							</Form.Item>

							<div className="flex items-center justify-end gap-2">
								<Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										size="middle"
									>
										Save
									</Button>
								</Form.Item>
								<Form.Item>
									<Button
										onClick={handleClose}
										type="default"
										size="middle"
									>
										Cancel
									</Button>
								</Form.Item>
							</div>
						</Form>
					</div>
				</>
			)}
		</>
	);
};

export default CategoryForm;
