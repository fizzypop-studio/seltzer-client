import { useNavigate } from 'react-router-dom';
import {
	Box,
	Button,
	Container,
	Helmet,
	Link,
	TextInput,
	Typography,
} from 'components';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/store';
import { sendResetPasswordEmail } from 'redux/slices/sessions/sessionSlice';

import { EMAIL_REGEX } from 'helpers/regex';

import * as S from './ForgotPassword.styles';

type ForgotPasswordFormValues = {
	email: string;
};

export const ForgotPassword = () => {
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
		})
		.required();

	const {
		handleSubmit,
		control,
		formState: { errors },
		setError,
	} = useForm<ForgotPasswordFormValues>({ resolver: yupResolver(schema) });

	async function onSubmit(data: ForgotPasswordFormValues) {
		const response = await dispatch(sendResetPasswordEmail(data.email));
		if (errorMessages.length === 0) {
			navigate('/dashboard');
		} else {
			setError('email', {
				type: 'custom',
				message: 'Email already exists',
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
			</S.HeaderWrapper>
			<Container className="container" maxWidth="sm">
				<Box className="login-box" hasElevation>
					<S.BoxHeaderWrapper>
						<Typography variant="h4">
							{t('auth.forgotPassword')}
						</Typography>
						<Typography variant="subtitle1">
							{t('auth.forgotPasswordSubtitle')}
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
						<Button
							text={t('auth.sendEmail')}
							type="submit"
							className="submit-button"
							fullWidth
						/>
					</S.Form>
					<S.BoxFooterWrapper>
						<Typography variant="body1">
							{t('auth.havePassword')}
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
