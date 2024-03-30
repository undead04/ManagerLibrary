import React from "react";

const UnauthorizedLayout = () => {
	return (
		<div className="flex items-center justify-around bg-white border-blue-700 border-4 text-blue-600 rounded-md min-h-[700px] overflow-hidden">
			<div className="flex flex-1 flex-col items-center justify-center mb-6">
				<div className=" text-[200px] font-bold tracking-widest ">
					401
				</div>

				<div className="text-5xl font-semibold">Go to home</div>
			</div>
		</div>
	);
};

export default UnauthorizedLayout;
