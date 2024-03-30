import React, { useEffect, useState } from "react";
import { Alert, Button, Input, Modal, Spin, Table } from "antd";
import type { TableColumnsType } from "antd";
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
	const [form] = useForm();
	const dispatch = useAppDispatch();
	const categorys = useSelector(
		(state: RootState) => state.category.categorys,
	);
	const isLoading = useSelector(
		(state: RootState) => state.category.isLoading,
	);
	const filterData: ExtendedCategory[] = categorys.map(
		(c, index) => ({
			...c,
			key: c.categoryId,
			index: index + 1,
		}),
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
	const reload = () => {
		dispatch(getCategorys({}));
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
		dispatch(removeCategory({ id }))
			.unwrap()
			.then(() => {
				dispatch(getCategorys({}));
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

	const columns: TableColumnsType<ExtendedCategory> = [
		{
			title: "#",
			dataIndex: "index",
		},
		{
			title: "Title",
			dataIndex: "name",
			sorter: (a, b) => a.name.localeCompare(b.name),
		},
		{
			title: "Description",
			dataIndex: "description",
			sorter: (a, b) => a.description.localeCompare(b.description),
		},
		{
			title: "",
			dataIndex: "categoryId",
			render: (id: string, item) => {
				return (
					<div className="flex gap-2 items-center">
						<Button
							onClick={() => handleStartEdit(item)}
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
		dispatch(getCategorys({ q: value }));
		console.log(info?.source, value);
	};

	useEffect(() => {
		dispatch(getCategorys({ q: "" }));
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
				<h4 className="text-3xl bg-blue-600 py-4 text-white font-semibold mb-4 text-center rounded-sm">
					Categories - List
				</h4>
				<div style={{ marginBottom: 16 }}>
					<div className="mb-4 flex items-center justify-between">
						<div>
							<Button
								size="large"
								type="primary"
								onClick={reload}
								loading={isLoading}
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
				</div>

				<div className="mb-4">
					<Search
						size="large"
						placeholder="Search for categories"
						onSearch={onSearch}
						enterButton
					/>
				</div>
				{!isLoading && (
					<Table
						pagination={{
							position: ["bottomRight"],
							showSizeChanger: true,
							pageSizeOptions: [4, 8, 16, 32, 64, 128, 256],
						}}
						columns={columns}
						dataSource={filterData}
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
		</>
	);
};

export default Category;
