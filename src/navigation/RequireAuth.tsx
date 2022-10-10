import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loader } from 'components';
import { ErrorPage } from 'pages/error/ErrorPage';

export const RequireAuth: React.FC<{ children: any }> = ({ children }) => {
	return children;
};
