import { Anchor, Col, Row } from "antd";
import BookStatistic from "./path/BookStatistic";
import CategoryStatistic from "./path/CategoryStatistic";
import MemberStatistic from "./path/MemberStatistic";

const Income = () => {
	return (
		<Row>
			<Col span={20} className="space-y-8">
				<div id="bookStatistic">
					<BookStatistic />
				</div>
				<div
					id="categoryStatistic"
					style={{
						background: "rgba(0,255,0,0.02)",
					}}
				>
					<CategoryStatistic />
				</div>
				<div
					id="memberLate"
					style={{
						background: "rgba(0,0,255,0.02)",
					}}
				>
					<MemberStatistic />
				</div>
			</Col>
			<Col span={4}>
				<Anchor
					items={[
						{
							key: "bookStatistic",
							href: "#bookStatistic",
							title: "Top number of books borrowed",
						},
						{
							key: "categoryStatistic",
							href: "#categoryStatistic",
							title: "Most popular categories",
						},
						{
							key: "memberLate",
							href: "#memberLate",
							title: "Top late member",
						},
					]}
				/>
			</Col>
		</Row>
	);
};

export default Income;
