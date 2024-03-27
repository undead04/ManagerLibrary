import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../context/store";
import { ToastContainer } from "react-toastify";

const GuestLayout = () => {
	const navigate = useNavigate();
	const token = useSelector(
		(state: RootState) => state.auth.user?.token,
	);

	useEffect(() => {
		if (token) {
			navigate("/home");
		}
	}, [token, navigate]);

	return (
		<>
			<ToastContainer />
			<div className="min-h-screen flex flex-col items-center justify-center py-4">
				<Outlet />
			</div>
		</>
	);
};

export default GuestLayout;
