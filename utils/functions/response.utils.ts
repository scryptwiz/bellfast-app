import axios from "axios";

export const getError = (error: unknown) => {
	if (axios.isAxiosError(error)) {
		if (error.response?.data) {
			return error.response?.data || { message: 'An error occurred', title: "something happened" };
		}
	}

	return { title: "something happened", message: 'An unexpected error occurred' };
};