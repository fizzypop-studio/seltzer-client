import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Box } from './Box';

export default {
	title: 'Box',
	component: Box,
} as ComponentMeta<typeof Box>;

export const Default: ComponentStory<typeof Box> = () => (
	<Box>
		<>Hello There</>
	</Box>
);
