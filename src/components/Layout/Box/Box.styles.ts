import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { BoxProps } from './Box';

export const StyledBox = styled(Box)<BoxProps>`
	border-radius: 1rem;
	box-shadow: ${({ hasElevation }) =>
		hasElevation ? '1rem 1rem 1rem 0 rgba(0, 0, 0, 0.1)' : 'none'};
`;
