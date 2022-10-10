import { useState } from 'react';

import { AvatarUpload } from './AvatarUpload';

export default {
	title: 'Avatar Upload',
	component: AvatarUpload,
};

export const Default = () => {
	const [avatar, setAvatar] = useState(null);

	return (
		<>
			<AvatarUpload avatar={avatar} setAvatar={setAvatar} />
			{avatar}
		</>
	);
};
