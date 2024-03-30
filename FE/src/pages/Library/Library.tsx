import { Tabs } from "antd";

import NoReturnCouponList from "./NoReturnCouponList";
import BorrowHistory from "./BorrowHistory";
import CouponAdd from "./Coupon/CouponAdd";

const Library = () => {
	return (
		<Tabs
			defaultActiveKey="1"
			items={[
				{
					label: "View unpaid coupon",
					key: "1",
					children: <NoReturnCouponList />,
				},
				{
					label: "View borrow coupon history",
					key: "2",
					children: <BorrowHistory />,
				},
				{
					label: "Create lending coupon",
					key: "3",
					children: <CouponAdd />,
				},
			]}
		/>
	);
};

export default Library;
