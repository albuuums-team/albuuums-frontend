import Input from '@/shared/ui-kit/input/ui/input'
import { IoSearch } from 'react-icons/io5'

export const HomePage = () => {
	return (
		<>
			<Input
				placeholder='Поиск пользавателя'
				icon={props => <IoSearch {...props} />}
			/>
		</>
	)
}
