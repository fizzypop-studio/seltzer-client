import * as S from './Button.styles';
import { ButtonProps as MUIButtonProps } from '@mui/material/Button';

export type ButtonProps = MUIButtonProps & {
	text: string;
	fullWidth?: boolean;
};

export const Button = ({
	text,
	variant = 'contained',
	fullWidth,
	size = 'large',
	...props
}: ButtonProps) => {
	return (
		<S.StyledButton
			fullWidth={fullWidth}
			variant={variant}
			size={size}
			{...props}
		>
			{text}
		</S.StyledButton>
	);
};
