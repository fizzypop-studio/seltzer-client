import * as S from './Link.styles';
import { LinkProps as MUILinkProps } from '@mui/material/Link';

type LinkProps = MUILinkProps & {
	text: string;
};

export const Link = ({ text, ...props }: LinkProps) => {
	return <S.StyledLink {...props}>{text}</S.StyledLink>;
};
