import { Typography } from 'components';
import * as S from './TextDivider.styles';

export type TextDividerProps = {
	text: string;
};

export const TextDivider = ({ text }: TextDividerProps) => {
	return (
		<S.StyledTextDivider>
			<Typography variant="body1">
				<span>{text}</span>
			</Typography>
		</S.StyledTextDivider>
	);
};
