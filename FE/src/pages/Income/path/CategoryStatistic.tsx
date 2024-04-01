import { AppstoreOutlined, SearchOutlined } from "@ant-design/icons";
import {
	Button,
	DatePicker,
	Form,
	Input,
	Table,
	TableColumnsType,
} from "antd";
import React, { useEffect, useState } from "react";
import statisticService from "../../../services/statisticService";
import { useForm } from "antd/es/form/Form";
import { ITopCategoryStatistic } from "../../../type/static.type";
import getCurrentDateTimeString from "../../../utils/getCurrentDateTimeString";
import convertToNextDayStartUTC from "../../../utils/convertToNextDayStartUTC";

interface ITopCategoryStatisticExtend extends ITopCategoryStatistic {
	key: React.Key;
	index: number;
}

const { RangePicker } = DatePicker;
const CategoryStatistic = () => {
	const [topCategoryList, setTopCategoryList] = useState<
		ITopCategoryStatistic[]
	>([]);

	useEffect(() => {
		const initialStartDate = "2024-03-01T00:00:00";
		const currentDate = getCurrentDateTimeString();
		const loadData = async () => {
			await statisticService
				.listTopCategory(initialStartDate, currentDate)
				.then((res) => setTopCategoryList(res.data));
		};

		loadData();
	}, []);
	const [form] = useForm();
	const filteredData: ITopCategoryStatisticExtend[] =
		topCategoryList.map((t, index) => {
			return {
				...t,
				index: index + 1,
				key: t.id,
			};
		});
	const onFinish = async () => {
		const { date, search } = form.getFieldsValue();

		const fromDate =
			(date && convertToNextDayStartUTC(date[0].toISOString())) ||
			false;
		const toDate =
			(date && convertToNextDayStartUTC(date[1].toISOString())) ||
			false;
		try {
			const data = await statisticService.listTopCategory(
				fromDate,
				toDate,
				search,
			);

			setTopCategoryList(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const columns: TableColumnsType<ITopCategoryStatisticExtend> = [
		{
			title: "STT",
			dataIndex: "index",
			align: "center",
		},

		{
			title: "Name",
			dataIndex: "name",
			sorter: (a, b) => a.name.localeCompare(b.name),
		},
		{
			title: "Description",
			dataIndex: "description",
			sorter: (a, b) => a.description.localeCompare(b.description),
		},
		{
			title: "Borrow Count",
			dataIndex: "borrowCount",
			sorter: (a, b) =>
				parseInt(a.borrowCount) - parseInt(b.borrowCount),
		},
	];

	return (
		<div className="shadow-lg rounded-lg min-h-[300px]">
			<div className="text-4xl font-semibold flex gap-2 bg-blue-500 px-5 py-4 text-white">
				<AppstoreOutlined />
				<span>Most popular categories</span>
			</div>

			<div className="flex justify-center py-4 mt-4">
				<Form form={form} onFinish={onFinish}>
					<div className="flex gap-2">
						<Form.Item
							label={<div className="mt-2">Select date:</div>}
							name={"date"}
							colon={false}
						>
							<RangePicker size="large" />
						</Form.Item>
						<Form.Item name={"search"}>
							<Input
								size="large"
								placeholder="Search for categories..."
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

export default CategoryStatistic;
