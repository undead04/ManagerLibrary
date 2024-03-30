import React, { useEffect } from "react";
import { Alert, Button, Popover, Spin, Table } from "antd";
import type { TableColumnsType } from "antd";
import { EyeOutlined } from "@ant-design/icons";

import { RootState, useAppDispatch } from "../../context/store";

import { useSelector } from "react-redux";
import { IBookEntryEntity } from "../../type";
import { getBookEntries } from "../../context/BookEntry/bookEntry.slice";
import formatDate from "../../utils/formatDate";
import BookEntryPopover from "./BookEntryPopover";
import { Link } from "react-router-dom";

interface IBookEntryEntityExtend extends IBookEntryEntity {
	key: React.Key;
	index: number;
}

const BookEntryView = () => {
	const dispatch = useAppDispatch();
	const bookEntries = useSelector(
		(state: RootState) => state.bookEntry.bookEntries,
	);

	const isLoading = useSelector(
		(state: RootState) => state.bookEntry.isLoading,
	);

	const filteredData: IBookEntryEntityExtend[] = bookEntries.map(
		(b, index) => {
			return {
				...b,
				key: b.id,
				index: index + 1,
			};
		},
	);

	const reload = () => {
		dispatch(getBookEntries({}));
	};

	useEffect(() => {
		dispatch(getBookEntries({}));
	}, [dispatch]);

	const columns: TableColumnsType<IBookEntryEntityExtend> = [
		{
			title: "STT",
			dataIndex: "index",
			align: "center",
		},
		{
			title: "Staff",
			dataIndex: "userName",
			sorter: (a, b) => a.userName.localeCompare(b.userName),
		},
		{
			title: "Create at",
			dataIndex: "create_At",
			sorter: (a, b) =>
				new Date(a.create_At).getTime() -
				new Date(b.create_At).getTime(),
			render: (dateString: string) => <>{formatDate(dateString)}</>,
		},

		{
			title: "",
			dataIndex: "id",
			align: "end",
			render: (id: string) => {
				return (
					<div className="flex gap-2 items-center justify-center">
						<Link to={`/book-entry/d/${id}`}>
							<EyeOutlined />
						</Link>
					</div>
				);
			},
		},
	];

	return (
		<div>
			<h4 className="text-3xl bg-blue-600 py-4 text-white font-semibold mb-4 text-center rounded-sm">
				BookEntries - List
			</h4>

			<div className="mb-4 flex items-center justify-between">
				<div>
					<Button
						size="large"
						type="primary"
						disabled={isLoading}
						loading={isLoading}
						onClick={reload}
					>
						Reload
					</Button>
				</div>
			</div>

			{!isLoading && (
				<Table
					size="large"
					pagination={{
						position: ["bottomRight"],
						showSizeChanger: true,
						pageSizeOptions: [4, 8, 16, 32, 64, 128, 256],
					}}
					columns={columns}
					dataSource={filteredData}
				/>
			)}

			{isLoading && (
				<div className="w-[50%] my-8 mx-auto">
					<Spin tip={"Loading"} spinning={true}>
						<Alert
							type="info"
							message="Loading data"
							description="Data is loading. Please wait..."
						/>
					</Spin>
				</div>
			)}
		</div>
	);
};

export default BookEntryView;
