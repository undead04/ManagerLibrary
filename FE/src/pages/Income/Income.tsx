import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Line } from "@ant-design/plots";
import { Card, Form, Select, Statistic } from "antd";
import {
	ArrowDownOutlined,
	ArrowUpOutlined,
} from "@ant-design/icons";

const Income = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		asyncFetch();
	}, []);

	const asyncFetch = () => {
		fetch(
			"https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json",
		)
			.then((response) => response.json())
			.then((json) => setData(json))
			.catch((error) => {
				console.log("fetch data failed", error);
			});
	};
	const config = {
		data,
		padding: "auto",
		xField: "Date",
		yField: "scales",
		xAxis: {
			// type: 'timeCat',
			tickCount: 5,
		},
	};

	return (
		<div>
			<div className="text-2xl font-semibold my-4">Report</div>

			<Form.Item label={<div>Select year:</div>}>
				<Select defaultValue={2023}>
					<Select.Option>2022</Select.Option>
					<Select.Option>2023</Select.Option>
					<Select.Option>2024</Select.Option>
				</Select>
			</Form.Item>
			<div className="grid grid-cols-3">
				{" "}
				<div className="col-span-2">
					<Line {...config} />
				</div>
				<div className="flex flex-col">
					<Card bordered={false}>
						<Statistic
							title="Borrowed Books"
							value={11.28}
							precision={2}
							valueStyle={{ color: "#3f8600" }}
							prefix={<ArrowUpOutlined />}
							suffix="%"
						/>
					</Card>

					<Card bordered={false}>
						<Statistic
							title="Buy rates"
							value={9.3}
							precision={2}
							valueStyle={{ color: "#cf1322" }}
							prefix={<ArrowDownOutlined />}
							suffix="%"
						/>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Income;
