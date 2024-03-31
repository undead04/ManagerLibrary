import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { Button, Flex, Layout, Tag, Tooltip, theme } from "antd";
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

	const email = useSelector(
		(state: RootState) => state.auth.user?.email,
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
							<Flex align="center" justify="flex-end" gap={8}>
								{email && (
									<Tag
										color="#2db7f5"
										className="px-3 py-2 min-w-[60px] text-center font-semibold text-sm mb-8"
									>
										{email.split("@")[0]}
									</Tag>
								)}
								<Tooltip title="Logout">
									<Button
										size="large"
										className="mb-8 p-3 flex items-center"
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
