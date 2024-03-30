import { Tabs, TabsProps } from "antd";
import React from "react";
import BookEntryView from "./BookEntryView";
import { useSelector } from "react-redux";
import { RootState } from "../../context/store";
import BookEntryForm from "./BookEntryForm";

const items: TabsProps["items"] = [
	{
		key: "isImportBookRead",
		label: "Views",
		children: <BookEntryView />,
	},
	{
		key: "isImportBookCreate",
		label: "Create",
		children: <BookEntryForm />,
	},
];

const BookEntry = () => {
	const authRole = useSelector(
		(state: RootState) => state.auth.user?.claims,
	);

	const authorizeTabs = items.filter(
		(i) => authRole && authRole[i.key as keyof typeof authRole],
	);
	return (
		<Tabs
			defaultActiveKey={authorizeTabs[0].key}
			items={authorizeTabs}
		/>
	);
};

export default BookEntry;
