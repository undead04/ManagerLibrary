import {
	EyeOutlined,
	SearchOutlined,
	UserOutlined,
} from "@ant-design/icons";
import {
	Button,
	DatePicker,
	Form,
	Input,
	Popover,
	Table,
	TableColumnsType,
} from "antd";
import React, { useEffect, useState } from "react";
import statisticService from "../../../services/statisticService";
import { useForm } from "antd/es/form/Form";
import { ITopMemberLateStatistic } from "../../../type/static.type";
import getCurrentDateTimeString from "../../../utils/getCurrentDateTimeString";
import MemberStatisticPopover from "./MemberStatisticPopover";
import { Link } from "react-router-dom";

interface ITopMemberLateStatisticExtend
	extends ITopMemberLateStatistic {
	key: React.Key;
	index: number;
}

const { RangePicker } = DatePicker;
const MemberStatistic = () => {
	const [topCategoryList, setTopCategoryList] = useState<
		ITopMemberLateStatistic[]
	>([]);

	useEffect(() => {
		const initialStartDate = "2024-03-01T00:00:00";
		const currentDate = getCurrentDateTimeString();
		const loadData = async () => {
			await statisticService
				.listTopMemberLate(initialStartDate, currentDate)
				.then((res) => setTopCategoryList(res.data));
		};

		loadData();
	}, []);
	const [form] = useForm();
	const filteredData: ITopMemberLateStatisticExtend[] =
		topCategoryList.map((t, index) => {
			return {
				...t,
				index: index + 1,
				key: t.id,
			};
		});
	const onFinish = async () => {
		const { date, search } = form.getFieldsValue();

		const fromDate = (date && date[0].toISOString()) || false;
		const toDate = (date && date[1].toISOString()) || false;
		try {
			const data = await statisticService.listTopMemberLate(
				fromDate,
				toDate,
				search,
			);

			setTopCategoryList(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const columns: TableColumnsType<ITopMemberLateStatisticExtend> = [
		{
			title: "STT",
			dataIndex: "index",
			align: "center",
		},
		{
			title: "Avatar",
			dataIndex: "urlImage",
			align: "center",
			render: (url: string, item) => {
				return (
					<div className="mx-auto w-fit">
						{url && (
							<img
								className="w-[40px] aspect-square object-fill rounded-full"
								alt={item.name}
								src={url}
							/>
						)}
						{!url && (
							<img
								className="w-[40px] aspect-square object-fill rounded-full"
								alt={item.name}
								src={"/login-face.jpeg"}
							/>
						)}
					</div>
				);
			},
		},
		{
			title: "Name",
			dataIndex: "name",
			render: (name: string, item) => (
				<Link to={`/guest/d/${item.id}`}>{name}</Link>
			),
			sorter: (a, b) => a.name.localeCompare(b.name),
		},
		{
			title: "Phone",
			dataIndex: "phone",
		},
		{
			title: "Address",
			dataIndex: "address",
			sorter: (a, b) => a.address.localeCompare(b.address),
		},
		{
			title: "Gender",
			dataIndex: "gender",
			render: (gender: boolean) => (gender ? "Male" : "Female"),
			filters: [
				{
					text: "Male",
					value: true,
				},
				{
					text: "Female",
					value: false,
				},
			],
			onFilter: (value: boolean | React.Key, record) => {
				return record.gender === value;
			},
		},
		{
			title: "Count of late",
			dataIndex: "lateCount",
			sorter: (a, b) => a.lateCount - b.lateCount,
		},
		{
			title: "",
			dataIndex: "id",
			render: (id: string) => (
				<Popover
					placement="top"
					title={"More info"}
					content={() => <MemberStatisticPopover id={id} />}
				>
					<div className="w-full cursor-pointer">
						<Button className="p-2 flex items-center">
							<EyeOutlined />
						</Button>
					</div>
				</Popover>
			),
		},
	];

	return (
		<div className="shadow-lg rounded-lg min-h-[300px]">
			<div className="text-5xl font-semibold flex gap-2 bg-blue-500 px-5 py-4 text-white">
				<UserOutlined />
				<span>Top late member</span>
			</div>

			<div className="flex justify-center py-4 mt-4">
				<Form form={form} onFinish={onFinish}>
					<div className="flex gap-2">
						<Form.Item
							label={<div className="mt-2">Select date:</div>}
							name={"date"}
							colon={false}
						>
							<RangePicker size="large" showTime />
						</Form.Item>
						<Form.Item name={"search"}>
							<Input
								size="large"
								placeholder="Search for member..."
							/>
						</Form.Item>
						<Button
							size="large"
							htmlType="submit"
							type="primary"
							className="p-3 flex items-center"
						>
							<SearchOutlined />
						</Button>
					</div>
				</Form>
			</div>

			<div className="px-2 shadow-md">
				<Table
					size="large"
					pagination={{
						position: ["bottomRight"],
						showSizeChanger: true,
						pageSizeOptions: [4, 8, 16, 32, 64, 128, 256],
						defaultPageSize: 4,
					}}
					columns={columns}
					dataSource={filteredData}
				/>
			</div>
		</div>
	);
};

export default MemberStatistic;
