import React, { useEffect, useState } from "react";
import {
	Alert,
	Button,
	Image,
	Input,
	Modal,
	Spin,
	Table,
} from "antd";
import type { TableColumnsType } from "antd";
import {
	DeleteOutlined,
	EditOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons";

import type { SearchProps } from "antd/es/input/Search";
import { RootState, useAppDispatch } from "../../context/store";
import { useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";
import IStaff from "../../type/staff.type";
import {
	cancelEdittingStaff,
	getStaff,
	getStaffs,
	removeStaff,
	startEdittingStaff,
} from "../../context/Staff/staff.slice";
import StaffForm from "./StaffForm";

const { Search } = Input;
interface StaffExtend extends IStaff {
	key: React.Key;
	index: number;
}

const Staff = () => {
	const dispatch = useAppDispatch();
	const staffs = useSelector(
		(state: RootState) => state.staff.staffs,
	);

	const claims = useSelector(
		(state: RootState) => state.auth.user?.claims,
	);

	const edittingstaff = useSelector(
		(state: RootState) => state.staff.edittingStaff,
	);
	const isLoading = useSelector(
		(state: RootState) => state.staff.isLoading,
	);

	const filteredData: StaffExtend[] = staffs.map((s, index) => {
		return {
			...s,
			key: s.id,
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
		dispatch(cancelEdittingStaff());
	};
	const reload = () => {
		dispatch(getStaffs({}));
	};

	useEffect(() => {
		dispatch(getStaffs({}));
	}, [dispatch]);

	const handleStartEdit = (id: string) => {
		dispatch(getStaff(id))
			.unwrap()
			.then((res) => {
				if (res) {
					dispatch(startEdittingStaff(res));
				}
			});
		setOpen(true);
	};

	const [deleteId, setDeleteId] = useState<string>();
	const [openDelete, setOpenDelete] = useState(false);
	const handleDelete = (id: string) => {
		dispatch(removeStaff({ id }))
			.unwrap()
			.then(() => {
				dispatch(getStaffs({}));
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

	const columns: TableColumnsType<StaffExtend> = [
		{
			title: "Username",
			dataIndex: "userName",
			filters: staffs.map((s) => ({
				value: s.userName,
				text: s.userName,
			})),
			filterSearch: true,
			onFilter: (value: boolean | React.Key, record) => {
				return record.userName === value;
			},
		},
		{
			title: "Avatar",
			dataIndex: "urlAvatar",
			align: "center",
			render: (url: string, item) => {
				return (
					<div className="mx-auto w-fit">
						{url && (
							<img
								className="w-[40px] aspect-square object-fill rounded-full"
								alt={item.userName}
								src={url}
							/>
						)}
						{!url && (
							<img
								className="w-[40px] aspect-square object-fill rounded-full"
								alt={item.userName}
								src={"/login-face.jpeg"}
							/>
						)}
					</div>
				);
			},
		},
		{
			title: "Role",
			dataIndex: "role",
			align: "center",
			sorter: (a, b) => {
				if (a.role && b.role) {
					return a.role.localeCompare(b.role);
				} else {
					return 1;
				}
			},
		},
		{
			title: "Email",
			dataIndex: "email",
			sorter: (a, b) => a.email.localeCompare(b.email),
			filters: staffs.map((s) => ({
				value: s.email,
				text: s.email,
			})),
			filterSearch: true,
			onFilter: (value: boolean | React.Key, record) => {
				return record.email === value;
			},
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
						<Button
							disabled={!claims?.isRoleRead}
							onClick={() => handleStartEdit(id)}
							className="text-blue-500 underline p-0 aspect-square flex items-center justify-center"
						>
							<EditOutlined />
						</Button>
						<Button
							disabled={!claims?.isStaffDelete}
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

	const onSearch: SearchProps["onSearch"] = (value) => {
		dispatch(getStaffs({ q: value }));
	};

	return (
		<div>
			<Modal
				title="Delete a staff"
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
						{edittingstaff?.id ? "Edit staff " : "Add a new staff"}
					</div>
				}
				width={800}
				open={open}
				onOk={hideModal}
				onCancel={hideModal}
				footer={null}
			>
				<StaffForm form={form} handleClose={hideModal} />
			</Modal>

			<h4 className="text-3xl bg-blue-600 py-4 text-white font-semibold mb-4 text-center rounded-sm">
				Staffs - List
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

				{claims?.isStaffEditAndCreate && (
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
				)}
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

export default Staff;
