import {
	Button,
	DatePicker,
	Descriptions,
	Divider,
	Form,
	Select,
	SelectProps,
	Spin,
	Transfer,
	TransferProps,
} from "antd";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export interface DebounceSelectProps<ValueType = any>
	extends Omit<
		SelectProps<ValueType | ValueType[]>,
		"options" | "children"
	> {
	fetchOptions: (search: string) => Promise<ValueType[]>;
	debounceTimeout?: number;
}

function DebounceSelect<
	ValueType extends {
		key?: string;
		label: React.ReactNode;
		value: string | number;
	} = any,
>({
	fetchOptions,
	debounceTimeout = 800,
	...props
}: DebounceSelectProps<ValueType>) {
	const [fetching, setFetching] = useState(false);
	const [options, setOptions] = useState<ValueType[]>([]);
	const fetchRef = useRef(0);

	const debounceFetcher = useMemo(() => {
		const loadOptions = (value: string) => {
			fetchRef.current += 1;
			const fetchId = fetchRef.current;
			setOptions([]);
			setFetching(true);

			fetchOptions(value).then((newOptions) => {
				if (fetchId !== fetchRef.current) {
					// for fetch callback order
					return;
				}

				setOptions(newOptions);
				setFetching(false);
			});
		};

		return loadOptions;
	}, [fetchOptions, debounceTimeout]);

	return (
		<Select
			labelInValue
			filterOption={false}
			onSearch={debounceFetcher}
			notFoundContent={fetching ? <Spin size="small" /> : null}
			{...props}
			options={options}
		/>
	);
}

interface BookType {
	key: string;
	title: string;
	description: string;
	chosen: boolean;
}

// Usage of DebounceSelect
interface UserValue {
	label: string;
	value: string;
}

async function fetchUserList(username: string): Promise<UserValue[]> {
	console.log("fetching user", username);

	return fetch("https://randomuser.me/api/?results=5")
		.then((response) => response.json())
		.then((body) =>
			body.results.map(
				(user: {
					name: { first: string; last: string };
					login: { username: string };
				}) => ({
					label: `${user.name.first} ${user.name.last}`,
					value: user.login.username,
				}),
			),
		);
}

const CouponAdd = () => {
	const [value, setValue] = useState<UserValue[]>([]);
	const { id } = useParams();
	const [mockData, setMockData] = useState<BookType[]>([]);
	const [targetKeys, setTargetKeys] = useState<string[]>([]);

	const getMock = () => {
		const tempTargetKeys = [];
		const tempMockData = [];
		for (let i = 0; i < 20; i++) {
			const data = {
				key: i.toString(),
				title: `Books${i + 1}`,
				description: `description of content${i + 1}`,
				chosen: i % 2 === 0,
			};

			tempMockData.push(data);
		}
		setMockData(tempMockData);
		setTargetKeys(tempTargetKeys);
	};

	useEffect(() => {
		getMock();
	}, []);

	const filterOption = (inputValue: string, option: BookType) =>
		option.description.indexOf(inputValue) > -1;

	const handleChange = (newTargetKeys: string[]) => {
		setTargetKeys(newTargetKeys);
	};

	const handleSearch: TransferProps["onSearch"] = (dir, value) => {
		console.log("search:", dir, value);
	};

	return (
		<div>
			<div className="text-3xl font-semibold my-2">
				{id ? "Edit Borrow Counpon " : "Add a new Borrow Counpon"}
			</div>

			<Divider />
			<Form>
				<Descriptions title="Choose a Guest"></Descriptions>
				<DebounceSelect
					value={value}
					placeholder="Select users"
					fetchOptions={fetchUserList}
					onChange={(newValue) => {
						setValue(newValue as UserValue[]);
					}}
					style={{ width: "100%" }}
				/>

				<Divider />
				<Descriptions title="Select books"></Descriptions>
				<Transfer
					style={{ justifyContent: "center" }}
					dataSource={mockData}
					showSearch
					filterOption={filterOption}
					targetKeys={targetKeys}
					onChange={handleChange}
					onSearch={handleSearch}
					render={(item) => item.title}
				/>

				<Divider />

				<Form.Item label={"Expire Date"}>
					<DatePicker />
				</Form.Item>

				<div className="flex gap-4 justify-center mt-20">
					<Form.Item>
						<Button type="primary" htmlType="submit" size="large">
							Save
						</Button>
					</Form.Item>
					<Form.Item>
						<Button type="default" htmlType="reset" size="large">
							Cancel
						</Button>
					</Form.Item>
				</div>
			</Form>
		</div>
	);
};

export default CouponAdd;
