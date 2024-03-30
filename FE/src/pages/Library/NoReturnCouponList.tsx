import React, { useEffect } from "react";
import { Alert, Button, Input, Popover, Spin, Table } from "antd";
import type { TableColumnsType } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";

import type { SearchProps } from "antd/es/input/Search";
import { RootState, useAppDispatch } from "../../context/store";
import { useSelector } from "react-redux";

import { IBorrowBookEntity } from "../../type";
import { getUnpaidBooks } from "../../context/BorrowBook/borrowBook.slice";
import NoReturnBookPopover from "./NoReturnBookPopover";
const { Search } = Input;
interface BorrowBookExtend extends IBorrowBookEntity {
	key: React.Key;
	index: number;
}

const NoReturnCouponList = () => {
	const dispatch = useAppDispatch();
	const borrowsBook = useSelector(
		(state: RootState) => state.borrowBook.unpaidBooks,
	);

	const isLoading = useSelector(
		(state: RootState) => state.guest.isLoading,
	);

	const filteredData: BorrowBookExtend[] = borrowsBook.map(
		(g, index) => {
			return {
				...g,
				key: g.id,
				index: index + 1,
			};
		},
	);

	const reload = () => {
		dispatch(getUnpaidBooks());
	};

	useEffect(() => {
		dispatch(getUnpaidBooks());
	}, [dispatch]);

	const columns: TableColumnsType<BorrowBookExtend> = [
		{
			title: "#",
			dataIndex: "index",
		},
		{
			title: "MemberId",
			dataIndex: "memebrId",
		},
		{
			title: "MemberName",
			dataIndex: "nameMember",
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
					<div className="flex items-center gap-2">
						<div className="h-2 w-2 rounded-full bg-red-600"></div>Not
						returned
					</div>
				</Popover>
			),
		},
		{
			title: "Staff",
			dataIndex: "nameStaff",
		},
		{
			title: "",
			dataIndex: "id",
			align: "end",
			render: (id: string, item) => {
				return (
					<div className="flex gap-2 items-center justify-center">
						<Button className="p-0 aspect-square flex items-center justify-center">
							<Link
								className="text-blue-500 underline"
								to={`/library/coupon/${id}/memberId/${item.memebrId}`}
							>
								<EyeOutlined />
							</Link>
						</Button>
					</div>
				);
			},
		},
	];

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
		// dispatch(getUnpaidBooks({ q: value }));
		// console.log(info?.source, value);
	};

	return (
		<div>
			<h4 className="text-3xl bg-blue-600 py-4 text-white font-semibold mb-4 text-center rounded-sm">
				Borrow service - Not return books - List
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
			<div className="mb-4">
				<Search
					size="large"
					placeholder="Search for books"
					onSearch={onSearch}
					enterButton
				/>
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

export default NoReturnCouponList;
