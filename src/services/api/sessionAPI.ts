import axios from './axios';

const LOGIN_URL = '/oauth/token';
const SIGNUP_URL = '/users';
const UPDATE_PROFILE_URL = '/users';
const LOGOUT_URL = '/oauth/revoke';
const CURRENT_USER_URL = '/users/me';
const SEND_RESET_PASSWORD_URL = '/users/send-reset-password';
const RESET_PASSWORD_URL = '/users/reset-password';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

export interface User {
	id?: string;
	email?: string;
	first_name?: string;
	last_name?: string;
	role?: string;
	createdAt?: string;
	token?: string;
}

export async function createUserWithEmailAndPassword(
	firstName: string,
	lastName: string,
	email: string,
	password: string
) {
	const data = {
		first_name: firstName,
		last_name: lastName,
		email,
		password,
		client_id: CLIENT_ID,
	};

	return axios
		.post(SIGNUP_URL, data)
		.then((response: any) => {
			return response.data;
		})
		.catch((error: any) => {
			return error.response.data;
		});
}

export async function loginWithEmailAndPassword(
	email: string,
	password: string
) {
	const data = {
		grant_type: 'password',
		email,
		password,
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
	};

	return axios
		.post(LOGIN_URL, data)
		.then((response: any) => {
			return response.data;
		})
		.catch((error: any) => {
			return error.response.data;
		});
}

export async function updateUserProfile(userData: User) {
	const data = {
		...userData,
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
	};
	const config = {
		headers: {
			Authorization: `Bearer ${userData.token}`,
		},
	};

	return axios
		.patch(UPDATE_PROFILE_URL, data, config)
		.then((response: any) => {
			return response.data;
		})
		.catch((error: any) => {
			return error.response.data;
		});
}

export async function logoutUserWithToken(token: string) {
	const data = {
		token: token,
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
	};

	return axios
		.post(LOGOUT_URL, data)
		.then((response: any) => {
			return response.data;
		})
		.catch((error: any) => {
			return error.response.data;
		});
}

export async function requestAccessTokenWithRefreshToken(refreshToken: string) {
	const data = {
		grant_type: 'refresh_token',
		refresh_token: refreshToken,
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
	};

	return axios
		.post(LOGIN_URL, data)
		.then((response: any) => {
			return response.data;
		})
		.catch((error: any) => {
			return error.response.data;
		});
}

export async function getCurrentUser(accessToken: string) {
	const config = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};

	return axios
		.get(CURRENT_USER_URL, config)
		.then((response: any) => {
			return response.data;
		})
		.catch((error: any) => {
			return error.response.data;
		});
}

export async function sendResetUserPasswordEmail(email: string) {
	const data = {
		email,
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
	};

	return axios
		.post(SEND_RESET_PASSWORD_URL, data)
		.then((response: any) => {
			return response.data;
		})
		.catch((error: any) => {
			return error.response.data;
		});
}

export async function resetUserPassword(
	password: string,
	passwordConfirmation: string,
	resetPasswordToken: string | null
) {
	const data = {
		password,
		password_confirmation: passwordConfirmation,
		reset_password_token: resetPasswordToken,
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
	};

	return axios
		.put(RESET_PASSWORD_URL, data)
		.then((response: any) => {
			return response.data;
		})
		.catch((error: any) => {
			return error.response.data;
		});
}
