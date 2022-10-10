import { styled } from '@mui/material/styles';
import { Card } from 'components';
import { colors } from 'theme';

export const StyledChartCard = styled(Card)`
	padding: 2rem;
	height: 33rem;
`;

export const TitleWrapper = styled('div')`
	display: flex;
	flex-direction: column;
	margin-bottom: 1rem;

	p {
		color: ${colors.gray.main};
	}
`;

export const ChartWrapper = styled('div')`
	height: 25rem;
`;
