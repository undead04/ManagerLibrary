import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useNavigate } from "react-router-dom";
import {
	DeleteOutlined,
	EditOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons";
import CategoryForm from "./CategoryForm";
import type { SearchProps } from "antd/es/input/Search";
import { RootState, useAppDispatch } from "../../context/store";
import {
	cancelEdittingCategory,
	getCategorys,
	removeCategory,
	startEdittingCategory,
} from "../../context/Category/category.slice";
import { useSelector } from "react-redux";
import type ICategory from "./../../type/category.type";
import { useForm } from "antd/es/form/Form";

const { Search } = Input;
interface ExtendedCategory extends ICategory {
	key: React.Key;
	index: number;
}

const Category = () => {
	const navigate = useNavigate();
	const [form] = useForm();
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);
	const categorys = useSelector(
		(state: RootState) => state.category.categorys,
	);

	const filterData: ExtendedCategory[] = categorys.map(
		(c, index) => ({
			...c,
			key: c.categoryId,
			index: index + 1,
		}),
	);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>(
		[],
	);
	// Modal
	const [open, setOpen] = useState(false);
	const showModal = () => {
		setOpen(true);
	};

	const hideModal = () => {
		dispatch(cancelEdittingCategory());
		setOpen(false);
	};
	const start = () => {
		setLoading(true);
		// ajax request after empty completing
		setTimeout(() => {
			setSelectedRowKeys([]);
			setLoading(false);
		}, 1000);
	};

	const handleStartEdit = (item: ExtendedCategory) => {
		const edittingCategory: ICategory = {
			categoryId: item.categoryId,
			description: item.description,
			name: item.name,
		};

		dispatch(startEdittingCategory(edittingCategory));
		setOpen(true);
	};
	const [deleteId, setDeleteId] = useState<string>();
	const [openDelete, setOpenDelete] = useState(false);
	const handleDelete = (id: string) => {
		dispatch(removeCategory({ id }));
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

	const columns: TableColumnsType<ExtendedCategory> = [
		{
			title: "#",
			dataIndex: "index",
		},
		{
			title: "Title",
			dataIndex: "name",
		},
		{
			title: "Description",
			dataIndex: "description",
		},
		{
			title: "",
			dataIndex: "key",
			render: (id: string, item) => {
				return (
					<Button
						onClick={() => handleStartEdit(item)}
						className="text-blue-500 underline"
					>
						<EditOutlined />
					</Button>
				);
			},
		},
		{
			title: "",
			dataIndex: "categoryId",
			render: (id: string) => {
				return (
					<Button
						className="text-red-500 underline"
						onClick={() => handleStartDelete(id)}
					>
						<DeleteOutlined />
					</Button>
				);
			},
		},
	];

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		console.log("selectedRowKeys changed: ", newSelectedRowKeys);
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	};
	const hasSelected = selectedRowKeys.length > 0;

	const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
		console.log(info?.source, value);

	useEffect(() => {
		dispatch(getCategorys());
	}, []);
	return (
		<>
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
			<div>
				<Modal
					width={800}
					open={open}
					onOk={hideModal}
					onCancel={hideModal}
					footer={null}
				>
					<CategoryForm form={form} handleClose={hideModal} />
				</Modal>

				<div className="text-3xl font-semibold my-2">
					Categories - List
				</div>

				<div style={{ marginBottom: 16 }}>
					<div className="mb-4 flex items-center justify-between">
						<div>
							<Button
								type="primary"
								onClick={start}
								disabled={!hasSelected}
								loading={loading}
							>
								Reload
							</Button>
							<span style={{ marginLeft: 8 }}>
								{hasSelected
									? `Selected ${selectedRowKeys.length} items`
									: ""}
							</span>
						</div>

						<div>
							<Button
								type="primary"
								icon={<PlusCircleOutlined />}
								onClick={showModal}
							>
								Add
							</Button>
						</div>
					</div>
					<span style={{ marginLeft: 8 }}>
						{hasSelected
							? `Selected ${selectedRowKeys.length} items`
							: ""}
					</span>
				</div>

				<div className="mb-4">
					<Search
						placeholder="input search text"
						onSearch={onSearch}
						enterButton
					/>
				</div>
				<Table
					pagination={{
						position: ["bottomRight"],
						showSizeChanger: true,
					}}
					onRow={(book) => {
						return {
							onDoubleClick: (event) => {
								event.preventDefault();
								navigate(`/book/d/${book.key}`);
							},
						};
					}}
					rowSelection={rowSelection}
					columns={columns}
					dataSource={filterData}
				/>
			</div>
		</>
	);
};

export default Category;
