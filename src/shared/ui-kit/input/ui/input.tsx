import { FunctionComponent, InputHTMLAttributes } from 'react';
import { IoSearch } from 'react-icons/io5';
import style from './input.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string;
}
export const Input: FunctionComponent<Props> = ({
	placeholder,
	children,
	...rest
}) => {
	return (
		<div className={style.input}>
			<input
				className={style['input-content']}
				type='text'
				placeholder={placeholder}
			/>
			<IoSearch className={style['icon']} />
		</div>
	);
};
