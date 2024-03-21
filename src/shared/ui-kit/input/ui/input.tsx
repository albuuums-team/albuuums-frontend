import React, { FunctionComponent, InputHTMLAttributes } from 'react'
import style from './input.module.css'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string
}

interface IconTypeProps {
	width?: number
	height?: number
}

type IconType = (props: IconTypeProps) => JSX.Element

interface Props {
	icon: IconType | null
}

export const Input: FunctionComponent<Props> = ({
	placeholder,
	children,
	onChange,
	onKeyDown,
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
					onKeyDown={onKeyDown}
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
					onKeyDown={onKeyDown}
					{...rest}
				/>
				{React.createElement(icon)}
				{children}
			</div>
		)
	}
}
