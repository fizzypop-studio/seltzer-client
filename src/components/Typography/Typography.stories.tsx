import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Typography } from './Typography';

export default {
	title: 'Typography',
	component: Typography,
} as ComponentMeta<typeof Typography>;

export const H1: ComponentStory<typeof Typography> = () => (
	<Typography variant="h1">H1</Typography>
);
