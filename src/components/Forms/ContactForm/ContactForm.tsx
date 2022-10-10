import { useState, useEffect } from 'react';
import { AvatarUpload, Button, Stack, TextInput } from 'components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';
import {
	createUserContact,
	updateUserContact,
} from 'redux/slices/contacts/contactSlice';
import { RootState } from 'redux/store';

import { Contact } from 'types/Contact';
import { EMAIL_REGEX } from 'helpers/regex';
import * as S from './ContactForm.styles';

type ContactFormProps = {
	contact?: Contact;
	handleCloseModal?: () => void;
	handleCancel: () => void;
};

type ContactFormValues = {
	firstName: string;
	lastName: string;
	email: string;
	role: string;
};

export const ContactForm = ({
	contact,
	handleCloseModal,
	handleCancel,
}: ContactFormProps) => {
	const [avatar, setAvatar] = useState('');
	const [file, setFile] = useState(null);
	const errorMessages = useSelector(
		(state: RootState) => state.contact.errorMessages
	);
	const loading = useSelector((state: RootState) => state.contact.loading);
	const accessToken = useSelector(
		(state: RootState) => state.session.accessToken
	);
	const currentUser = useSelector(
		(state: RootState) => state.session.currentUser
	);
	const dispatch = useDispatch();
	const { t } = useTranslation();

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
		setError,
		reset,
	} = useForm<ContactFormValues>({ resolver: yupResolver(schema) });

	useEffect(() => {
		if (contact) {
			const defaultValues: ContactFormValues = {
				firstName: contact.first_name || '',
				lastName: contact.last_name || '',
				role: contact.role || '',
				email: contact.email || '',
			};

			reset({ ...defaultValues });
		}
	}, [contact, reset]);

	async function onSubmit(data: ContactFormValues) {
		const payload = {
			first_name: data.firstName,
			last_name: data.lastName,
			email: data.email,
			role: data.role,
			token: accessToken,
			user_id: currentUser?.id,
		};
		const response = await dispatch(
			contact
				? updateUserContact({ id: contact.id, ...payload })
				: createUserContact(payload)
		);
		if (errorMessages.length === 0) {
			if (handleCloseModal) handleCloseModal();
		} else {
			setError('email', {
				type: 'custom',
				message: 'Something went wrong. Please try again',
			});
		}
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
			<TextInput
				name="role"
				control={control}
				label={t('auth.role.label')}
				error={!!errors.role}
				helperText={!!errors.role ? t('auth.role.required') : ''}
				required
			/>
			<S.ActionWrapper>
				<Button
					variant="text"
					text={t('general.cancel')}
					disabled={loading}
					onClick={handleCancel}
				/>
				{contact ? (
					<Button
						text={
							loading
								? t('pages.contactProfile.editContactLoading')
								: t('pages.contactProfile.editContact')
						}
						type="submit"
						className="submit-button"
						disabled={loading}
					/>
				) : (
					<Button
						text={
							loading
								? t('pages.contacts.addContactLoading')
								: t('pages.contacts.addContact')
						}
						type="submit"
						className="submit-button"
						disabled={loading}
					/>
				)}
			</S.ActionWrapper>
		</S.Form>
	);
};
