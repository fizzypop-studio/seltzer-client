import { styled } from '@mui/material/styles';
import { Card } from 'components';

export const StyledIconActionCard = styled(Card)`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: ${({ theme }) => theme.palette.secondary.light};
	border-radius: 1rem;

	.content {
		margin-bottom: 1rem;
		margin-top: 1.5rem;
		text-align: center;
	}
`;

export const IconWrapper = styled('div')`
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: -1rem;
	height: 4rem;
	width: 4rem;
	border-radius: 500vh;
	background-color: ${({ theme }) => theme.palette.secondary.main};

	svg {
		color: #fff;
	}
`;
