
import { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from 'components';
import { ActionModal } from './ActionModal';

export default {
	title: 'Action Modal',
	component: ActionModal,
} as ComponentMeta<typeof ActionModal>;

export const Default: ComponentStory<typeof ActionModal> = () => {
	const [open, setOpen] = useState(false);
	const handleOpenModal = () => {
		setOpen(true);
	};

	const handleCloseModal = () => {
		setOpen(false);
	};
	return (
		<>
			<Button text="Open Modal" onClick={handleOpenModal} />
			<ActionModal
				open={open}
				onClose={handleCloseModal}
				title="Logout User"
				content="Are you sure you want to log out?"
				actionText="Logout"
				onActionClick={() => console.log('Action goes here')}
				onRequestClose={handleCloseModal}
			/>
		</>
	);
};
