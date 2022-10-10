import { useEffect, useState } from 'react';
import {
	ActionModal,
	Button,
	Drawer,
	Helmet,
	ContactForm,
	Modal,
	PageHeader,
	Loader,
	Typography,
} from 'components';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Edit } from '@mui/icons-material';

import { useSelector, useDispatch } from 'react-redux';
import {
	getUserContact,
	deleteUserContact,
} from 'redux/slices/contacts/contactSlice';
import { RootState } from 'redux/store';
import * as S from './ContactProfile.styles';

export const ContactProfile = () => {
	const [showContactModal, setShowContactModal] = useState<boolean>(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
	const accessToken = useSelector(
		(state: RootState) => state.session.accessToken
	);
	const profile = useSelector((state: RootState) => state.contact.profile);
	const loading = useSelector((state: RootState) => state.contact.loading);
	const errorMessages = useSelector(
		(state: RootState) => state.contact.errorMessages
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const { t } = useTranslation();

	useEffect(() => {
		const payload = {
			id,
			token: accessToken,
		};
		dispatch(getUserContact(payload));
	}, [id, dispatch, accessToken]);

	function handleShowContactModal() {
		setShowContactModal(true);
	}

	function handleCloseContactModal() {
		setShowContactModal(false);
	}

	function handleOpenDeleteModal() {
		setDeleteModalOpen(true);
	}

	function handleCloseDeleteModal() {
		setDeleteModalOpen(false);
	}

	async function handleDelete() {
		const payload = {
			id: profile?.id,
			token: accessToken,
		};
		const response = await dispatch(deleteUserContact(payload));
		if (errorMessages.length === 0) {
			handleCloseDeleteModal();
			navigate('/dashboard/contacts');
		} else {
			// TODO: Handle Error
			console.log('there was an error', errorMessages);
		}
	}

	return (
		<Drawer currentRoute="/dashboard/contatcs">
			<Helmet
				title={t('pages.contacts.title')}
				link="/dashboard/contacts"
				addPostfixTitle
			/>
			{loading ? (
				<Loader />
			) : (
				<>
					<PageHeader
						title={`${profile?.first_name || ''} ${
							profile?.last_name || ''
						}`}
						actionText={t('pages.contactProfile.editContact')}
						actionClick={handleShowContactModal}
						actionIcon={<Edit />}
					/>

					<S.Wrapper elevation={24}>
						<Typography variant="h5">
							{t('pages.contactProfile.overview')}
						</Typography>
						<S.InfoRow>
							<S.InfoWrapper>
								<Typography variant="h6">
									{t('pages.contactProfile.email')}
								</Typography>
								<Typography variant="body1">
									{profile?.email || '---'}
								</Typography>
							</S.InfoWrapper>
							<S.InfoWrapper>
								<Typography variant="h6">
									{t('pages.contactProfile.role')}
								</Typography>
								<Typography variant="body1">
									{profile?.role || '---'}
								</Typography>
							</S.InfoWrapper>
						</S.InfoRow>
						<S.InfoRow>
							<Button
								variant="outlined"
								color="error"
								text={t('pages.contactProfile.deleteContact')}
								disabled={loading}
								onClick={handleOpenDeleteModal}
							/>
						</S.InfoRow>
					</S.Wrapper>

					<Modal
						open={showContactModal}
						onClose={handleCloseContactModal}
						title={t('pages.contactProfile.editContact')}
						content={t('pages.contactProfile.editContactDesc')}
						onRequestClose={handleCloseContactModal}
					>
						<ContactForm
							contact={profile}
							handleCloseModal={handleCloseContactModal}
							handleCancel={handleCloseContactModal}
						/>
					</Modal>
					<ActionModal
						open={deleteModalOpen}
						onClose={handleCloseDeleteModal}
						title={t('pages.contactProfile.deleteContact')}
						content={t('pages.contactProfile.areYouSureDelete')}
						actionText={t('pages.contactProfile.delete')}
						onActionClick={handleDelete}
						onRequestClose={handleCloseDeleteModal}
					/>
				</>
			)}
		</Drawer>
	);
};
