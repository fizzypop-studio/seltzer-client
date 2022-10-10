import { ReactElement } from 'react';
import { Button, Typography } from 'components';
import * as S from './PageHeader.styles';

type PageHeaderProps = {
	title: string;
	actionText?: string;
	actionClick?: () => void;
	actionIcon?: ReactElement;
};

export const PageHeader = ({
	title,
	actionText,
	actionClick,
	actionIcon,
	...props
}: PageHeaderProps) => {
	return (
		<S.Wrapper {...props}>
			<S.TitleWrapper>
				<Typography variant="h5">{title}</Typography>
			</S.TitleWrapper>
			{actionText && (
				<S.ActionWrapper>
					<Button
						text={actionText}
						onClick={actionClick}
						startIcon={actionIcon}
					/>
				</S.ActionWrapper>
			)}
		</S.Wrapper>
	);
};
