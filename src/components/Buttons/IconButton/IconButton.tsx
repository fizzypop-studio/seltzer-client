import * as S from './IconButton.styles';
import { IconButtonProps as MUIIconButtonProps } from '@mui/material/IconButton';

type IconButtonProps = MUIIconButtonProps & {
	icon: React.ReactElement;
};

export const IconButton = ({ icon, ...props }: IconButtonProps) => {
	return <S.StyledIconButton {...props}>{icon}</S.StyledIconButton>;
};
