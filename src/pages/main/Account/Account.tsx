import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Button,
	Drawer,
	Helmet,
	PageHeader,
	Modal,
	AccountForm,
	Typography,
} from 'components';
import { Edit } from '@mui/icons-material';

import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

import * as S from './Account.styles';

export const Account = () => {
	const [showEditModal, setShowEditModal] = useState<boolean>(false);
	const currentUser = useSelector(
		(state: RootState) => state.session.currentUser
	);
	const { t } = useTranslation();

	function handleShowEditModal() {
		setShowEditModal(true);
	}

	function handleCloseEditModal() {
		setShowEditModal(false);
	}

	return (
		<Drawer currentRoute="/dashboard/account">
			<Helmet
				title={t('pages.account.title')}
				link="/dashboard/account"
				addPostfixTitle
			/>
			<PageHeader
				title={`My Account - ${currentUser?.first_name || ''} ${
					currentUser?.last_name || ''
				}`}
				actionText={t('pages.account.edit')}
				actionClick={handleShowEditModal}
				actionIcon={<Edit />}
			/>
			<S.Wrapper elevation={24}>
				<Typography variant="h5">
					{t('pages.account.overview')}
				</Typography>
				<S.InfoRow>
					<S.InfoWrapper>
						<Typography variant="h6">
							{t('pages.account.email')}
						</Typography>
						<Typography variant="body1">
							{currentUser?.email || '---'}
						</Typography>
					</S.InfoWrapper>
					<S.InfoWrapper>
						<Typography variant="h6">
							{t('pages.account.role')}
						</Typography>
						<Typography variant="body1" className="role">
							{currentUser?.role || '---'}
						</Typography>
					</S.InfoWrapper>
				</S.InfoRow>
			</S.Wrapper>
			<Modal
				open={showEditModal}
				onClose={handleCloseEditModal}
				title={t('pages.account.edit')}
				content={t('pages.account.editAccountDesc')}
				onRequestClose={handleCloseEditModal}
			>
				<AccountForm
					user={currentUser}
					handleCloseModal={handleCloseEditModal}
					handleCancel={handleCloseEditModal}
				/>
			</Modal>
		</Drawer>
	);
};
