import * as S from './Typography.styles';
import { TypographyProps as MUITypographyProps } from '@mui/material/Typography';

export const Typography = ({ ...props }: MUITypographyProps) => {
	return <S.StyledTypography {...props} />;
};
