import { User } from './User';

export type ReduxUser = {
	user: {
		value: User | null;
		status: string;
		error: string;
	};
};

export type ReduxNavigation = {
	navigation: {
		drawerOpen: boolean;
	};
};
