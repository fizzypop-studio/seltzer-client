import * as S from './Toolbar.styles';
import { ToolbarProps as MUIToolbarProps } from '@mui/material/Toolbar';

export const Toolbar = ({ ...props }: MUIToolbarProps) => {
	return <S.StyledToolbar {...props} />;
};
