import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./context/store.ts";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<RouterProvider router={router} />
			</PersistGate>
		</Provider>
	</React.StrictMode>,
);
