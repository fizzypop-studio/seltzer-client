import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TextDivider } from './TextDivider';

export default {
	title: 'Text Divider',
	component: TextDivider,
} as ComponentMeta<typeof TextDivider>;

export const Primary: ComponentStory<typeof TextDivider> = () => (
	<TextDivider text="Primary" />
);
