import { forwardRef, useRef } from 'react';
import * as S from './Box.styles';
import { BoxProps as MUIBoxProps } from '@mui/material/Box';

export type BoxProps = MUIBoxProps & {
	hasElevation?: boolean;
};

export const Box = forwardRef(({ hasElevation, ...props }: BoxProps, ref) => {
	const componentRef = useRef<HTMLIFrameElement>(null);
	return (
		<S.StyledBox
			ref={componentRef || ref}
			sx={{ p: 6 }}
			hasElevation={hasElevation}
			{...props}
		/>
	);
});
