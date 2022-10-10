import axios from './axios';

const CONTACTS_URL = '/users/contacts';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

export interface Contact {
	id?: string;
	email?: string;
	first_name?: string;
	last_name?: string;
	role?: string;
	created_at?: string;
}

export async function getContacts(accessToken: string) {
	const config = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};
	return axios
		.get(CONTACTS_URL, config)
		.then((response: any) => {
			return response.data;
		})
		.catch((error: any) => {
			return error.response.data;
		});
}

export async function getContact(
	id: string | undefined,
	accessToken: string | undefined
) {
	const config = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};
	return axios
		.get(`${CONTACTS_URL}/${id}`, config)
		.then((response: any) => {
			return response.data;
		})
		.catch((error: any) => {
			return error.response.data;
		});
}

export async function createContact(
	data: Contact,
	accessToken: string | undefined
) {
	const config = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};
	return axios
		.post(CONTACTS_URL, data, config)
		.then((response: any) => {
			return response.data;
		})
		.catch((error: any) => {
			return error.response.data;
		});
}

export async function updateContact(
	data: Contact,
	accessToken: string | undefined
) {
	const config = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};

	return axios
		.put(`${CONTACTS_URL}/${data.id}`, data, config)
		.then((response: any) => {
			return response.data;
		})
		.catch((error: any) => {
			return error.response.data;
		});
}

export async function deleteContact(
	id: string | undefined,
	accessToken: string | undefined
) {
	const config = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};
	return axios
		.delete(`${CONTACTS_URL}/${id}`, config)
		.then((response: any) => {
			return response.data;
		})
		.catch((error: any) => {
			return error.response.data;
		});
}
