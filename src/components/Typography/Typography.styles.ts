import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const StyledTypography = styled(Typography)`
	display: inline-block;
	white-space: pre-line;
	color: ${({ theme }) => theme.palette.primary.main};
`;
