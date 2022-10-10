import { ComponentMeta, ComponentStory } from '@storybook/react';
import { PieChart } from './PieChart';

const data = [
	{ name: 'Group A', value: 2400 },
	{ name: 'Group B', value: 4567 },
	{ name: 'Group C', value: 1398 },
	{ name: 'Group D', value: 9800 },
	{ name: 'Group E', value: 3908 },
	{ name: 'Group F', value: 4800 },
];

export default {
	title: 'Pie Chart',
	component: PieChart,
} as ComponentMeta<typeof PieChart>;

export const Default: ComponentStory<typeof PieChart> = () => (
	<PieChart data={data} />
);
