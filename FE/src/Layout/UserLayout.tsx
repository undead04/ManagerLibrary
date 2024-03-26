import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { Breadcrumb, Button, Flex, Layout, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../context/store";
import { authLogout } from "../context/Auth/auth.slice";

const UserLayout = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const token = useSelector(
		(state: RootState) => state.auth.user?.token,
	);

	useEffect(() => {
		if (!token) {
			navigate("/login");
		}
	}, [token, navigate]);

	const handleLogout = () => {
		dispatch(authLogout());
		navigate("/login");
		toast.success("Logged out!", {
			delay: 300,
			position: "bottom-right",
		});
	};
	return (
		<>
			<ToastContainer />
			<div>
				<Content style={{ padding: "0 48px" }}>
					<Layout
						style={{
							padding: "24px 0",
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}
					>
						<Sidebar />

						<Content style={{ padding: "0 24px", minHeight: 280 }}>
							<Flex align="center" justify="space-between">
								<Breadcrumb style={{ margin: "16px 0" }}>
									<Breadcrumb.Item>Home</Breadcrumb.Item>
									<Breadcrumb.Item>List</Breadcrumb.Item>
									<Breadcrumb.Item>App</Breadcrumb.Item>
								</Breadcrumb>

								<Button
									className="ml-auto block"
									onClick={handleLogout}
									type="primary"
								>
									Log out
								</Button>
							</Flex>
							<Outlet />
						</Content>
					</Layout>
				</Content>
			</div>
		</>
	);
};

export default UserLayout;
