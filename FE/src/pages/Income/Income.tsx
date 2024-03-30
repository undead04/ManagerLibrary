import { Anchor, Col, Row } from "antd";
import BookStatistic from "./path/BookStatistic";

const Income = () => {
	return (
		<Row>
			<Col span={20}>
				<div id="bookStatistic">
					<BookStatistic />
				</div>
				<div
					id="part-2"
					style={{
						height: "100vh",
						background: "rgba(0,255,0,0.02)",
					}}
				/>
				<div
					id="part-3"
					style={{
						height: "100vh",
						background: "rgba(0,0,255,0.02)",
					}}
				/>
			</Col>
			<Col span={4}>
				<Anchor
					items={[
						{
							key: "bookStatistic",
							href: "#bookStatistic",
							title: "Statistical: Borrow",
						},
						{
							key: "part-2",
							href: "#part-2",
							title: "Part 2",
						},
						{
							key: "part-3",
							href: "#part-3",
							title: "Part 3",
						},
					]}
				/>
			</Col>
		</Row>
	);
};

export default Income;
