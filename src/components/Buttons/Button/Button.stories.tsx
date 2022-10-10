import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from './Button';

export default {
	title: 'Button',
	component: Button,
} as ComponentMeta<typeof Button>;

export const Primary: ComponentStory<typeof Button> = () => (
	<Button text="Primary" variant="contained" />
);

export const Secondary: ComponentStory<typeof Button> = () => (
	<Button text="Secondary" variant="contained" />
);

export const Text: ComponentStory<typeof Button> = () => (
	<Button text="Text" variant="text" />
);

export const Outlined: ComponentStory<typeof Button> = () => (
	<Button text="Outlined" variant="outlined" />
);
