import { styled } from '@mui/material/styles';
import { Toolbar } from '@mui/material';

export const StyledToolbar = styled(Toolbar)`
	background-color: #fff;
	color: ${({ theme }) => theme.palette.primary.main};
`;
