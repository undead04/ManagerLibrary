import { BookOutlined, SearchOutlined } from "@ant-design/icons";
import {
	Button,
	DatePicker,
	Form,
	Image,
	Input,
	Popover,
	Table,
	TableColumnsType,
} from "antd";
import React, { useEffect, useState } from "react";
import statisticService from "../../../services/statisticService";
import { useForm } from "antd/es/form/Form";
import { ITopBookStatistic } from "../../../type/static.type";
import BookStatisticPopover from "./BookStatisticPopover";
import getCurrentDateTimeString from "../../../utils/getCurrentDateTimeString";

interface ITopBookStatisticExtend extends ITopBookStatistic {
	key: React.Key;
	index: number;
}

const { RangePicker } = DatePicker;
const BookStatistic = () => {
	const [topBookList, setTopBookList] = useState<ITopBookStatistic[]>(
		[],
	);

	const [presentQuantity, setPresentQuantity] = useState("0");
	const [totalQuantity, setTotalQuantity] = useState("0");
	useEffect(() => {
		const initialStartDate = "2024-03-01T00:00:00";
		const currentDate = getCurrentDateTimeString();
		const loadData = async () => {
			await statisticService
				.listTopBook(initialStartDate, currentDate)
				.then((res) => setTopBookList(res.data));

			const data = await statisticService.getQuantity();

			setPresentQuantity(data.data.quantityPresentBook);
			setTotalQuantity(data.data.quantityBook);
		};

		loadData();
	}, []);
	const [form] = useForm();
	const filteredData: ITopBookStatisticExtend[] = topBookList.map(
		(t, index) => {
			return {
				...t,
				index: index + 1,
				key: t.id,
			};
		},
	);
	const onFinish = async () => {
		const { date, search } = form.getFieldsValue();

		const fromDate = (date && date[0].toISOString()) || false;
		const toDate = (date && date[1].toISOString()) || false;
		try {
			const data = await statisticService.listTopBook(
				fromDate,
				toDate,
				search,
			);

			setTopBookList(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const columns: TableColumnsType<ITopBookStatisticExtend> = [
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
								className="w-[40px] aspect-square object-fill"
								alt={item.title}
								src={url}
							/>
						)}
						{!url && (
							<img
								className="w-[40px] aspect-square object-fill"
								alt={item.title}
								src={"/login-face.jpeg"}
							/>
						)}
					</div>
				);
			},
		},
		{
			title: "Title",
			dataIndex: "title",
			sorter: (a, b) => a.title.localeCompare(b.title),
		},
		{
			title: "Borrow times",
			dataIndex: "borrowCount",
			render: (count: string, item) => {
				return (
					<Popover
						placement="top"
						title={"List of member borrowed"}
						content={() => <BookStatisticPopover id={item.id} />}
					>
						<div className="w-full cursor-pointer">{count}</div>
					</Popover>
				);
			},
		},
	];

	return (
		<div className="shadow-lg rounded-lg min-h-[300px]">
			<div className="text-5xl font-semibold flex gap-2 bg-blue-500 px-5 py-4 text-white">
				<BookOutlined />
				<span>Top number of books borrowed</span>
			</div>
			<div className="flex gap-2 items-center justify-center mt-4 text-3xl">
				<div>Quantity:</div>
				<div>
					{presentQuantity}/{totalQuantity}
				</div>
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
							<Input size="large" placeholder="Search for books..." />
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

export default BookStatistic;
