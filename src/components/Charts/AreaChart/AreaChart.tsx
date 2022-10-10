import {
	AreaChart as Chart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import { useTheme } from '@mui/material/styles';

type AreaChartProps = {
	data: Array<unknown>;
};

export const AreaChart = ({ data }: AreaChartProps) => {
	const theme = useTheme();

	return (
		<ResponsiveContainer width="100%" height="100%">
			<Chart
				width={500}
				height={400}
				data={data}
				margin={{
					top: 10,
					right: 30,
					left: 0,
					bottom: 0,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Area
					type="monotone"
					dataKey="uv"
					stroke={theme.palette.primary.main}
					fill={theme.palette.primary.main}
				/>
			</Chart>
		</ResponsiveContainer>
	);
};
