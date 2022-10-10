import { useNavigate, useSearchParams } from 'react-router-dom';
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
import { resetPassword } from 'redux/slices/sessions/sessionSlice';

import * as S from './ResetPassword.styles';

type ResetPasswordFormValues = {
	password: string;
	confirmPassword: string;
};

export const ResetPassword = () => {
	const errorMessages = useSelector(
		(state: RootState) => state.session.errorMessages
	);
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [searchParams] = useSearchParams();
	const resetPasswordToken = searchParams.get('reset_password_token');

	const schema = yup
		.object({
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
	} = useForm<ResetPasswordFormValues>({ resolver: yupResolver(schema) });

	async function onSubmit(data: ResetPasswordFormValues) {
		const payload = {
			password: data.password,
			password_confirmation: data.confirmPassword,
			reset_password_token: resetPasswordToken,
		};
		const response = await dispatch(resetPassword(payload));
		if (errorMessages.length === 0) {
			// TODO: Show success message
			console.log('password has been reset');
		} else {
			setError('password', {
				type: 'custom',
				// TODO: Make this more verbose and use translations
				message: 'Something went wrong',
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
							{t('auth.resetPassword')}
						</Typography>
						<Typography variant="subtitle1">
							{t('auth.resetPasswordSubtitle')}
						</Typography>
					</S.BoxHeaderWrapper>
					<S.Form onSubmit={handleSubmit(onSubmit)}>
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
							text={t('auth.resetPassword')}
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
