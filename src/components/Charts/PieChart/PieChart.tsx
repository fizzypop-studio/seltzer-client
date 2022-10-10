import { PieChart as Chart, Pie, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@mui/material/styles';

type PieChartProps = {
	data: Array<unknown>;
};

export const PieChart = ({ data }: PieChartProps) => {
	const theme = useTheme();

	return (
		<ResponsiveContainer width="100%" height="100%">
			<Chart width={500} height={500}>
				<Pie
					dataKey="value"
					isAnimationActive={false}
					data={data}
					cx="50%"
					cy="50%"
					outerRadius={80}
					fill={theme.palette.secondary.main}
					label
				/>
				<Tooltip />
			</Chart>
		</ResponsiveContainer>
	);
};
