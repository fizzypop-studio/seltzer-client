import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AccountForm } from './AccountForm';

export default {
	title: 'Contact Form',
	component: AccountForm,
} as ComponentMeta<typeof AccountForm>;

function handleCancel() {
	console.log('Cancel');
}

export const Default: ComponentStory<typeof AccountForm> = () => (
	<AccountForm handleCancel={handleCancel} />
);
