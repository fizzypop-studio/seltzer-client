import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IconActionCard } from './IconActionCard';
import { ElectricBolt } from '@mui/icons-material';

export default {
	title: 'Icon Action Card',
	component: IconActionCard,
} as ComponentMeta<typeof IconActionCard>;

export const Default: ComponentStory<typeof IconActionCard> = () => (
	<IconActionCard
		content="Do you want to upgrade?"
		icon={<ElectricBolt />}
		buttonText="Upgrade"
		onClick={() => console.log('Upgrade Account')}
	/>
);
