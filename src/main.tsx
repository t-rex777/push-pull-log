import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import "./input.css";
import { routeTree } from "./routeTree.gen";

// Set up a Router instance
const router = createRouter({
	routeTree,
	defaultPreload: "intent",
});

// Register things for typesafety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

// Register service worker
if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		console.log("Service worker registration...");

		navigator.serviceWorker
			.register("/service-worker.js")
			.then((registration) => {
				console.log("SW registered:", registration);
			})
			.catch((error) => {
				console.log("SW registration failed:", error);
			});
	});
}

const rootElement = document.getElementById("app") as HTMLElement;

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(<RouterProvider router={router} />);
}
