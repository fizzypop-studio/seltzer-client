import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		primary: {
			light: '#9C9C9C',
			main: '#252627',
			dark: '#000',
			contrastText: '#fff',
		},
		background: {
			default: '#FAF9F6',
		},
		secondary: {
			light: '#FFD0D5',
			main: '#E16F7C',
			dark: '#B25963',
		},
	},
});

// Additional Colors used in application - not part of Material UI
export const colors = {
	tertiary: {
		light: '#c1a2e0',
		main: '#443850',
		dark: '#3b3145',
	},
	green: {
		light: '#c8e3d3',
		main: '#76877D',
		dark: '#2c332f',
	},
	gray: {
		light: '#ececec',
		main: '#A9A9A9',
		dark: '#818589',
	},
};
