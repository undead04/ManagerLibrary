import React, { useEffect, useState } from "react";
import { Alert, Button, Input, Modal, Spin, Table } from "antd";
import type { TableColumnsType } from "antd";
import { Link } from "react-router-dom";
import {
	DeleteOutlined,
	EditOutlined,
	EyeOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons";

import type { SearchProps } from "antd/es/input/Search";
import { RootState, useAppDispatch } from "../../context/store";
import { useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";
import IGuest from "../../type/guest.type";
import {
	cancelEdittingGuest,
	getGuest,
	getGuests,
	removeGuest,
	startEdittingGuest,
} from "../../context/Guest/guest.slice";
import GuestForm from "./GuestForm";

const { Search } = Input;
interface GuestExtend extends IGuest {
	key: React.Key;
	index: number;
}

const Guest = () => {
	const dispatch = useAppDispatch();
	const guests = useSelector(
		(state: RootState) => state.guest.guests,
	);

	const edittingGuest = useSelector(
		(state: RootState) => state.guest.edittingGuest,
	);
	const isLoading = useSelector(
		(state: RootState) => state.guest.isLoading,
	);

	const filteredData: GuestExtend[] = guests.map((g, index) => {
		return {
			...g,
			key: g.id,
			index: index + 1,
		};
	});

	// Form
	const [form] = useForm();
	// Modal
	const [open, setOpen] = useState(false);
	const showModal = () => {
		setOpen(true);
	};

	const hideModal = () => {
		setOpen(false);
		dispatch(cancelEdittingGuest());
	};
	const reload = () => {
		dispatch(getGuests({}));
	};

	useEffect(() => {
		dispatch(getGuests({}));
	}, [dispatch]);

	const handleStartEdit = (id: string) => {
		dispatch(getGuest(id))
			.unwrap()
			.then((res) => {
				if (res) {
					dispatch(startEdittingGuest(res));
				}
			});
		setOpen(true);
	};

	const [deleteId, setDeleteId] = useState<string>();
	const [openDelete, setOpenDelete] = useState(false);
	const handleDelete = (id: string) => {
		dispatch(removeGuest({ id }))
			.unwrap()
			.then((res) => {
				console.log(res);
			});
		setOpenDelete(false);
	};

	const handleStartDelete = (id: string) => {
		setDeleteId(id);
		setOpenDelete(true);
	};

	const handleCancelDelete = () => {
		setOpenDelete(false);
		setDeleteId("");
	};

	const columns: TableColumnsType<GuestExtend> = [
		{
			title: "Username",
			dataIndex: "name",
		},
		{
			title: "Phone",
			dataIndex: "phone",
		},

		{
			title: "Gender",
			dataIndex: "gender",
			render: (gender: boolean) => (gender ? "Male" : "Female"),
		},
		{
			title: "Address",
			dataIndex: "address",
		},
		{
			title: "",
			dataIndex: "id",
			align: "end",
			render: (id: string) => {
				return (
					<div className="flex gap-2 items-center justify-center">
						<Button className="p-0 aspect-square flex items-center justify-center">
							<Link
								className="text-blue-500 underline"
								to={`/guest/d/${id} `}
							>
								<EyeOutlined />
							</Link>
						</Button>
						<Button
							onClick={() => handleStartEdit(id)}
							className="text-blue-500 underline p-0 aspect-square flex items-center justify-center"
						>
							<EditOutlined />
						</Button>
						<Button
							className="text-red-500 underline p-0 aspect-square flex items-center justify-center"
							onClick={() => handleStartDelete(id)}
						>
							<DeleteOutlined />
						</Button>
					</div>
				);
			},
		},
	];

	const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
		dispatch(getGuests({ q: value }));
		console.log(info?.source, value);
	};

	return (
		<div>
			<Modal
				title="Delete a guest"
				open={openDelete}
				onOk={() => {
					if (deleteId) {
						handleDelete(deleteId);
					}
				}}
				onCancel={handleCancelDelete}
			>
				<p>This action will not allow redo. Confirm deletion?</p>
			</Modal>
			<Modal
				title={
					<div className="text-3xl font-semibold my-2 bg-blue-500 mx-8 py-2 text-white text-center">
						{edittingGuest?.id ? "Edit guest " : "Add a new guest"}
					</div>
				}
				width={800}
				open={open}
				onOk={hideModal}
				onCancel={hideModal}
				footer={null}
			>
				<GuestForm form={form} handleClose={hideModal} />
			</Modal>

			<h4 className="text-3xl bg-blue-600 py-4 text-white font-semibold mb-4 text-center rounded-sm">
				Guests - List
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

				<div>
					<Button
						size="large"
						type="primary"
						icon={<PlusCircleOutlined />}
						onClick={showModal}
					>
						Add
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

export default Guest;
