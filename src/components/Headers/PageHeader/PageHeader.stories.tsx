import { ComponentMeta, ComponentStory } from '@storybook/react';
import { PageHeader } from './PageHeader';

export default {
	title: 'Page Header',
	component: PageHeader,
} as ComponentMeta<typeof PageHeader>;

export const Default: ComponentStory<typeof PageHeader> = () => (
	<PageHeader title={'Dashboard'} />
);
