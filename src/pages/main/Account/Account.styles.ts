import { styled } from '@mui/material/styles';
import { Card } from 'components';

export const Wrapper = styled(Card)`
	display: flex;
	flex-direction: column;
`;

export const InfoRow = styled('div')`
	display: flex;
	align-items: center;
	margin-top: 1rem;

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

export const InfoWrapper = styled('div')`
	display: flex;
	flex-direction: column;
	margin-right: 3rem;

	.role {
		text-transform: capitalize;
	}
`;
