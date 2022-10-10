import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BasicSelect } from './BasicSelect';

export default {
	title: 'Basic Input',
	component: BasicSelect,
} as ComponentMeta<typeof BasicSelect>;

const options = [
	{
		value: 0,
		label: 'Red',
	},
	{
		value: 1,
		label: 'Blue',
	},
	{
		value: 2,
		label: 'Green',
	},
];

export const Default: ComponentStory<typeof BasicSelect> = () => (
	<BasicSelect
		name="role"
		label="Select Role"
		options={options}
		defaultValue={0}
	/>
);
