import React, { useEffect } from "react";
import { Alert, Button, Popover, Spin, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { EyeOutlined } from "@ant-design/icons";

import { RootState, useAppDispatch } from "../../context/store";
import { useSelector } from "react-redux";

import { IBorrowBookEntity } from "../../type";
import { getBorrowBooks } from "../../context/BorrowBook/borrowBook.slice";
import NoReturnBookPopover from "./NoReturnBookPopover";
import { getGuests } from "../../context/Guest/guest.slice";
import { getStaffs } from "../../context/Staff/staff.slice";
interface BorrowBookExtend extends IBorrowBookEntity {
	key: React.Key;
	index: number;
}

const BorrowHistory = () => {
	const dispatch = useAppDispatch();
	const borrowBooks = useSelector(
		(state: RootState) => state.borrowBook.borrowBooks,
	);
	const guests = useSelector(
		(state: RootState) => state.guest.guests,
	);

	const staffs = useSelector(
		(state: RootState) => state.staff.staffs,
	);
	const isLoading = useSelector(
		(state: RootState) => state.guest.isLoading,
	);

	const filteredData: BorrowBookExtend[] = borrowBooks.map(
		(g, index) => {
			return {
				...g,
				key: g.id,
				index: index + 1,
			};
		},
	);

	const reload = () => {
		dispatch(getBorrowBooks({}));
	};

	useEffect(() => {
		dispatch(getBorrowBooks({}));
		dispatch(getGuests({}));
		dispatch(getStaffs({}));
	}, [dispatch]);

	const columns: TableColumnsType<BorrowBookExtend> = [
		{
			title: "#",
			dataIndex: "index",
		},
		{
			title: "MemberName",
			dataIndex: "nameMember",
			sorter: (a, b) => a.nameMember.localeCompare(b.nameMember),
			filters: guests.map((g) => ({
				value: g.id,
				text: g.name,
			})),
			filterSearch: true,
			onFilter: (value: boolean | React.Key, record) => {
				return record.memebrId === value;
			},
		},
		{
			title: "Type",
			dataIndex: "ballotType",
			render: (type: string) => {
				return (
					<>
						<Tag color={type === "X" ? "error" : "success"}>
							{type === "X" ? "Lending" : "Getting"}
						</Tag>
					</>
				);
			},
			filters: [
				{
					text: "Lending",
					value: "X",
				},
				{
					text: "Getting",
					value: "N",
				},
			],
			onFilter: (value: boolean | React.Key, record) => {
				return record.ballotType === value;
			},
		},

		{
			title: "Staff",
			dataIndex: "nameStaff",
			sorter: (a, b) => a.nameMember.localeCompare(b.nameMember),
			filters: staffs.map((s) => ({
				value: s.id,
				text: s.userName,
			})),
			filterSearch: true,
			onFilter: (value: boolean | React.Key, record) => {
				return record.staffId === value;
			},
		},
		{
			title: "State",
			dataIndex: "id",
			render: (id: string) => (
				<Popover
					placement="top"
					title={"Details"}
					content={<NoReturnBookPopover id={id} />}
				>
					<Button type="primary" className="flex items-center p-2">
						<EyeOutlined />
					</Button>
				</Popover>
			),
		},
	];

	return (
		<div>
			<h4 className="text-3xl bg-blue-600 py-4 text-white font-semibold mb-4 text-center rounded-sm">
				Borrow service - History
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
						defaultPageSize: 8,
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

export default BorrowHistory;
