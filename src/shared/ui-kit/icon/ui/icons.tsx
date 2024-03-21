import React, { FunctionComponent } from 'react'
import style from './icon.module.css'

interface IconTypeProps {
	width: number
	height: number
}

type IconType = (props: IconTypeProps) => JSX.Element

interface Props {
	icon: IconType
}

const IconSearch: FunctionComponent<Props> = ({ icon }) => {
	return (
		<div className={style.icon}>
			{React.createElement(icon, { width: 20, height: 20 })}
		</div>
	)
}

export default IconSearch
