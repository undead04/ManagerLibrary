import React, { useState } from "react";
import {
	AppstoreOutlined,
	BookOutlined,
	DesktopOutlined,
	GroupOutlined,
	HomeOutlined,
	KeyOutlined,
	MailOutlined,
	PlusCircleOutlined,
	UserOutlined,
	UsergroupAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: "group",
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
}

const items: MenuItem[] = [
	getItem(<Link to={"/home"}>Home</Link>, "home", <HomeOutlined />),
	getItem(<Link to={"/book"}>Books</Link>, "book", <BookOutlined />, [
		getItem(
			<Link to={"/book"}>Books View</Link>,
			"bookView",
			<BookOutlined />,
		),
		getItem(
			<Link to={"/book/entry"}>Book Entry</Link>,
			"bookEntry",
			<PlusCircleOutlined />,
		),
	]),
	getItem(
		<Link to={"/staff"}>Staffs</Link>,
		"staff",
		<DesktopOutlined />,
	),
	getItem(<div>Guests</div>, "guest", <UserOutlined />, [
		getItem(
			<Link to={"/guest"}>List</Link>,
			"guest",
			<GroupOutlined />,
		),
		getItem(
			<Link to={"/guest/add"}>Add a Guest</Link>,
			"addguest",
			<UsergroupAddOutlined />,
		),
	]),

	getItem(<div>Library</div>, "sub1", <MailOutlined />, [
		getItem(<Link to={"/library"}>Management</Link>, "manage"),
		getItem(
			<Link to={"/library/coupon/add"}>Borrow Service</Link>,
			"addcoupon",
		),
		getItem(<Link to={"/category"}>Category</Link>, "cate"),
	]),

	getItem(
		<Link to={"/income"}>Income</Link>,
		"income",
		<AppstoreOutlined />,
	),
	getItem(
		<Link to={"/authorization"}>Authorization</Link>,
		"authorization",
		<KeyOutlined />,
	),
];

const Sidebar: React.FC = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<Sider style={{ background: colorBgContainer }} width={200}>
			<Menu
				mode="inline"
				defaultSelectedKeys={["home"]}
				defaultOpenKeys={["sub1"]}
				style={{ height: "100%" }}
				items={items}
			/>
		</Sider>
	);
};

export default Sidebar;
