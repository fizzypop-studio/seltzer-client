import * as S from './Paper.styles';
import { PaperProps as MUIPaperProps } from '@mui/material/Paper';

export const Paper = ({ ...props }: MUIPaperProps) => {
	return <S.StyledPaper sx={{ p: 3 }} elevation={16} {...props} />;
};
