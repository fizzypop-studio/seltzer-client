import { styled } from '@mui/material/styles';
import { colors } from 'theme';

export const Avatar = styled('div')`
	position: relative;
	width: 12rem;
	height: 12rem;
	border: 1px solid ${colors.gray.light};
	border-radius: 9999px;
	overflow: hidden;
	cursor: pointer;

	&:hover {
		opacity: 0.8;
	}
`;

export const EmptyPlaceholder = styled('div')`
	position: absolute;
	inset: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	color: ${colors.gray.light};

	svg {
		margin: 0 0 0.5rem;
	}
`;

export const Picture = styled('picture')`
	pointer-events: none;
	position: absolute;
	inset: 0;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}
`;
