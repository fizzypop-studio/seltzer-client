import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logoutUser } from 'redux/slices/sessions/sessionSlice';
import { RootState } from 'redux/store';

import * as S from './Logout.styles';

export const Logout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const refreshToken = useSelector(
		(state: RootState) => state.session.refreshToken
	);

	useEffect(() => {
		if (refreshToken) {
			dispatch(logoutUser(refreshToken));
		}

		navigate('/login');
	}, [dispatch, navigate, refreshToken]);

	return <S.Wrapper></S.Wrapper>;
};
