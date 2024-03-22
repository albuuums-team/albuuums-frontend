import { FunctionComponent, InputHTMLAttributes, ReactNode } from 'react';
import style from './input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	icon?: ReactNode;
	children: ReactNode;
	onChange: () => void;
	placeholder: string;
}

export const Input: FunctionComponent<InputProps> = props => {
	const { placeholder, children, onChange, icon, ...rest } = props;

	return (
		<div className={style.input}>
			<input
				className={style['input-content']}
				type='text'
				placeholder={placeholder}
				onChange={onChange}
				{...rest}
			/>
			{icon}
			{children}
		</div>
	);
};
