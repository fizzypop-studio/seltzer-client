import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Paper } from './Paper';

export default {
	title: 'Paper',
	component: Paper,
} as ComponentMeta<typeof Paper>;

export const Default: ComponentStory<typeof Paper> = () => (
	<Paper>
		<>Hello There</>
	</Paper>
);
