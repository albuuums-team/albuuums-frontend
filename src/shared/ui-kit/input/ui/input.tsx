import React, { FunctionComponent, InputHTMLAttributes } from 'react'
import style from './input.module.css'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string
}

interface IconTypeProps {
	width: number
	height: number
}

type IconType = (props: IconTypeProps) => JSX.Element

interface Props {
	icon: IconType
}

const Input: FunctionComponent<Props> = ({
	placeholder,
	children,
	icon,
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
			<div className={style.icon}>
				{React.createElement(icon, { width: 20, height: 20 })}
			</div>
		</div>
	)
}

export default Input
