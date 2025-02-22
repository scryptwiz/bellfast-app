type ValidationRule = {
	value: any;
	errorSetter: (error: string) => void;
	errorMessage: string;
	isValid?: boolean | ((value: any) => boolean);
};

export const validateFields = (validations: ValidationRule[]): boolean => {
	return validations.every(({ value, errorSetter, errorMessage, isValid = true }) => {
		const isFieldValid = typeof isValid === 'function' ? isValid(value) : isValid;

		if (!value || !isFieldValid) {
			errorSetter(errorMessage);
			return false;
		} else {
			errorSetter('');
			return true;
		}
	});
};


export const validateEmail = (email: string): boolean => {
	const re = /\S+@\S+\.\S+/;
	return re.test(email);
};

export const validatePassword = (password: string): boolean => {
	if (password.length < 8) return false;

	// No spaces
	if (/\s/.test(password)) return false;

	// At least one symbol
	if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;

	// At least one number
	if (!/\d/.test(password)) return false;

	return true;
};