import { useTheme } from '@mui/material/styles';
import { Typography } from 'components';
import { CardProps as MUICardProps } from '@mui/material/Card';
import { formatNumber } from 'helpers/number-formatter';
import * as S from './DataCard.styles';

type DataCardProps = MUICardProps & {
	icon: React.ReactElement;
	data: number;
	title: string;
	colors?: string[];
};

export const DataCard = ({
	icon,
	data,
	title,
	colors,
	...props
}: DataCardProps) => {
	const theme = useTheme();
	const cardColors = colors?.length
		? colors
		: [theme.palette.primary.light, theme.palette.primary.main];

	return (
		<S.StyledDataCard color={cardColors[0]} elevation={0} {...props}>
			<S.IconWrapper color={cardColors[1]}>{icon}</S.IconWrapper>
			<Typography variant="h3" className="data">
				{formatNumber(data)}
			</Typography>
			<Typography variant="body1" className="title">
				{title}
			</Typography>
		</S.StyledDataCard>
	);
};
