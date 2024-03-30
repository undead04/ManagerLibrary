import React from "react";
import { Link } from "react-router-dom";

const NetWorkError = () => {
	return (
		<div className="flex items-center justify-center h-screen bg-blue-500">
			<div className="p-12 border-8 rounded-lg">
				<div className="flex items-center gap-8 text-white">
					<div className="text-[200px] font-bold leading-[200px]">
						403
					</div>

					<div className="font-bold text-5xl pl-8 uppercase mt-4">
						- Error Network
					</div>
				</div>
				<div className="text-center text-3xl underline text-white mt-8">
					<Link to={"/home"}>Move to Home</Link>
				</div>
			</div>
		</div>
	);
};

export default NetWorkError;
