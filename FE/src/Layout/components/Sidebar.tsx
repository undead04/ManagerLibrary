import React, { useState } from "react";
import {
  BarChartOutlined,
  BookOutlined,
  ContainerOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  PlusCircleOutlined,
  TagOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../context/store";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
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
  getItem(<Link to={"/book"}>Books View</Link>, "isBookRead", <BookOutlined />),
  getItem(
    <Link to={"/book-entry"}>Book Entry</Link>,
    "isImportBookRead",
    <PlusCircleOutlined />
  ),
  getItem(
    <Link to={"/staff"}>Staffs</Link>,
    "isStaffRead",
    <UsergroupAddOutlined />
  ),
  getItem(<Link to={"/guest"}>Guests</Link>, "isMemberRead", <UserOutlined />),

  getItem(
    <Link to={"/library"}>Borrowing services</Link>,
    "isBorrowBookRead",
    <ContainerOutlined />
  ),
  getItem(
    <Link to={"/category"}>Category</Link>,
    "isCategoryRead",
    <MenuOutlined />
  ),
  getItem(
    <Link to={"/income"}>Statistic</Link>,
    "isIncomeRead",
    <BarChartOutlined />
  ),
  getItem(
    <Link to={"/authorization"}>Authorization</Link>,
    "isRoleRead",
    <TagOutlined />
  ),
];

const Sidebar: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const userClaims = useSelector((state: RootState) => state.auth.user?.claims);

  const newItems: MenuItem[] = items.filter((i) => {
    if (userClaims && userClaims[i?.key as keyof typeof userClaims]) {
      return true;
    }
  });
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ background: colorBgContainer }}
      width={200}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <Menu
        mode="inline"
        defaultSelectedKeys={["home"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%" }}
        items={newItems}
      />
    </Sider>
  );
};

export default Sidebar;
