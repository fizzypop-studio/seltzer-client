import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import './index.css';
import './i18n';

import Router from './Router';
import { store } from 'redux/store';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<HelmetProvider>
		<React.StrictMode>
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<Router />
				</Provider>
			</ThemeProvider>
		</React.StrictMode>
	</HelmetProvider>
);
