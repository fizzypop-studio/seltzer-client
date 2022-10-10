import { forwardRef, useRef } from 'react';
import { Button, Typography } from 'components';
import { DialogProps as MUIModalProps } from '@mui/material/Dialog';
import * as S from './ActionModal.styles';

type ActionModalProps = MUIModalProps & {
	open: boolean;
	title: string;
	content?: string;
	actionText: string;
	onActionClick: () => void;
	onRequestClose: () => void;
};

export const ActionModal = forwardRef(
	(
		{
			open,
			title,
			content,
			onClose,
			actionText,
			onActionClick,
			onRequestClose,
			...props
		}: ActionModalProps,
		ref
	) => {
		const componentRef = useRef<HTMLIFrameElement>(null);

		return (
			<S.StyledActionModal
				ref={componentRef || ref}
				open={open}
				onClose={onClose}
				{...props}
			>
				<S.Wrapper>
					<S.TitleWrapper>
						<Typography variant="h6">{title}</Typography>
						{content && (
							<Typography variant="body1">{content}</Typography>
						)}
					</S.TitleWrapper>
					<S.ActionWrapper>
						<Button
							variant="text"
							text="Cancel"
							onClick={onRequestClose}
						/>
						<Button text={actionText} onClick={onActionClick} />
					</S.ActionWrapper>
				</S.Wrapper>
			</S.StyledActionModal>
		);
	}
);
