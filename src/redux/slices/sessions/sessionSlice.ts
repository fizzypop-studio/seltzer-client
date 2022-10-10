import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	createUserWithEmailAndPassword,
	getCurrentUser,
	loginWithEmailAndPassword,
	logoutUserWithToken,
	requestAccessTokenWithRefreshToken,
	updateUserProfile,
	sendResetUserPasswordEmail,
	resetUserPassword,
} from 'services/api/sessionAPI';

function storeRefreshToken(token: string) {
	localStorage.setItem('refreshToken', token);
}

function removeRefreshToken() {
	localStorage.removeItem('refreshToken');
}

function getRefreshToken() {
	return localStorage.getItem('refreshToken');
}

export interface User {
	id?: string;
	email?: string;
	first_name?: string;
	last_name?: string;
	role?: string;
	createdAt?: string;
	token?: string;
}

export interface UserSignUpData {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
}

export interface UserLoginData {
	email: string;
	password: string;
}

export interface UserResetPasswordData {
	password: string;
	password_confirmation: string;
	reset_password_token: string | null;
}

interface AuthState {
	currentUser?: User;
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
	currentUser: {
		id: undefined,
		first_name: undefined,
		last_name: undefined,
		email: undefined,
		role: undefined,
		createdAt: undefined,
	},
	loading: false,
	error: false,
	errorMessages: [],
	accessToken: undefined,
	refreshToken: getRefreshToken(),
	expiresIn: undefined,
	tokenType: undefined,
};

export const signUpUser = createAsyncThunk(
	'session/signUpUser',
	async (payload: UserSignUpData, { rejectWithValue }) => {
		const response = await createUserWithEmailAndPassword(
			payload.first_name,
			payload.last_name,
			payload.email,
			payload.password
		);
		if (response.errors) {
			// The value we return becomes the `rejected` action payload
			return rejectWithValue(response);
		}

		// The value we return becomes the `fulfilled` action payload
		return response;
	}
);

export const updateProfile = createAsyncThunk(
	'session/updateProfile',
	async (payload: User, { rejectWithValue }) => {
		const response = await updateUserProfile(payload);
		if (response.errors) {
			// The value we return becomes the `rejected` action payload
			return rejectWithValue(response);
		}
		// The value we return becomes the `fulfilled` action payload
		return response;
	}
);

export const loginUser = createAsyncThunk(
	'session/loginUser',
	async (payload: UserLoginData, { rejectWithValue }) => {
		const loginResponse = await loginWithEmailAndPassword(
			payload.email,
			payload.password
		);
		if (loginResponse.error) {
			// The value we return becomes the `rejected` action payload
			return rejectWithValue(loginResponse);
		}
		const userResponse = await getCurrentUser(loginResponse.access_token);
		if (userResponse.error) {
			// The value we return becomes the `rejected` action payload
			return rejectWithValue(userResponse.data);
		}
		const response = {
			...loginResponse,
			...userResponse,
		};
		// The value we return becomes the `fulfilled` action payload
		return response;
	}
);

export const logoutUser = createAsyncThunk(
	'session/logoutUser',
	async (payload: string, { rejectWithValue }) => {
		const response = await logoutUserWithToken(payload);
		// if response has errors rejectwithvalue
		if (response.error) {
			// The value we return becomes the `rejected` action payload
			return rejectWithValue(response);
		}
		// The value we return becomes the `fulfilled` action payload
		return response;
	}
);

export const sendResetPasswordEmail = createAsyncThunk(
	'session/sendResetPasswordEmail',
	async (payload: string, { rejectWithValue }) => {
		const response = await sendResetUserPasswordEmail(payload);
		// if response has errors rejectwithvalue
		if (response.error) {
			// The value we return becomes the `rejected` action payload
			return rejectWithValue(response);
		}
		// The value we return becomes the `fulfilled` action payload
		return response;
	}
);

export const resetPassword = createAsyncThunk(
	'session/resetPassword',
	async (payload: UserResetPasswordData, { rejectWithValue }) => {
		const response = await resetUserPassword(
			payload.password,
			payload.password_confirmation,
			payload.reset_password_token
		);
		// if response has errors rejectwithvalue
		if (response.error) {
			// The value we return becomes the `rejected` action payload
			return rejectWithValue(response);
		}
		// The value we return becomes the `fulfilled` action payload
		return response;
	}
);

export const refreshAccessToken = createAsyncThunk(
	'session/refreshAccessToken',
	async (refreshToken: string | undefined | null, { rejectWithValue }) => {
		if (!refreshToken) {
			return rejectWithValue('No refresh token');
		}

		const refreshResponse = await requestAccessTokenWithRefreshToken(
			refreshToken
		);
		if (refreshResponse.error) {
			// The value we return becomes the `rejected` action payload
			return rejectWithValue(refreshResponse.data);
		}
		const userResponse = await getCurrentUser(refreshResponse.access_token);
		if (userResponse.error) {
			// The value we return becomes the `rejected` action payload
			return rejectWithValue(userResponse.data);
		}
		const response = {
			...refreshResponse,
			...userResponse,
		};
		// The value we return becomes the `fulfilled` action payload
		return response;
	}
);

