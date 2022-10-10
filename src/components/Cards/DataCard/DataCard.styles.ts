import { styled } from '@mui/material/styles';
import { Card } from 'components';

export const StyledDataCard = styled(Card)`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: ${({ color }) => color};
	border-radius: 1rem;
	padding: 2rem;

	.data {
		margin-top: 1rem;
		text-align: center;
	}
`;

export const IconWrapper = styled('div')`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1rem;
	border-radius: 500vh;
	background-color: ${({ color }) => color};

	svg {
		color: #fff;
	}
`;
