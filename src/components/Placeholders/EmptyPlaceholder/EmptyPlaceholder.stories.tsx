import { ComponentMeta, ComponentStory } from '@storybook/react';
import { EmptyPlaceholder } from './EmptyPlaceholder';
import { ElectricBolt } from '@mui/icons-material';

export default {
	title: 'EmptyPlaceholder',
	component: EmptyPlaceholder,
} as ComponentMeta<typeof EmptyPlaceholder>;

export const Default: ComponentStory<typeof EmptyPlaceholder> = () => (
	<EmptyPlaceholder
		icon={<ElectricBolt />}
		message="This placeholder is made to show empty states when no data is available on pages"
	/>
);
