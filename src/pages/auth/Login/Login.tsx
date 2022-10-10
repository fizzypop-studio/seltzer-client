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

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/store';
import { loginUser, resetErrorState } from 'redux/slices/sessions/sessionSlice';

import { Google, Twitter, Facebook } from '@mui/icons-material';

import { EMAIL_REGEX } from 'helpers/regex';

import * as S from './Login.styles';
import { useEffect } from 'react';

type LoginFormValues = {
	email: string;
	password: string;
};

export const Login = () => {
	const errorMessages = useSelector(
		(state: RootState) => state.session.errorMessages
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const schema = yup
		.object({
			email: yup
				.string()
				.matches(EMAIL_REGEX, t('auth.email.valid'))
				.required(t('auth.email.required')),
			password: yup.string().required(),
		})
		.required();

	const {
		handleSubmit,
		control,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm<LoginFormValues>({ resolver: yupResolver(schema) });

	useEffect(() => {
		clearErrors();
		resetErrorState();
	}, [clearErrors]);

	async function onSubmit(data: LoginFormValues) {
		const payload = {
			email: data.email,
			password: data.password,
		};
		const response = await dispatch(loginUser(payload));
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
						text={t('auth.signUp')}
						href="/sign-up"
						className="sign-up-button"
					/>
					<Button
						text={t('auth.requestDemo')}
						className="request-button"
					/>
				</S.HeaderActionWrapper>
			</S.HeaderWrapper>
			<Container className="container" maxWidth="sm">
				<Box className="login-box" hasElevation>
					<S.BoxHeaderWrapper>
						<Typography variant="h4">{t('auth.login')}</Typography>
						<Typography variant="subtitle1">
							{t('auth.loginSubtitle')}
						</Typography>
					</S.BoxHeaderWrapper>
					<S.Form onSubmit={handleSubmit(onSubmit)}>
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
						<S.ForgotPasswordWrapper>
							<Link
								text={t('auth.trouble')}
								href="/forgot-password"
							/>
						</S.ForgotPasswordWrapper>
						<Button
							text={t('auth.signIn')}
							type="submit"
							fullWidth
						/>
					</S.Form>
					<TextDivider text={t('auth.signInWith')} />
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
							{t('auth.haveAccount')}
						</Typography>
						<Link text={t('auth.signUp')} href="/sign-up" />
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
