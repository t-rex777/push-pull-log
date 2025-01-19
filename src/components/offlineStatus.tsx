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
				"fixed top-4 right-4 p-2 rounded",
				isOnline ? "bg-green-500" : "bg-red-500",
			)}
		>
			{isOnline ? "Online" : "Offline"}
		</div>
	);
};