export const sessionSlice = createSlice({
	name: 'session',
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
			.addCase(signUpUser.pending, (state) => {
				state.loading = true;
				state.error = false;
				state.errorMessages = [];
			})
			.addCase(signUpUser.fulfilled, (state, action: any) => {
				state.accessToken = action.payload.access_token;
				state.refreshToken = action.payload.refresh_token;
				state.expiresIn = action.payload.expires_in;
				state.tokenType = action.payload.token_type;
				state.currentUser = {
					id: action.payload.id,
					first_name: action.payload.first_name,
					last_name: action.payload.last_name,
					email: action.payload.email,
					role: action.payload.role,
					createdAt: action.payload.created_at,
				};
				storeRefreshToken(action.payload.refresh_token);

				state.loading = false;
				state.error = false;
				state.errorMessages = [];
			})
			.addCase(signUpUser.rejected, (state, action: any) => {
				state.loading = false;
				state.error = true;
				state.errorMessages = action.payload.errors;
			})
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = false;
				state.errorMessages = [];
			})
			.addCase(loginUser.fulfilled, (state, action: any) => {
				state.accessToken = action.payload.access_token;
				state.refreshToken = action.payload.refresh_token;
				state.expiresIn = action.payload.expires_in;
				state.currentUser = {
					id: action.payload.id,
					first_name: action.payload.first_name,
					last_name: action.payload.last_name,
					email: action.payload.email,
					role: action.payload.role,
					createdAt: action.payload.created_at,
				};
				storeRefreshToken(action.payload.refresh_token);

				state.loading = false;
				state.error = false;
				state.errorMessages = [];
			})
			.addCase(loginUser.rejected, (state) => {
				state.loading = false;
				state.error = true;
				state.errorMessages = [
					'Invalid credentials. Did you enter them correctly?',
				];
			})
			.addCase(refreshAccessToken.pending, (state) => {
				state.loading = true;
				state.error = false;
				state.errorMessages = [];
			})
			.addCase(refreshAccessToken.fulfilled, (state, action: any) => {
				state.accessToken = action.payload.access_token;
				state.refreshToken = action.payload.refresh_token;
				state.expiresIn = action.payload.expires_in;
				state.currentUser = {
					id: action.payload.id,
					first_name: action.payload.first_name,
					last_name: action.payload.last_name,
					email: action.payload.email,
					role: action.payload.role,
					createdAt: action.payload.created_at,
				};
				storeRefreshToken(action.payload.refresh_token);

				state.loading = false;
				state.error = false;
				state.errorMessages = [];
			})
			.addCase(refreshAccessToken.rejected, (state) => {
				state.loading = false;
				state.error = true;
			})
			.addCase(logoutUser.pending, (state) => {
				state.loading = true;
				state.error = false;
				state.errorMessages = [];
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.currentUser = {
					id: undefined,
					first_name: undefined,
					last_name: undefined,
					email: undefined,
					role: undefined,
					createdAt: undefined,
				};
				state.accessToken = undefined;
				state.refreshToken = undefined;
				state.expiresIn = undefined;
				state.tokenType = undefined;
				removeRefreshToken();

				state.loading = false;
				state.error = false;
				state.errorMessages = [];
			})
			.addCase(sendResetPasswordEmail.rejected, (state, action: any) => {
				state.loading = false;
				state.error = true;
				state.errorMessages = [action.payload.error];
			})
			.addCase(sendResetPasswordEmail.pending, (state) => {
				state.loading = true;
				state.error = false;
				state.errorMessages = [];
			})
			.addCase(sendResetPasswordEmail.fulfilled, (state) => {
				state.loading = false;
				state.error = false;
				state.errorMessages = [];
			})
			.addCase(resetPassword.rejected, (state, action: any) => {
				state.loading = false;
				state.error = true;
				state.errorMessages = [action.payload.error];
			})
			.addCase(resetPassword.pending, (state) => {
				state.loading = true;
				state.error = false;
				state.errorMessages = [];
			})
			.addCase(resetPassword.fulfilled, (state) => {
				state.loading = false;
				state.error = false;
				state.errorMessages = [];
			})
			.addCase(logoutUser.rejected, (state, action: any) => {
				state.loading = false;
				state.error = true;
				state.errorMessages = [action.payload.error];
			})
			.addCase(updateProfile.pending, (state) => {
				state.loading = true;
				state.error = false;
				state.errorMessages = [];
			})
			.addCase(updateProfile.fulfilled, (state, action: any) => {
				state.accessToken = action.payload.access_token;
				state.refreshToken = action.payload.refresh_token;
				state.expiresIn = action.payload.expires_in;
				state.tokenType = action.payload.token_type;
				state.currentUser = {
					id: action.payload.id,
					first_name: action.payload.first_name,
					last_name: action.payload.last_name,
					email: action.payload.email,
					role: action.payload.role,
					createdAt: action.payload.created_at,
				};
				storeRefreshToken(action.payload.refresh_token);

				state.loading = false;
				state.error = false;
				state.errorMessages = [];
			})
			.addCase(updateProfile.rejected, (state, action: any) => {
				state.loading = false;
				state.error = true;
				state.errorMessages = action.payload.errors;
			});
	},
});

export const { resetErrorState } = sessionSlice.actions;

export default sessionSlice.reducer;
