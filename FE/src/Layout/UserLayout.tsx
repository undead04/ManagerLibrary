import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { Button, Flex, Layout, Tooltip, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../context/store";
import { authLogout } from "../context/Auth/auth.slice";
import { PoweroffOutlined } from "@ant-design/icons";
import Footer from "./components/Footer";

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
			<div className="overflow-hidden">
				<Content style={{ padding: "0 48px", minHeight: "100vh" }}>
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
								<Tooltip title="Logout">
									<Button
										size="large"
										className="ml-auto mb-8 p-3 flex items-center"
										onClick={handleLogout}
										type="primary"
									>
										<PoweroffOutlined />
									</Button>
								</Tooltip>
							</Flex>
							<Outlet />
						</Content>
					</Layout>
				</Content>
			</div>

			<Footer />
		</>
	);
};

export default UserLayout;
