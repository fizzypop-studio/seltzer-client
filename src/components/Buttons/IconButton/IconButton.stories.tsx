import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IconButton } from './IconButton';
import { Delete } from '@mui/icons-material';

export default {
	title: 'Icon Button',
	component: IconButton,
} as ComponentMeta<typeof IconButton>;

export const Large: ComponentStory<typeof IconButton> = () => (
	<IconButton aria-label="delete" size="large" icon={<Delete />} />
);
