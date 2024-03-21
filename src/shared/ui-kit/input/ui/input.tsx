import React, { FunctionComponent, InputHTMLAttributes } from 'react'
import style from './input.module.css'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string
}

type IconType = () => JSX.Element

interface Props {
	icon: IconType | null
}

export const Input: FunctionComponent<Props> = ({
	placeholder,
	children,
	onChange,
	icon,
	...rest
}) => {
	if (icon === null) {
		return (
			<div className={style.input}>
				<input
					className={style['input-content']}
					style={{
						padding: '13px 15px 13px 15px',
					}}
					type='text'
					placeholder={placeholder}
					onChange={onChange}
					{...rest}
				/>
				{children}
			</div>
		)
	} else {
		return (
			<div className={style.input}>
				<input
					className={style['input-content']}
					type='text'
					placeholder={placeholder}
					onChange={onChange}
					{...rest}
				/>
				{React.createElement(icon)}
				{children}
			</div>
		)
	}
}
