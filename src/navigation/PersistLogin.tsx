import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Loader } from 'components';

import { RootState } from 'redux/store';
import { refreshAccessToken } from 'redux/slices/sessions/sessionSlice';

export const PersistLogin = () => {
	const loading = useSelector((state: RootState) => state.session.loading);
	const accessToken = useSelector(
		(state: RootState) => state.session.accessToken
	);
	const refreshToken = useSelector(
		(state: RootState) => state.session.refreshToken
	);
	const dispatch = useDispatch();

	useEffect(() => {
		function verifyRefreshToken() {
			try {
				dispatch(refreshAccessToken(refreshToken));
			} catch (error) {
				console.log('error refreshing access token');
			}
		}

		if (!accessToken) {
			verifyRefreshToken();
		}
	}, [dispatch, accessToken, refreshToken]);

	return <>{loading ? <Loader /> : <Outlet />}</>;
};
