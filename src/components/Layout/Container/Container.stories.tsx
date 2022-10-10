import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Container } from './Container';

export default {
	title: 'Container',
	component: Container,
} as ComponentMeta<typeof Container>;

export const Default: ComponentStory<typeof Container> = () => (
	<Container>
		<>This is a container of important items 🙂</>
	</Container>
);
