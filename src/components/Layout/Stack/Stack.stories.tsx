import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from 'components';
import { Stack } from './Stack';

export default {
	title: 'Stack',
	component: Stack,
} as ComponentMeta<typeof Stack>;

export const Default: ComponentStory<typeof Stack> = () => (
	<Stack direction="row" spacing={2}>
		<Button text="Item 1" />
		<Button text="Item 1" />
		<Button text="Item 1" />
	</Stack>
);
