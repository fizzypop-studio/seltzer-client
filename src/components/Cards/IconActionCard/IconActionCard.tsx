import * as S from './IconActionCard.styles';
import { CardProps as MUICardProps } from '@mui/material/Card';
import { Button, Typography } from 'components';

type IconActionCardProps = MUICardProps & {
	content: string;
	icon: React.ReactElement;
	buttonText: string;
	onClick: () => void;
};

export const IconActionCard = ({
	content,
	icon,
	buttonText,
	onClick,
	...props
}: IconActionCardProps) => {
	return (
		<S.StyledIconActionCard elevation={0} {...props}>
			<S.IconWrapper>{icon}</S.IconWrapper>
			<Typography variant="body1" className="content">
				{content}
			</Typography>
			<Button text={buttonText} onClick={onClick} />
		</S.StyledIconActionCard>
	);
};
