import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Descriptions, Divider, Image } from "antd";
import React from "react";

const CouponDetail = () => {
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
				<Descriptions title="Book Info">
					<Descriptions.Item label="Image">
						<Image.PreviewGroup
							items={[
								"https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
								"https://images.unsplash.com/photo-1585785673770-f16d239b825a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
								"https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
							]}
						>
							<Image
								width={200}
								src="https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							/>
						</Image.PreviewGroup>
					</Descriptions.Item>
					<Descriptions.Item label="Title">
						Book of wishdom
					</Descriptions.Item>
					<Descriptions.Item label="ISBN ID">
						1810000000
					</Descriptions.Item>
					<Descriptions.Item label="Author">
						Bing ChiLing
					</Descriptions.Item>
					<Descriptions.Item label="Publish year">
						2001
					</Descriptions.Item>

					<Descriptions.Item label="Descrition">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Incidunt nesciunt sequi voluptatibus recusandae impedit
						cupiditate voluptatem quia excepturi asperiores porro.
					</Descriptions.Item>
					<Descriptions.Item label="Price">
						2.000VND
					</Descriptions.Item>
				</Descriptions>

				<Divider />
				<Descriptions title="Guest Info">
					<Descriptions.Item label="Image">
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
						0134679123
					</Descriptions.Item>
					<Descriptions.Item label="Email">
						Maomao@gmail.com
					</Descriptions.Item>
					<Descriptions.Item label="Gender">Female</Descriptions.Item>
				</Descriptions>
			</div>
		</div>
	);
};

export default CouponDetail;

// works when >= 5.8.0, recommended ✅
