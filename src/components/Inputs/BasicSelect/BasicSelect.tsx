import { Controller } from 'react-hook-form';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectProps as MUISelectProps } from '@mui/material/Select';
import * as S from './BasicSelect.styles';

type Option = {
	value: string | number;
	label: string;
};

type SelectProps = MUISelectProps & {
	name: string;
	control?: any;
	options: Option[];
	defaultValue: string | number;
};

export const BasicSelect = ({
	options,
	label,
	defaultValue,
	...props
}: SelectProps) => {
	const { name, control } = { ...props };

	return (
		<S.Wrapper>
			<FormControl fullWidth>
				<InputLabel htmlFor={`${name}-id`}>{label}</InputLabel>
				<Controller
					name={name}
					control={control}
					render={({ field: { onChange, value } }) => (
						<Select
							value={value}
							onChange={onChange}
							label={label}
							labelId={`${name}-id`}
						>
							{options.map((option) => (
								<MenuItem
									key={option.value}
									value={option.value}
								>
									{option.label}
								</MenuItem>
							))}
						</Select>
					)}
					defaultValue={defaultValue}
				/>
			</FormControl>
		</S.Wrapper>
	);
};
