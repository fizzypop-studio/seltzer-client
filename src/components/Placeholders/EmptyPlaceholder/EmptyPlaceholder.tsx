import React from 'react';
import { Typography } from 'components';
import * as S from './EmptyPlaceholder.styles';

type EmptyPlaceholderProps = {
	icon: React.ReactElement;
	message: string;
};

export const EmptyPlaceholder = ({ icon, message }: EmptyPlaceholderProps) => {
	return (
		<S.Wrapper>
			<S.IconWrapper>{icon}</S.IconWrapper>
			<Typography variant="body1">{message}</Typography>
		</S.Wrapper>
	);
};
