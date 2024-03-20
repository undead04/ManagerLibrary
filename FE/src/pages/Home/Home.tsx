import React from "react";
import CountUp from "react-countup";
import { Col, Row, Statistic } from "antd";

const formatter = (value: number) => (
	<CountUp end={value} separator="," />
);
const Home = () => {
	return (
		<div>
			<Row gutter={16}>
				<Col span={12}>
					<div className="shadow-md p-8">
						<Statistic
							title="Books"
							value={112893}
							formatter={formatter}
						/>
					</div>
				</Col>
				<Col span={12}>
					<div className="shadow-md p-8">
						<Statistic
							title="User"
							value={112893}
							precision={2}
							formatter={formatter}
						/>
					</div>
				</Col>
				<Col span={12}>
					<div className="shadow-md p-8">
						<Statistic
							title="Staff"
							value={112893}
							formatter={formatter}
						/>
					</div>
				</Col>
				<Col span={12}>
					<div className="shadow-md p-8">
						<Statistic
							title="Income"
							value={112893}
							precision={2}
							formatter={formatter}
						/>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default Home;
