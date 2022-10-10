import { useState, useEffect } from 'react';
import {
	AvatarUpload,
	BasicSelect,
	Button,
	Stack,
	TextInput,
} from 'components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

import { Contact } from 'types/Contact';
import { EMAIL_REGEX } from 'helpers/regex';
import * as S from './AccounForm.styles';

type AccountFormProps = {
	user?: Contact;
	handleCloseModal?: () => void;
	handleCancel: () => void;
};

type AccountFormValues = {
	firstName: string;
	lastName: string;
	email: string;
	role: string;
};

export const AccountForm = ({
	user,
	handleCloseModal,
	handleCancel,
}: AccountFormProps) => {
	const [avatar, setAvatar] = useState('');
	const [file, setFile] = useState(null);
	const loading = useSelector((state: RootState) => state.contact.loading);
	const accessToken = useSelector(
		(state: RootState) => state.session.accessToken
	);
	const { t } = useTranslation();

	const roleOptions = [{ value: 'user', label: 'User' }];

	const schema = yup
		.object({
			firstName: yup.string().required(),
			lastName: yup.string().required(),
			email: yup
				.string()
				.matches(EMAIL_REGEX, t('auth.email.valid'))
				.required(t('auth.email.required')),
			role: yup.string().required(),
		})
		.required();

	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
		watch,
	} = useForm<AccountFormValues>({ resolver: yupResolver(schema) });

	useEffect(() => {
		if (user) {
			const defaultValues: AccountFormValues = {
				firstName: user.first_name || '',
				lastName: user.last_name || '',
				role: user.role || '',
				email: user.email || '',
			};

			reset({ ...defaultValues });
		}
	}, [user, reset]);

	async function onSubmit(data: AccountFormValues) {
		const payload = {
			first_name: data.firstName,
			last_name: data.lastName,
			email: data.email,
			role: data.role,
			token: accessToken,
		};
		console.log({ payload });
		if (handleCloseModal) handleCloseModal();
	}

	const handleSetAvatarFile = (avatarFile: any) => {
		setFile(avatarFile);
	};

	return (
		<S.Form onSubmit={handleSubmit(onSubmit)}>
			<S.AvatarWrapper>
				<AvatarUpload
					avatar={avatar}
					setAvatar={setAvatar}
					setFile={handleSetAvatarFile}
				/>
			</S.AvatarWrapper>
			<Stack
				direction={{ xs: 'column', sm: 'row' }}
				spacing={{ xs: 0, sm: 1.5 }}
			>
				<TextInput
					name="firstName"
					control={control}
					label={t('auth.firstName.label')}
					error={!!errors.firstName}
					helperText={
						!!errors.firstName ? t('auth.firstName.required') : ''
					}
					required
				/>
				<TextInput
					name="lastName"
					control={control}
					label={t('auth.lastName.label')}
					error={!!errors.lastName}
					helperText={
						!!errors.lastName ? t('auth.lastName.required') : ''
					}
					required
				/>
			</Stack>
			<TextInput
				name="email"
				control={control}
				label={t('auth.email.label')}
				error={!!errors.email}
				helperText={!!errors.email ? errors.email.message : ''}
				required
			/>
			<BasicSelect
				name="role"
				control={control}
				options={roleOptions}
				label={t('auth.role.accountLabel')}
				error={!!errors.role}
				defaultValue={watch('role') || 'user'}
				required
			/>
			<S.ActionWrapper>
				<Button
					variant="text"
					text={t('general.cancel')}
					disabled={loading}
					onClick={handleCancel}
				/>
				<Button
					text={
						loading
							? t('pages.account.editLoading')
							: t('pages.account.edit')
					}
					type="submit"
					className="submit-button"
					disabled={loading}
				/>
			</S.ActionWrapper>
		</S.Form>
	);
};
