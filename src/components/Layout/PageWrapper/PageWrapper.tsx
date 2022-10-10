import { ReactNode } from 'react';
import * as S from './PageWrapper.styles';

export type PageWrapperProps = {
	children: ReactNode;
};

export const PageWrapper = ({ children }: PageWrapperProps) => {
	return <S.StyledPageWrapper>{children}</S.StyledPageWrapper>;
};
