import { FunctionComponent, InputHTMLAttributes } from 'react'
import style from './input.module.css'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string
}

const Input: FunctionComponent<Props> = ({
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
				{...rest}
			/>
		</div>
	)
}

export default Input
