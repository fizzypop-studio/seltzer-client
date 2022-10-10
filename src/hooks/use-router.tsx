import { Dashboard, Group } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// Used to render route constants & custom functions for routing
export const useRouter = () => {
	const { t } = useTranslation();
	const drawerRoutes = [
		{
			label: t('navigation.pages.dashboard'),
			icon: <Dashboard />,
			to: '/dashboard',
		},
		{
			label: t('navigation.pages.contacts'),
			icon: <Group />,
			to: '/dashboard/contacts',
		},
	];

	return { drawerRoutes };
};
