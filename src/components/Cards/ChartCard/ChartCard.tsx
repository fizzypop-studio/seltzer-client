import { Typography } from 'components';
import { CardProps as MUICardProps } from '@mui/material/Card';
import * as S from './ChartCard.styles';

type ChartCardProps = MUICardProps & {
	title: string;
	subtitle?: string;
	chart: JSX.Element;
};

export const ChartCard = ({
	title,
	subtitle,
	chart,
	...props
}: ChartCardProps) => {
	return (
		<S.StyledChartCard elevation={24} {...props}>
			<S.TitleWrapper>
				<Typography variant="h5" className="title">
					{title}
				</Typography>
				{subtitle && (
					<Typography variant="body1" className="subtitle">
						{subtitle}
					</Typography>
				)}
			</S.TitleWrapper>
			<S.ChartWrapper>{chart}</S.ChartWrapper>
		</S.StyledChartCard>
	);
};
