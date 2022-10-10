import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader } from 'components';
import { ErrorPage } from 'pages/error/ErrorPage';

import { RootState } from 'redux/store';

export const PublicOnlyRoute = ({ children }: any) => {
	const accessToken = useSelector(
		(state: RootState) => state.session.accessToken
	);
	const loading = useSelector((state: RootState) => state.session.loading);
	const location = useLocation();
	const fromLocation = (location.state as any)?.from;
	const previousLocation = fromLocation ? fromLocation : { pathname: '/' };

	if (!accessToken && !loading) {
		return children;
	} else if (loading) {
		return <Loader />;
	} else if (accessToken && !loading) {
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
