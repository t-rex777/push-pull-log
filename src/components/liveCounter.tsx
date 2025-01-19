import { useEffect, useState } from "react";
import { getCurrentDate } from "../utils/date";

const { day, month, year } = getCurrentDate();

function LiveTimeCounter() {
	const [currentTime, setCurrentTime] = useState(
		new Date(year, month, day, 0, 0),
	);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentTime((prev) => {
				prev.setSeconds(prev.getSeconds() + 1);

				return new Date(prev);
			});
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<div>
			<h1>Current Time:</h1>
			<p>{currentTime.toLocaleTimeString()}</p>
		</div>
	);
}

export default LiveTimeCounter;
