import clsx from "clsx";
import { useEffect, useState } from "react";

export const OfflineStatus = () => {
	const [isOnline, setIsOnline] = useState(navigator.onLine);

	useEffect(() => {
		const handleOnline = () => setIsOnline(true);
		const handleOffline = () => setIsOnline(false);

		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);

		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, []);

	return (
		<div
			className={clsx(
				"fixed top-1 right-1 p-1 rounded",
				isOnline ? "bg-green-500" : "bg-red-500",
			)}
		/>
	);
};
