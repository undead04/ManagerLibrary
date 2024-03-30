import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./Layout/GuestLayout";
import Login from "./pages/Auth/Login";
import UserLayout from "./Layout/UserLayout";
import Home from "./pages/Home/Home";
import Book from "./pages/Book/Book";
import BookDetail from "./pages/Book/BookDetail";
import Staff from "./pages/Staff/Staff";
import StaffDetail from "./pages/Staff/StaffDetail";
import Guest from "./pages/Guest/Guest";
import GuessDetail from "./pages/Guest/GuestDetail";
import Library from "./pages/Library/Library";
import CouponDetail from "./pages/Library/Coupon/CouponDetail";
import CouponAdd from "./pages/Library/Coupon/CouponAdd";
import Category from "./pages/Category/Category";
import Income from "./pages/Income/Income";
import Authorization from "./pages/Authorization/Authorization";
import BookEntry from "./pages/BookEntry/BookEntry";
import NetWorkError from "./pages/ErrorPage/NetWorkError";
import PageNotFound from "./pages/ErrorPage/PageNotFound";

const router = createBrowserRouter([
	{
		path: "/",
		element: <GuestLayout />,
		children: [
			{
				path: "/",
				element: <Login />,
			},
			{
				path: "/login",
				element: <Login />,
			},
		],
	},
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/home",
		element: <Home />,
	},
	{
		path: "/",
		element: <UserLayout />,
		children: [
			{
				path: "/book",
				element: <Book />,
			},
			{
				path: "/book-entry",
				element: <BookEntry />,
			},
			{
				path: "/book/d/:id",
				element: <BookDetail />,
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
				path: "/guest",
				element: <Guest />,
			},
			{
				path: "/guest/d/:id",
				element: <GuessDetail />,
			},

			{
				path: "/library",
				element: <Library />,
			},
			{
				path: "/library/coupon/:id/memberId/:mbId",
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
	{
		path: "/network-error",
		element: <NetWorkError />,
	},
	{
		path: "/page-not-found",
		element: <PageNotFound />,
	},
	{
		path: "*",
		element: <PageNotFound />,
	},
]);

export default router;
