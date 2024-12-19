import { parsePhoneNumber } from "react-phone-number-input";

export const customFormatPhoneNumber = (rawNumber: string) => {
	const phoneNumber = parsePhoneNumber(rawNumber);
	if (!phoneNumber) {
		return phoneNumber; // if invalid phone then return same string
	}

	const countryCode = phoneNumber.countryCallingCode;
	const formattedInternational = phoneNumber.formatInternational();

	const formattedNational = formattedInternational
		.replace('+', '')
		.replace(countryCode, '')
		.trim();
	const nationalWithoutSpaces = formattedNational.replace(/\s/g, '-');

	return `(+${countryCode}) ${nationalWithoutSpaces}`;
};
