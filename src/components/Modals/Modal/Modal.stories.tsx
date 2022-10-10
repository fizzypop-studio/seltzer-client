import { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from 'components';
import { Modal } from './Modal';

export default {
	title: ' Modal',
	component: Modal,
} as ComponentMeta<typeof Modal>;

export const Default: ComponentStory<typeof Modal> = () => {
	const [open, setOpen] = useState(false);

	function handleOpenModal() {
		setOpen(true);
	}

	function handleCloseModal() {
		setOpen(false);
	}

	return (
		<>
			<Button text="Open Modal" onClick={handleOpenModal} />
			<Modal
				open={open}
				onClose={handleCloseModal}
				title="Add User"
				content="Fill out the form below to add a new user"
				actionText="Add User"
				onActionClick={() => console.log('Action goes here')}
				onRequestClose={handleCloseModal}
			>
				<>Nice Modal you have here</>
			</Modal>
		</>
	);
};
