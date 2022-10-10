import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './Logout.styles';

export const Logout = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/login');
	}, [navigate]);

	return <S.Wrapper></S.Wrapper>;
};
