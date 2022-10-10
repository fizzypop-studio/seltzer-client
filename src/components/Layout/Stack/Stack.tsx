import * as S from './Stack.styles';
import { StackProps as MUIStackProps } from '@mui/material/Stack';

export const Stack = ({ children, ...props }: MUIStackProps) => {
	return <S.StyledStack {...props}>{children}</S.StyledStack>;
};
