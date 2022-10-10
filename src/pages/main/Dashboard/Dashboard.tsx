import {
	AreaChart,
	ChartCard,
	DataCard,
	Drawer,
	Grid,
	Helmet,
	PageWrapper,
	PieChart,
	Typography,
} from 'components';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import {
	Person,
	QueryStats,
	ShoppingCart,
	BugReport,
} from '@mui/icons-material';

import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

import { colors } from 'theme';
import * as S from './Dashboard.styles';

// TODO: Replace with real data
const areaChartData = [
	{
		name: 'Page A',
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: 'Page B',
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: 'Page C',
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: 'Page D',
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		name: 'Page E',
		uv: 1890,
		pv: 4800,
		amt: 2181,
	},
	{
		name: 'Page F',
		uv: 2390,
		pv: 3800,
		amt: 2500,
	},
	{
		name: 'Page G',
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
];

const pieChartData = [
	{ name: 'Group A', value: 2400 },
	{ name: 'Group B', value: 4567 },
	{ name: 'Group C', value: 1398 },
	{ name: 'Group D', value: 9800 },
	{ name: 'Group E', value: 3908 },
	{ name: 'Group F', value: 4800 },
];

export const Dashboard = () => {
	const currentUser = useSelector(
		(state: RootState) => state.session.currentUser
	);
	const theme = useTheme();
	const { t } = useTranslation();

	return (
		<Drawer currentRoute="/dashboard">
			<Helmet
				title={t('pages.dashboard.title')}
				link="/dashboard"
				addPostfixTitle
			/>
			<PageWrapper>
				<Typography variant="h5">{`${t('pages.dashboard.welcome')}, ${
					currentUser?.first_name
				} ${currentUser?.last_name}`}</Typography>
				<S.DataWrapper>
					<Grid
						container
						rowSpacing={{ xs: 1, sm: 2, md: 2 }}
						columnSpacing={{ xs: 1, sm: 2, md: 2 }}
					>
						<Grid item xs={12} sm={6} md={3}>
							<DataCard
								icon={<QueryStats />}
								data={10000}
								title={t('pages.dashboard.weeklySales')}
								colors={[
									theme.palette.secondary.light,
									theme.palette.secondary.main,
								]}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<DataCard
								icon={<Person />}
								data={175000}
								title={t('pages.dashboard.newUsers')}
								colors={[
									theme.palette.primary.light,
									theme.palette.primary.main,
								]}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<DataCard
								icon={<ShoppingCart />}
								data={2000000}
								title={t('pages.dashboard.itemOrders')}
								colors={[
									colors.tertiary.light,
									colors.tertiary.main,
								]}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<DataCard
								icon={<BugReport />}
								data={1000}
								title={t('pages.dashboard.bugReports')}
								colors={[colors.green.light, colors.green.main]}
							/>
						</Grid>
					</Grid>
				</S.DataWrapper>
				<S.ChartWrapper>
					<Grid
						container
						rowSpacing={{ xs: 1, sm: 2, md: 2 }}
						columnSpacing={{ xs: 1, sm: 2, md: 2 }}
					>
						<Grid item xs={12} sm={12} md={8}>
							<ChartCard
								title="Weekly Sales"
								subtitle="(+43%) from last year"
								chart={<AreaChart data={areaChartData} />}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={4}>
							<ChartCard
								title="Current Visits"
								chart={<PieChart data={pieChartData} />}
							/>
						</Grid>
					</Grid>
				</S.ChartWrapper>
			</PageWrapper>
		</Drawer>
	);
};
