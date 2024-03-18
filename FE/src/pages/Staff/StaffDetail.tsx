import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Descriptions, Image } from "antd";
import React from "react";

const StaffDetail = () => {
	return (
		<div>
			<div className="ml-auto w-fit flex items-center gap-2">
				<Button
					type="primary"
					icon={<EditOutlined />}
					size={"middle"}
				>
					Edit
				</Button>
				<Button
					type="primary"
					danger
					icon={<DeleteOutlined />}
					size={"middle"}
				>
					Delete
				</Button>
			</div>
			<div>
				<Descriptions title="Staff Info">
					<Descriptions.Item label="Avatar">
						<Image.PreviewGroup
							items={[
								"https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
							]}
						>
							<Image
								width={200}
								src="https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							/>
						</Image.PreviewGroup>
					</Descriptions.Item>
					<Descriptions.Item label="Username">
						Zhou Maomao
					</Descriptions.Item>
					<Descriptions.Item label="Phone number">
						1810000000
					</Descriptions.Item>
					<Descriptions.Item label="Email">
						Maomao@gmail.com
					</Descriptions.Item>
					<Descriptions.Item label="Gender">Female</Descriptions.Item>
					<Descriptions.Item label="Role">
						Librarian
					</Descriptions.Item>
					<Descriptions.Item label="Address">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit.
						Corrupti, maiores.
					</Descriptions.Item>
				</Descriptions>
			</div>
		</div>
	);
};

export default StaffDetail;

// works when >= 5.8.0, recommended ✅
