import IconSearch from '@/shared/ui-kit/icon/ui/icons'
import Input from '@/shared/ui-kit/input/ui/input'
import { IoSearch } from 'react-icons/io5'
import style from '../../../shared/ui-kit/input/ui/input.module.css'
export const HomePage = () => {
	return (
		<>
			<Input placeholder='Поиск пользавателя' />
			<IconSearch
				icon={props => <IoSearch className={style['icon']} {...props} />}
			/>
		</>
	)
}
