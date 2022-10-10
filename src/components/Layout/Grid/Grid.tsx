import * as S from './Grid.styles';
import { GridProps as MUIGridProps } from '@mui/material/Grid';

export const Grid = ({ ...props }: MUIGridProps) => {
	return <S.StyledGrid {...props} />;
};
