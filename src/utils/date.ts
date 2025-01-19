const currentDate = new Date();

export function getCurrentDate() {
	return {
		year: currentDate.getFullYear(),
		month: currentDate.getMonth(),
		day: currentDate.getDate(),
		hour: currentDate.getHours(),
		minute: currentDate.getMinutes(),
	};
}
