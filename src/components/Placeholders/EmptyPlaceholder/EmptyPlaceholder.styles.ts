import { styled } from '@mui/material/styles';
import { Paper } from 'components';

export const Wrapper = styled(Paper)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

export const IconWrapper = styled('div')`
	svg {
		height: 5rem;
		width: 5rem;
	}
`;
