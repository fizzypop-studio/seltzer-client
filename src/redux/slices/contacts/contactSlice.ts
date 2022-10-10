import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	getContacts,
	getContact,
	createContact,
	updateContact,
	deleteContact,
} from 'services/api/contactAPI';

export interface Contact {
	id?: string;
	email?: string;
	first_name?: string;
	last_name?: string;
	role?: string;
	created_at?: string;
	token?: string | undefined;
	user_id?: string | undefined;
}

export interface ContactFetchData {
	id?: string | undefined;
	token?: string | undefined;
}

interface AuthState {
	userContacts?: any;
	profile?: Contact;
	loading: boolean;
	error: boolean;
	errorMessages: string[];
	accessToken?: string;
	refreshToken?: string | null;
	expiresIn?: number;
	tokenType?: string;
	currentRoute?: string;
}

const initialState: AuthState = {
	userContacts: [],
	profile: {
		id: undefined,
		first_name: undefined,
		last_name: undefined,
		email: undefined,
		role: undefined,
		created_at: undefined,
	},
	loading: false,
	error: false,
	errorMessages: [],
};

export const getUserContacts = createAsyncThunk(
	'session/getUserContacts',
	async (payload: string, { rejectWithValue }) => {
		const response = await getContacts(payload);
		if (response.errors) {
			// The value we return becomes the `rejected` action payload
			return rejectWithValue(response);
		}
		// The value we return becomes the `fulfilled` action payload
		return response;
	}
);

export const getUserContact = createAsyncThunk(
	'session/getUserContact',
	async (payload: ContactFetchData, { rejectWithValue }) => {
		const response = await getContact(payload.id, payload.token);
		if (response.errors) {
			// The value we return becomes the `rejected` action payload
			return rejectWithValue(response);
		}
		// The value we return becomes the `fulfilled` action payload
		return response;
	}
);

export const createUserContact = createAsyncThunk(
	'session/createUserContact',
	async (payload: Contact, { rejectWithValue }) => {
		const response = await createContact(payload, payload.token);
		if (response.errors) {
			// The value we return becomes the `rejected` action payload
			return rejectWithValue(response);
		}
		// The value we return becomes the `fulfilled` action payload
		return response;
	}
);

export const updateUserContact = createAsyncThunk(
	'session/updateUserContact',
	async (payload: Contact, { rejectWithValue }) => {
		const response = await updateContact(payload, payload.token);
		if (response.errors) {
			// The value we return becomes the `rejected` action payload
			return rejectWithValue(response);
		}
		// The value we return becomes the `fulfilled` action payload
		return response;
	}
);

export const deleteUserContact = createAsyncThunk(
	'session/deleteUserContact',
	async (payload: ContactFetchData, { rejectWithValue }) => {
		const response = await deleteContact(payload.id, payload.token);
		if (response.errors) {
			// The value we return becomes the `rejected` action payload
			return rejectWithValue(response);
		}
		// The value we return becomes the `fulfilled` action payload
		return response;
	}
);

export const contactSlice = createSlice({
	name: 'contact',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		resetErrorState: (state) => {
			state.error = false;
			state.errorMessages = [];
		},
	},
	// The `extraReducers` field lets the slice handle actions defined elsewhere,
	// including actions generated by createAsyncThunk or in other slices.
	extraReducers: (builder) => {
		builder
			.addCase(getUserContacts.pending, (state) => {
				state.loading = true;
				state.error = false;
				state.errorMessages = [];
			})
			.addCase(getUserContacts.fulfilled, (state, action: any) => {
				state.userContacts = action.payload;

				state.loading = false;
				state.error = false;
				state.errorMessages = [];
			})
			.addCase(getUserContacts.rejected, (state, action: any) => {
				state.loading = false;
				state.error = true;
				state.errorMessages = action.payload.errors;
			})
			.addCase(getUserContact.pending, (state) => {
				state.loading = true;
				state.error = false;
				state.errorMessages = [];
			})
			.addCase(getUserContact.fulfilled, (state, action: any) => {
				state.profile = {
					id: action.payload.id,
					first_name: action.payload.first_name,
					last_name: action.payload.last_name,
					email: action.payload.email,
					role: action.payload.role,
					created_at: action.payload.created_at,
				};

				state.loading = false;
				state.error = false;
				state.errorMessages = [];
			})
			.addCase(getUserContact.rejected, (state, action: any) => {
				state.loading = false;
				state.error = true;
				state.errorMessages = action.payload.errors;
			})
			.addCase(createUserContact.pending, (state) => {
				state.loading = true;
				state.error = false;
				state.errorMessages = [];
			})
			.addCase(createUserContact.fulfilled, (state, action: any) => {
				state.userContacts = [
					...state.userContacts,
					{
						id: action.payload.id,
						first_name: action.payload.first_name,
						last_name: action.payload.last_name,
						email: action.payload.email,
						role: action.payload.role,
						createdAt: action.payload.created_at,
					},
				];

				state.loading = false;
				state.error = false;
				state.errorMessages = [];
			})
			.addCase(createUserContact.rejected, (state, action: any) => {
				state.loading = false;
				state.error = true;
				state.errorMessages = action.payload.errors;
			})
			.addCase(updateUserContact.pending, (state) => {
				state.loading = true;
				state.error = false;
				state.errorMessages = [];
			})
			.addCase(updateUserContact.fulfilled, (state, action: any) => {
				state.profile = {
					id: action.payload.id,
					first_name: action.payload.first_name,
					last_name: action.payload.last_name,
					email: action.payload.email,
					role: action.payload.role,
					created_at: action.payload.created_at,
				};

				state.loading = false;
				state.error = false;
				state.errorMessages = [];
			})
			.addCase(updateUserContact.rejected, (state, action: any) => {
				state.loading = false;
				state.error = true;
				state.errorMessages = action.payload.errors;
			})
			.addCase(deleteUserContact.pending, (state) => {
				state.loading = true;
				state.error = false;
				state.errorMessages = [];
			})
			.addCase(deleteUserContact.fulfilled, (state, action: any) => {
				const contacts = [...state.userContacts];
				const indexOfContact = contacts.findIndex((contact) => {
					return contact.id === action.payload.id;
				});

				contacts.splice(indexOfContact, 1);

				state.userContacts = contacts;

				state.loading = false;
				state.error = false;
				state.errorMessages = [];
			})
			.addCase(deleteUserContact.rejected, (state, action: any) => {
				state.loading = false;
				state.error = true;
				state.errorMessages = action.payload.errors;
			});
	},
});

export const { resetErrorState } = contactSlice.actions;

export default contactSlice.reducer;