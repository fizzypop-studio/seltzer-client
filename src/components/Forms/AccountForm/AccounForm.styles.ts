import { styled } from '@mui/material/styles';
import { colors } from 'theme';

export const Form = styled('form')`
	margin-top: 2rem;
`;

export const AvatarWrapper = styled('div')`
	display: flex;
	align-item: center;
	justify-content: center;
	width: 100%;
	margin-bottom: 2rem;
`;

export const ActionWrapper = styled('div')`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-top: 2rem;
	border-top: 1px solid ${colors.gray.light};
	padding-top: 2rem;

	.submit-button {
		margin-left: 1rem;
	}
`;
