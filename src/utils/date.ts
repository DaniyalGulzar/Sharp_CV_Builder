import { format } from "date-fns";

export const formatDate = (date: string | Date, dateFormat: string = "MMMM yyyy", fallBack = "N/A") => {
	try {
		if (!date) {
			return fallBack;
		}
		const dt = new Date(date);
		const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
		return format(dtDateOnly, dateFormat);
	} catch (error) {
		return fallBack;
	}
};

export const addDates = (
	date: string | Date | number,
	addedDays: number = 0
) => {
	let newDate = new Date(date);
	newDate.setDate(newDate.getDate() + addedDays);
	return newDate.toISOString();
};
