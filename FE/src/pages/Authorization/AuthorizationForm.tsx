import { Button, Checkbox, Divider, Flex, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../context/store";
import { useSelector } from "react-redux";
import {
	addRole,
	cancelEdittingRole,
	getRole,
	getRoles,
	updateRole,
} from "../../context/Role/role.slice";
import { toast } from "react-toastify";
import { IClaim } from "../../type";

const AuthorizationForm = () => {
	const dispatch = useAppDispatch();

	const edittingRole = useSelector(
		(state: RootState) => state.role.edittingRole,
	);
	const plainOptions = [
		{
			name: "Books",
			options: [
				{ name: "Read", key: "isBookRead" },
				{ name: "Create & Update", key: "isBookEditAndCreate" },
				{ name: "Delete", key: "isBookDelete" },
			],
			key: "books",
		},
		{
			name: "Borrow services",
			options: [
				{ name: "Read", key: "isBorrowBookRead" },
				{ name: "Create & Update", key: "isBorrowBookCreateAndEdit" },
			],
			key: "borrow",
		},
		{
			name: "Category",
			options: [
				{ name: "Read", key: "isCategoryRead" },
				{ name: "Create & Update", key: "isCategoryEditAndCreate" },
				{ name: "Delete", key: "isCategoryDelete" },
			],
			key: "categories",
		},
		{
			name: "Import books",
			options: [
				{ name: "Read", key: "isImportBookRead" },
				{ name: "Create", key: "isImportBookCreate" },
			],
			key: "import",
		},
		{
			name: "Income",
			options: [{ name: "Read", key: "isIncomeRead" }],
			key: "income",
		},
		{
			name: "Member",
			options: [
				{ name: "Read", key: "isMemberRead" },
				{ name: "Create & Update", key: "isMemberEditAndCreate" },
				{ name: "Delete", key: "isMemberDelete" },
			],
			key: "members",
		},
		{
			name: "Staffs",
			options: [
				{ name: "Read", key: "isStaffRead" },
				{ name: "Create & Update", key: "isStaffEditAndCreate" },
				{ name: "Delete", key: "isStaffDelete" },
			],
			key: "staffs",
		},
		{
			name: "Authorization",
			options: [
				{ name: "Read", key: "isRoleRead" },
				{ name: "Create & Update", key: "isRoleEditAndCreate" },
				{ name: "Delete", key: "isRoleDelete" },
			],
			key: "staffs",
		},
	];
	const handleSubmit = () => {
		console.log("ruleList", ruleList);
		console.log("roleName", roleName);

		if (roleName === "") {
			toast.info("The name fields is required!");
		} else {
			if (edittingRole && edittingRole.id) {
				dispatch(
					updateRole({
						data: {
							name: roleName,
							claims: ruleList,
						},
						id: edittingRole.id,
					}),
				)
					.unwrap()
					.then(() => {
						reload();
						handleClear();
					})
					.catch();
			} else {
				dispatch(
					addRole({
						name: roleName,
						claims: ruleList,
					}),
				)
					.unwrap()
					.then((res) => {
						console.log(res);

						reload();
						handleClear();
					})
					.catch();
			}
		}
	};

	useEffect(() => {
		if (edittingRole?.id) {
			dispatch(getRole(edittingRole.id))
				.unwrap()
				.then((res) => {
					if (res && res.name) {
						setRoleName(res.name);
					}

					if (res && res.claims) {
						console.log(res.claims);

						setRuleList(res.claims);
					}
				});
		}
	}, [edittingRole?.id, dispatch]);
	const initialRuleList: IClaim = {
		isBookRead: false,
		isBookEditAndCreate: false,
		isBookDelete: false,
		isStaffRead: false,
		isStaffDelete: false,
		isStaffEditAndCreate: false,
		isMemberRead: false,
		isMemberDelete: false,
		isMemberEditAndCreate: false,
		isCategoryRead: false,
		isCategoryEditAndCreate: false,
		isCategoryDelete: false,
		isBorrowBookRead: false,
		isBorrowBookCreateAndEdit: false,
		isImportBookRead: false,
		isImportBookCreate: false,
		isIncomeRead: false,
		isRoleDelete: false,
		isRoleRead: false,
		isRoleEditAndCreate: false,
	};
	const [roleName, setRoleName] = useState("");
	const [ruleList, setRuleList] = useState(initialRuleList);

	const handleCancelEdit = () => {
		dispatch(cancelEdittingRole());
		handleClear();
	};

	const handleClear = () => {
		setRoleName("");
		setRuleList(initialRuleList);
	};

	const reload = () => {
		dispatch(getRoles());
	};
	return (
		<div>
			<Flex align="center" justify="space-between">
				<div className="text-3xl font-semibold my-2">
					{edittingRole?.id ? "Edit role " : "Create a new role"}
				</div>

				<Button
					type="default"
					disabled={!edittingRole?.id}
					onClick={handleCancelEdit}
					size="large"
				>
					Cancel
				</Button>
			</Flex>

			<div className="mt-8">
				<Form
					layout="horizontal"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 20 }}
					labelAlign="left"
				>
					<div className="mb-4">
						<div>
							<Form.Item
								label={
									<div className="font-semibold text-lg">
										Name<span className="text-red-500">*</span>
									</div>
								}
							>
								<Input
									size="large"
									value={roleName}
									onChange={(e) => setRoleName(e.target.value)}
								/>
							</Form.Item>

							<Divider />

							{plainOptions.map((p) => (
								<>
									<Form.Item label={p.name}>
										<div className="flex flex-col">
											{p.options.map((o) => (
												<Checkbox
													key={o.key}
													checked={
														ruleList[o.key as keyof typeof ruleList]
													}
													onChange={(e) =>
														setRuleList((prev) => ({
															...prev,
															[o.key]: e.target.checked,
														}))
													}
												>
													{o.name}
												</Checkbox>
											))}
										</div>
									</Form.Item>
									<Divider />
								</>
							))}
						</div>
					</div>

					<Flex justify="end">
						<Button
							type="primary"
							onClick={handleSubmit}
							size="large"
						>
							Save
						</Button>
					</Flex>
				</Form>
			</div>
		</div>
	);
};

export default AuthorizationForm;
