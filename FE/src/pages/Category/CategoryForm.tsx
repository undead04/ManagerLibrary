import { Button, Form, Input } from "antd";
import { useParams } from "react-router-dom";

const CategoryForm = () => {
	const { id } = useParams();

	return (
		<div>
			<div className="mt-8 shadow-md w-[50%] p-6 mx-auto">
				<div className="text-3xl font-semibold mb-8">
					{id ? "Edit book " : "Add a new book"}
				</div>
				<Form wrapperCol={{ span: 14 }} layout="horizontal">
					<div className="grid grid-cols-2">
						<div>
							<Form.Item label="Category:">
								<Input />
							</Form.Item>
						</div>
					</div>

					<div className="flex items-center justify-start gap-2">
						<Form.Item>
							<Button type="primary" htmlType="submit" size="middle">
								Save
							</Button>
						</Form.Item>
						<Form.Item>
							<Button type="default" htmlType="reset" size="middle">
								Cancel
							</Button>
						</Form.Item>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default CategoryForm;
