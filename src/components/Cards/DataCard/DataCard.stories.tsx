import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DataCard } from './DataCard';
import { ElectricBolt } from '@mui/icons-material';

export default {
	title: 'Data Card',
	component: DataCard,
} as ComponentMeta<typeof DataCard>;

export const Default: ComponentStory<typeof DataCard> = () => (
	<DataCard icon={<ElectricBolt />} data={10000} title="Weekly Sales" />
);
