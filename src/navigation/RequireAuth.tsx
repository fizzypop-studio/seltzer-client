import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loader } from 'components';
import { ErrorPage } from 'pages/error/ErrorPage';

import { RootState } from 'redux/store';

export const RequireAuth: React.FC<{ children: any }> = ({ children }) => {
	const loading = useSelector((state: RootState) => state.session.loading);
	const accessToken = useSelector(
		(state: RootState) => state.session.accessToken
	);
	const location = useLocation();
	const fromLocation = (location.state as any)?.from;
	const previousLocation = fromLocation
		? fromLocation
		: { pathname: '/login' };

	if (accessToken) {
		return children;
	} else if (loading) {
		return <Loader />;
	} else if (!accessToken && !loading) {
		return (
			<Navigate
				to={previousLocation}
				state={{ from: location }}
				replace
			/>
		);
	} else {
		return <ErrorPage />;
	}
};
