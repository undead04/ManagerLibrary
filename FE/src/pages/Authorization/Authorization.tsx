import React, { useEffect, useState } from "react";
import { Alert, Button, Modal, Spin, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useNavigate } from "react-router-dom";
import {
	DeleteOutlined,
	EditOutlined,
	EyeOutlined,
} from "@ant-design/icons";

import AuthorizationForm from "./AuthorizationForm";
import { IRole } from "../../type";
import { RootState, useAppDispatch } from "../../context/store";
import { useSelector } from "react-redux";
import {
	getRole,
	getRoles,
	removeRole,
	startEdittingRole,
} from "../../context/Role/role.slice";

interface IRoleExtend extends IRole {
	key: React.Key;
	index: number;
}

const Authorization = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const roles = useSelector((state: RootState) => state.role.roles);

	const isLoading = useSelector(
		(state: RootState) => state.role.isLoading,
	);

	const data: IRoleExtend[] = roles.map((r, index) => ({
		...r,
		index: index + 1,
		key: r.id,
	}));

	const handleStartEdit = (id: string) => {
		dispatch(getRole(id))
			.unwrap()
			.then((res) => {
				console.log(res);
				if (res) {
					dispatch(startEdittingRole(res));
				}
			});
	};

	const handleStartDelete = (id: string) => {
		setDeleteId(id);
		setOpenDelete(true);
	};

	const handleCancelDelete = () => {
		setDeleteId("");
		setOpenDelete(false);
	};

	const columns: TableColumnsType<IRoleExtend> = [
		{
			title: "#",
			dataIndex: "index",
		},
		{
			title: "Role",
			dataIndex: "name",
		},
		{
			title: "",
			dataIndex: "id",
			render: (id: string) => {
				return (
					<div className="flex gap-2 items-center justify-center">
						<Button className="p-0 aspect-square flex items-center justify-center">
							<EyeOutlined />
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

	const reload = () => {
		dispatch(getRoles());
	};
	const [openDelete, setOpenDelete] = useState(false);
	const [deleteId, setDeleteId] = useState<string>();
	const handleDelete = (deleteId: string) => {
		dispatch(removeRole({ id: deleteId }))
			.unwrap()
			.then(() => {
				setDeleteId("");
				setOpenDelete(false);
				reload();
			});
	};

	useEffect(() => {
		reload();
	}, []);
	return (
		<div>
			<Modal
				title="Delete a category"
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

			<h4 className="text-3xl bg-blue-600 py-4 text-white font-semibold mb-4 text-center rounded-xl shadow-md">
				Authorization - Roles
			</h4>

			<div className="grid grid-cols-2 gap-8">
				<div className="shadow-lg p-4">
					<div className="mb-4 flex items-center justify-between">
						<div>
							<Button onClick={reload} size="large" type="primary">
								Reload
							</Button>
						</div>
					</div>

					{!isLoading && (
						<Table
							size="large"
							onRow={(Authorization) => {
								return {
									onDoubleClick: (event) => {
										event.preventDefault();
										navigate(`/Authorization/d/${Authorization.key}`);
									},
								};
							}}
							columns={columns}
							dataSource={data}
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

				<div className="shadow-lg px-8 py-4">
					<AuthorizationForm />
				</div>
			</div>
		</div>
	);
};

export default Authorization;
