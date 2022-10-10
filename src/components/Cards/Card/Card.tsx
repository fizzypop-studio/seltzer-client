import * as S from './Card.styles';
import { CardProps as MUICardProps } from '@mui/material/Card';

export const Card = ({ ...props }: MUICardProps) => {
	return <S.StyledCard sx={{ p: 2 }} {...props} />;
};
