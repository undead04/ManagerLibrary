import React, { useState } from "react";
import { Drawer } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import Sidebar from "../../Layout/components/Sidebar";

const Home = () => {
	const [open, setOpen] = useState(false);

	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	return (
		<>
			<div className="grid grid-cols-4 h-screen">
				<div className="col-span-3">
					<img
						className="object-cover h-screen"
						src="/library.jpeg"
					/>
				</div>

				<div>
					<div className=" font-bold flex flex-col items-end gap-4 mr-10 justify-center h-screen">
						<div className="text-[100px] text-gray-50 text-border-white">
							Welcome!
						</div>

						<div
							onClick={showDrawer}
							className="text-xl flex items-center gap-2 hover:text-blue-600 cursor-pointer underline"
						>
							<span className="mb-1 text-lg font-serif">
								Let's discovering
							</span>{" "}
							<ArrowRightOutlined />
						</div>
					</div>
				</div>
			</div>

			<Drawer
				placement={"right"}
				width={"auto"}
				onClose={onClose}
				open={open}
			>
				<Sidebar />
			</Drawer>
		</>
	);
};

export default Home;
