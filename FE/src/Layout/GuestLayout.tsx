import React from "react";
import { Outlet } from "react-router-dom";

const GuestLayout = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center py-4">
			<Outlet />
		</div>
	);
};

export default GuestLayout;
