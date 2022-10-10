import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Box,
	Button,
	Container,
	Helmet,
	Link,
	Stack,
	TextDivider,
	TextInput,
	Typography,
} from 'components';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/store';
import {
	signUpUser,
	resetErrorState,
} from 'redux/slices/sessions/sessionSlice';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { Google, Twitter, Facebook } from '@mui/icons-material';

import { EMAIL_REGEX } from 'helpers/regex';

import * as S from './SignUp.styles';

type SignUpFormValues = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export const SignUp = () => {
	const errorMessages = useSelector(
		(state: RootState) => state.session.errorMessages
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const schema = yup
		.object({
			firstName: yup.string().required(),
			lastName: yup.string().required(),
			email: yup
				.string()
				.matches(EMAIL_REGEX, t('auth.email.valid'))
				.required(t('auth.email.required')),
			password: yup.string().required(),
			confirmPassword: yup
				.string()
				.oneOf([yup.ref('password')], t('auth.password.match')),
		})
		.required();

	const {
		handleSubmit,
		control,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm<SignUpFormValues>({ resolver: yupResolver(schema) });

	useEffect(() => {
		clearErrors();
		resetErrorState();
	}, [clearErrors]);

	async function onSubmit(data: SignUpFormValues) {
		const payload = {
			first_name: data.firstName,
			last_name: data.lastName,
			email: data.email,
			password: data.password,
		};
		const response = await dispatch(signUpUser(payload));
		if (errorMessages.length === 0) {
			navigate('/dashboard');
		} else {
			setError('email', {
				type: 'custom',
				message: t('auth.loginTryAgain'),
			});
		}
	}

	return (
		<S.Wrapper>
			<Helmet title={`Seltzer | ${t('auth.seo')}`} link="/login" />
			<S.HeaderWrapper>
				<S.LogoWrapper>
					<Typography variant="h5">SELTZER</Typography>
				</S.LogoWrapper>
				<S.HeaderActionWrapper>
					<Link
						text={t('auth.logIn')}
						href="/login"
						className="log-in-button"
					/>
					<Button
						text={t('auth.requestDemo')}
						className="request-button"
					/>
				</S.HeaderActionWrapper>
			</S.HeaderWrapper>
			<Container className="container" maxWidth="sm">
				<Box className="sign-up-box" hasElevation>
					<S.BoxHeaderWrapper>
						<Typography variant="h4">{t('auth.signUp')}</Typography>
						<Typography variant="subtitle1">
							{t('auth.signUpSubtitle')}
						</Typography>
					</S.BoxHeaderWrapper>
					<S.Form onSubmit={handleSubmit(onSubmit)}>
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
									!!errors.firstName
										? t('auth.firstName.required')
										: ''
								}
								required
							/>
							<TextInput
								name="lastName"
								control={control}
								label={t('auth.lastName.label')}
								error={!!errors.lastName}
								helperText={
									!!errors.lastName
										? t('auth.lastName.required')
										: ''
								}
								required
							/>
						</Stack>
						<TextInput
							name="email"
							control={control}
							label={t('auth.email.label')}
							error={!!errors.email}
							helperText={
								!!errors.email ? errors.email.message : ''
							}
							required
						/>
						<TextInput
							type="password"
							name="password"
							control={control}
							label={t('auth.password.label')}
							error={!!errors.password}
							helperText={
								!!errors.password
									? t('auth.password.required')
									: ''
							}
							required
						/>
						<TextInput
							type="password"
							name="confirmPassword"
							control={control}
							label={t('auth.confirmPassword.label')}
							error={!!errors.confirmPassword}
							helperText={
								!!errors.confirmPassword
									? errors.confirmPassword.message
									: ''
							}
							required
						/>
						<Button
							text={t('auth.createAccount')}
							type="submit"
							className="submit-button"
							fullWidth
						/>
					</S.Form>
					<TextDivider text={t('auth.signUpWith')} />
					<S.ButtonWrapper>
						<Stack
							direction={{ xs: 'column', sm: 'row' }}
							spacing={2}
						>
							<Button
								text={t('auth.social.google')}
								variant="outlined"
								startIcon={<Google />}
								fullWidth
							/>
							<Button
								text={t('auth.social.twitter')}
								variant="outlined"
								startIcon={<Twitter />}
								fullWidth
							/>
							<Button
								text={t('auth.social.facebook')}
								variant="outlined"
								startIcon={<Facebook />}
								fullWidth
							/>
						</Stack>
					</S.ButtonWrapper>
					<S.BoxFooterWrapper>
						<Typography variant="body1">
							{t('auth.alreadyHaveAccount')}
						</Typography>
						<Link text={t('auth.logIn')} href="/login" />
					</S.BoxFooterWrapper>
				</Box>
				<S.FooterWrapper>
					<Typography variant="body1">
						{t('general.copyright')} |{' '}
						<Link text={t('general.privacyPolicy')} href="#" />
					</Typography>
				</S.FooterWrapper>
			</Container>
		</S.Wrapper>
	);
};
