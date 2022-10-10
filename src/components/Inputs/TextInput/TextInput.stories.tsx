import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TextInput } from './TextInput';

export default {
	title: 'Text Input',
	component: TextInput,
} as ComponentMeta<typeof TextInput>;

export const Default: ComponentStory<typeof TextInput> = () => (
	<TextInput name="email" label="Enter email" />
);
