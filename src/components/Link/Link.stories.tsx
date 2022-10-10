import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Link } from './Link';

export default {
	title: 'Link',
	component: Link,
} as ComponentMeta<typeof Link>;

export const Default: ComponentStory<typeof Link> = () => (
	<Link href="#" text="Link" />
);
