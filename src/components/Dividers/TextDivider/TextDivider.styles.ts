import { styled } from '@mui/material/styles';

export const StyledTextDivider = styled('div')`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;

	p {
		width: 50%;
		text-align: center;
		border-bottom: 1px solid #000;
		line-height: 0.1em;
		margin: 10px 0 20px;
	}

	p span {
		background: #fff;
		padding: 0 10px;
	}
`;
