import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./Layout/GuestLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import UserLayout from "./Layout/UserLayout";
import Home from "./pages/Home/Home";
import Book from "./pages/Book/Book";
import BookDetail from "./pages/Book/BookDetail";
import BookForm from "./pages/Book/BookForm";
import Staff from "./pages/Staff/Staff";
import StaffDetail from "./pages/Staff/StaffDetail";
import StaffForm from "./pages/Staff/StaffForm";
import Guest from "./pages/Guest/Guest";
import GuessDetail from "./pages/Guest/GuestDetail";
import GuestForm from "./pages/Guest/GuestForm";
import Library from "./pages/Library/Library";
import CouponDetail from "./pages/Library/Coupon/CouponDetail";
import CouponAdd from "./pages/Library/Coupon/CouponAdd";
import Category from "./pages/Category/Category";
import CategoryForm from "./pages/Category/CategoryForm";
import Income from "./pages/Income/Income";
import Authorization from "./pages/Authorization/Authorization";
import AuthorizationForm from "./pages/Authorization/AuthorizationForm";
import BookEntryForm from "./pages/Book/BookEntryForm";

const router = createBrowserRouter([
	{
		path: "/",
		element: <GuestLayout />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
		],
	},
	{
		path: "/",
		element: <UserLayout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/home",
				element: <Home />,
			},
			{
				path: "/book",
				element: <Book />,
			},
			{
				path: "/book/entry",
				element: <BookEntryForm />,
			},
			{
				path: "/book/d/:id",
				element: <BookDetail />,
			},
			{
				path: "/book/add",
				element: <BookForm />,
			},
			{
				path: "/book/edit/:id",
				element: <BookForm />,
			},
			{
				path: "/staff",
				element: <Staff />,
			},
			{
				path: "/staff/d/:id",
				element: <StaffDetail />,
			},
			{
				path: "/staff/e/:id",
				element: <StaffForm />,
			},
			{
				path: "/staff/add",
				element: <StaffForm />,
			},
			{
				path: "/guest",
				element: <Guest />,
			},
			{
				path: "/guest/d/:id",
				element: <GuessDetail />,
			},
			{
				path: "/guest/add",
				element: <GuestForm />,
			},

			{
				path: "/library",
				element: <Library />,
			},
			{
				path: "/library/coupon/d/:id",
				element: <CouponDetail />,
			},
			{
				path: "/library/coupon/e/:id",
				element: <CouponAdd />,
			},
			{
				path: "/library/coupon/add",
				element: <CouponAdd />,
			},
			{
				path: "/category",
				element: <Category />,
			},
			{
				path: "/income",
				element: <Income />,
			},
			{
				path: "/authorization",
				element: <Authorization />,
			},
		],
	},
]);

export default router;
