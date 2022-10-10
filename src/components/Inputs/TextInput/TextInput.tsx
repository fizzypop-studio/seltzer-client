import { useState, forwardRef, useRef } from 'react';
import { Controller } from 'react-hook-form';
import TextField, {
	TextFieldProps as MUITextFieldProps,
} from '@mui/material/TextField';
import { IconButton } from 'components';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import * as S from './TextInput.styles';

type TextInputProps = MUITextFieldProps & {
	name: string;
	control?: any;
};

export const TextInput = forwardRef(
	({ type = 'text', ...props }: TextInputProps, ref) => {
		const [showPassword, setShowPassword] = useState(false);
		const componentRef = useRef<HTMLIFrameElement>(null);
		const { name, control } = { ...props };

		function handleClickShowPassword() {
			setShowPassword(!showPassword);
		}

		function handleMouseDownPassword(
			event: React.MouseEvent<HTMLButtonElement>
		) {
			event.preventDefault();
		}

		return (
			<S.Wrapper>
				<Controller
					name={name}
					control={control}
					render={({ field: { onChange, value } }) =>
						type === 'password' ? (
							<TextField
								type={showPassword ? 'text' : 'password'}
								ref={componentRef || ref}
								onChange={onChange}
								value={value || ''}
								margin="dense"
								className="text-input"
								fullWidth
								{...props}
							/>
						) : (
							<TextField
								type={type}
								ref={componentRef || ref}
								onChange={onChange}
								value={value || ''}
								margin="dense"
								className="text-input"
								fullWidth
								{...props}
							/>
						)
					}
				/>
				{type === 'password' && (
					<S.PasswordIconWrapper>
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							edge="end"
							icon={
								showPassword ? (
									<VisibilityOff />
								) : (
									<Visibility />
								)
							}
						/>
					</S.PasswordIconWrapper>
				)}
			</S.Wrapper>
		);
	}
);
