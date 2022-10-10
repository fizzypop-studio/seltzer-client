import { forwardRef, useRef } from 'react';
import { Button, IconButton, Typography } from 'components';
import { ModalProps as MUIModalProps } from '@mui/material/Modal';
import { Close } from '@mui/icons-material';
import * as S from './Modal.styles';

type ModalProps = MUIModalProps & {
	open: boolean;
	title: string;
	content?: string;
	actionText?: string;
	onActionClick?: () => void;
	onRequestClose: () => void;
	children: React.ReactNode;
};

export const Modal = forwardRef(
	(
		{
			open,
			title,
			content,
			onClose,
			actionText,
			onActionClick,
			onRequestClose,
			children,
			...props
		}: ModalProps,
		ref
	) => {
		const componentRef = useRef<HTMLIFrameElement>(null);

		return (
			<S.StyledModal
				ref={componentRef || ref}
				open={open}
				onClose={onClose}
				{...props}
			>
				<S.Wrapper>
					<S.CloseWrapper>
						<IconButton
							icon={<Close />}
							size="large"
							color="inherit"
							onClick={onRequestClose}
						/>
					</S.CloseWrapper>
					<S.TitleWrapper>
						<Typography variant="h5">{title}</Typography>
						{content && (
							<Typography variant="body1">{content}</Typography>
						)}
					</S.TitleWrapper>
					<S.Content>{children}</S.Content>
					{actionText && onActionClick && (
						<S.ActionWrapper>
							<Button
								variant="text"
								text="Cancel"
								onClick={onRequestClose}
							/>
							<Button
								text={actionText}
								className="action-button"
								onClick={onActionClick}
							/>
						</S.ActionWrapper>
					)}
				</S.Wrapper>
			</S.StyledModal>
		);
	}
);
