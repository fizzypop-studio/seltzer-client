import { styled } from '@mui/material/styles';
import { Modal } from '@mui/material';
import { Box } from 'components';
import { colors } from 'theme';

export const StyledModal = styled(Modal)``;

export const Wrapper = styled(Box)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	min-width: 60%;
	padding: 2rem;
	background-color: #fff;

	@media (max-width: 768px) {
		min-width: 90%;
	}
`;

export const CloseWrapper = styled('div')`
	display: flex;
	justify-content: flex-end;
	width: 100%;
`;

export const TitleWrapper = styled('div')`
	display: flex;
	flex-direction: column;
	margin-bottom: 2rem;
	border-bottom: 1px solid ${colors.gray.light};
	padding-bottom: 2rem;
`;

export const Content = styled('div')``;

export const ActionWrapper = styled('div')`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-top: 2rem;
	border-top: 1px solid ${colors.gray.light};
	padding-top: 2rem;

	.action-button {
		margin-left: 1rem;
	}
`;
