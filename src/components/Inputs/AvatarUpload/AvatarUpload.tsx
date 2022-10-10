/* eslint-disable no-unused-expressions */
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography } from 'components';
import { CameraAlt } from '@mui/icons-material';
import placeholder from 'assets/avatar-placeholder.png';
import { useTranslation } from 'react-i18next';
import * as S from './AvatarUpload.styles';

type AvatarUploadProps = {
	className?: string;
	avatar: any;
	setAvatar: Dispatch<SetStateAction<null>> | any;
	setFile?: (arg0: any) => void;
};

export const AvatarUpload = ({
	className,
	avatar,
	setAvatar,
	setFile,
}: AvatarUploadProps) => {
	const { t } = useTranslation();

	const onDrop = useCallback(
		(acceptedFiles) => {
			if (acceptedFiles.length > 0) {
				if (setFile) {
					setFile(acceptedFiles[0]);
				}
				setAvatar(URL.createObjectURL(acceptedFiles[0]));
			}
		},
		[setAvatar, setFile]
	);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: false,
		disabled: !setAvatar,
	});

	useEffect(() => {
		if (!!avatar) {
			URL.revokeObjectURL(avatar);
		}
	}, [avatar]);

	const renderPicture = () => (
		<S.Picture>
			<source srcSet={avatar} />
			<img src={placeholder} alt="" />
		</S.Picture>
	);

	const renderEmptyUploadPlaceholder = () => (
		<S.EmptyPlaceholder>
			<CameraAlt fontSize="large" />
			<Typography variant="body2">
				{isDragActive
					? t('general.dropHere')
					: t('general.uploadAvatar')}
			</Typography>
		</S.EmptyPlaceholder>
	);

	return (
		<S.Avatar className={className} {...getRootProps()}>
			<input {...getInputProps()} />
			{setAvatar && !avatar
				? renderEmptyUploadPlaceholder()
				: renderPicture()}
		</S.Avatar>
	);
};
