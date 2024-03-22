import { FunctionComponent, InputHTMLAttributes, ReactNode } from 'react';
import style from './input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string;
	onChange: () => void;
	icon: ReactNode;
}
export const Input: FunctionComponent<InputProps> = props => {
	const { placeholder, children, onChange, icon, ...rest } = props;

	return (
		<div className={style.input}>
			<input
				className={style['input-content']}
				type='text'
				placeholder={placeholder}
			/>
		</div>
	);
};
