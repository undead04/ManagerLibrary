import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Line } from "@ant-design/plots";
import {
	Card,
	DatePicker,
	Divider,
	Form,
	Select,
	Statistic,
	Tag,
} from "antd";
import {
	ArrowDownOutlined,
	ArrowUpOutlined,
	UserOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";

const { RangePicker } = DatePicker;

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
			<div className="text-2xl font-semibold my-4">Income</div>

			<div className="mx-auto w-fit">
				<Form.Item label={<div>Filter by date range</div>}>
					<Form.Item name="RangePicker">
						<RangePicker />
					</Form.Item>
				</Form.Item>
			</div>
			<div className="">
				<div>
					<Divider />

					<div className="my-4 ml-2 p-4">
						<Statistic
							title={<div className="text-lg">Top books borrows</div>}
							value={11.28}
							valueStyle={{ color: "#3f8600" }}
							prefix={<ArrowUpOutlined />}
							suffix="% borrow rating"
						/>
					</div>

					<div className="grid grid-cols-4 gap-2">
						<Card
							hoverable
							cover={
								<img
									className="aspect-video object-contain"
									alt="example"
									src="https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								/>
							}
						>
							<Meta
								title="Books 1"
								description={
									<>
										<div className="flex justify-between">
											<Link to={"/book/d/0"}>View Detail</Link>{" "}
											<Statistic
												value={5}
												valueStyle={{
													color: "#3f8600",
													fontSize: "12px",
												}}
												prefix={<ArrowUpOutlined />}
												suffix="% borrow rating"
											/>
										</div>
										<div className="space-x-2 my-2">
											<Tag color="magenta">Horror</Tag>
											<Tag color="volcano">Adventure</Tag>
										</div>
									</>
								}
							/>
						</Card>
						<Card
							hoverable
							cover={
								<img
									className="aspect-video object-contain"
									alt="example"
									src="https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								/>
							}
						>
							<Meta
								title="Books 1"
								description={
									<>
										<div className="flex justify-between">
											<Link to={"/book/d/0"}>View Detail</Link>{" "}
											<Statistic
												value={5}
												valueStyle={{
													color: "#3f8600",
													fontSize: "12px",
												}}
												prefix={<ArrowUpOutlined />}
												suffix="% borrow rating"
											/>
										</div>
										<div className="space-x-2 my-2">
											<Tag color="magenta">Horror</Tag>
											<Tag color="volcano">Adventure</Tag>
										</div>
									</>
								}
							/>
						</Card>
						<Card
							hoverable
							cover={
								<img
									className="aspect-video object-contain"
									alt="example"
									src="https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								/>
							}
						>
							<Meta
								title="Books 1"
								description={
									<>
										<div className="flex justify-between">
											<Link to={"/book/d/0"}>View Detail</Link>{" "}
											<Statistic
												value={5}
												valueStyle={{
													color: "#3f8600",
													fontSize: "12px",
												}}
												prefix={<ArrowUpOutlined />}
												suffix="% borrow rating"
											/>
										</div>
										<div className="space-x-2 my-2">
											<Tag color="magenta">Horror</Tag>
											<Tag color="volcano">Adventure</Tag>
										</div>
									</>
								}
							/>
						</Card>
						<Card
							hoverable
							cover={
								<img
									className="aspect-video object-contain"
									alt="example"
									src="https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								/>
							}
						>
							<Meta
								title="Books 1"
								description={
									<>
										<div className="flex justify-between">
											<Link to={"/book/d/0"}>View Detail</Link>{" "}
											<Statistic
												value={5}
												valueStyle={{
													color: "#3f8600",
													fontSize: "12px",
												}}
												prefix={<ArrowUpOutlined />}
												suffix="% borrow rating"
											/>
										</div>
										<div className="space-x-2 my-2">
											<Tag color="magenta">Horror</Tag>
											<Tag color="volcano">Adventure</Tag>
										</div>
									</>
								}
							/>
						</Card>
					</div>
				</div>

				<div>
					<Divider />

					<div className="my-4 ml-2 p-4">
						<Statistic
							title={<div className="text-lg">Top Guest</div>}
							value={11.28}
							valueStyle={{ color: "#3f8600" }}
							prefix={<ArrowUpOutlined />}
							suffix="% recently visited"
						/>
					</div>

					<div className="grid grid-cols-4 gap-2">
						<Card
							hoverable
							cover={
								<div className="">
									<div className="text-8xl py-4 mx-auto w-fit min-h-[120px]">
										<UserOutlined size={20} />
									</div>
								</div>
							}
						>
							<Meta
								title="Guest 1"
								description={
									<>
										<div className="flex justify-between">
											<Link to={"/guest/d/0"}>View Detail</Link>{" "}
											<Statistic
												value={5}
												valueStyle={{
													color: "#3f8600",
													fontSize: "12px",
												}}
												prefix={<ArrowUpOutlined />}
												suffix="% visited"
											/>
										</div>
										<div className="flex gap-2 items-center my-2">
											<div>Last borrowed: </div>
											<Tag color="cyan">2 days ago </Tag>
										</div>
									</>
								}
							/>
						</Card>
						<Card
							hoverable
							cover={
								<div className="">
									<div className="text-8xl py-4 mx-auto w-fit min-h-[120px]">
										<UserOutlined size={20} />
									</div>
								</div>
							}
						>
							<Meta
								title="Guest 1"
								description={
									<>
										<div className="flex justify-between">
											<Link to={"/guest/d/0"}>View Detail</Link>{" "}
											<Statistic
												value={5}
												valueStyle={{
													color: "#3f8600",
													fontSize: "12px",
												}}
												prefix={<ArrowUpOutlined />}
												suffix="% visited"
											/>
										</div>
										<div className="flex gap-2 items-center my-2">
											<div>Last borrowed: </div>
											<Tag color="cyan">2 days ago </Tag>
										</div>
									</>
								}
							/>
						</Card>
						<Card
							hoverable
							cover={
								<div className="">
									<div className="text-8xl py-4 mx-auto w-fit min-h-[120px]">
										<UserOutlined size={20} />
									</div>
								</div>
							}
						>
							<Meta
								title="Guest 1"
								description={
									<>
										<div className="flex justify-between">
											<Link to={"/guest/d/0"}>View Detail</Link>{" "}
											<Statistic
												value={5}
												valueStyle={{
													color: "#3f8600",
													fontSize: "12px",
												}}
												prefix={<ArrowUpOutlined />}
												suffix="% visited"
											/>
										</div>
										<div className="flex gap-2 items-center my-2">
											<div>Last borrowed: </div>
											<Tag color="cyan">2 days ago </Tag>
										</div>
									</>
								}
							/>
						</Card>
						<Card
							hoverable
							cover={
								<img
									className="aspect-video object-cover"
									alt="example"
									src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
								/>
							}
						>
							<Meta
								title="Guest 1"
								description={
									<>
										<div className="flex justify-between">
											<Link to={"/guest/d/0"}>View Detail</Link>{" "}
											<Statistic
												value={5}
												valueStyle={{
													color: "#3f8600",
													fontSize: "12px",
												}}
												prefix={<ArrowUpOutlined />}
												suffix="% visited"
											/>
										</div>
										<div className="flex gap-2 items-center my-2">
											<div>Last borrowed: </div>
											<Tag color="cyan">2 days ago </Tag>
										</div>
									</>
								}
							/>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Income;
