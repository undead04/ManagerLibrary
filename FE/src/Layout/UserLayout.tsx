import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { Breadcrumb, Layout, theme } from "antd";
import { Content } from "antd/es/layout/layout";

const UserLayout = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	return (
		<div>
			<Content style={{ padding: "0 48px" }}>
				<Breadcrumb style={{ margin: "16px 0" }}>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>List</Breadcrumb.Item>
					<Breadcrumb.Item>App</Breadcrumb.Item>
				</Breadcrumb>
				<Layout
					style={{
						padding: "24px 0",
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
					}}
				>
					<Sidebar />
					<Content style={{ padding: "0 24px", minHeight: 280 }}>
						<Outlet />
					</Content>
				</Layout>
			</Content>
		</div>
	);
};

export default UserLayout;
