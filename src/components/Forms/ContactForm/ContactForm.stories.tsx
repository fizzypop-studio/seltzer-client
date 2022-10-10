import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ContactForm } from './ContactForm';

export default {
	title: 'Contact Form',
	component: ContactForm,
} as ComponentMeta<typeof ContactForm>;

function handleCancel() {
	console.log('Cancel');
}

export const Default: ComponentStory<typeof ContactForm> = () => (
	<ContactForm handleCancel={handleCancel} />
);
