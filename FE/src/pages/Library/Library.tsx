import { Tabs } from "antd";

import NoReturnCouponList from "./NoReturnCouponList";
import BorrowHistory from "./BorrowHistory";
import CouponAdd from "./Coupon/CouponAdd";
import { useSelector } from "react-redux";
import { RootState } from "../../context/store";

const Library = () => {
	const authRole = useSelector(
		(state: RootState) => state.auth.user?.claims,
	);
	const items = [
		{
			label: "View unpaid coupon",
			key: "isBorrowBookRead",
			authorizeKey: "isBorrowBookRead",
			children: <NoReturnCouponList />,
		},
		{
			label: "View borrow coupon history",
			key: "isBorrowBookReadHistory",
			authorizeKey: "isBorrowBookRead",
			children: <BorrowHistory />,
		},
		{
			label: "Create lending coupon",
			key: "isBorrowBookCreateAndEdit",
			authorizeKey: "isBorrowBookCreateAndEdit",
			children: <CouponAdd />,
		},
	];

	const authorizeTabs = items.filter(
		(i) =>
			authRole && authRole[i.authorizeKey as keyof typeof authRole],
	);

	return <Tabs defaultActiveKey="1" items={authorizeTabs} />;
};

export default Library;
