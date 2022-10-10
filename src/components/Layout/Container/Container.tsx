import * as S from './Container.styles';
import { ContainerProps as MUIContainerProps } from '@mui/material/Container';

export type ContainerProps = MUIContainerProps & {
	centered?: boolean;
};

export const Container = ({ ...props }: ContainerProps) => {
	return <S.StyledContainer {...props} />;
};
