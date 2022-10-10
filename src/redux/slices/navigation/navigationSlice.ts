import { createSlice } from '@reduxjs/toolkit';

export const navigationSlice = createSlice({
	name: 'navigation',
	initialState: {
		drawerOpen: false,
	},
	reducers: {
		toggleDrawer: (state: any, action: any) => {
			state.drawerOpen = action.payload;
		},
	},
	extraReducers: {},
});

export const { toggleDrawer } = navigationSlice.actions;

export default navigationSlice.reducer;
