import Input from '@/shared/ui-kit/input/ui/input'
import { IoSearch } from 'react-icons/io5'
export const HomePage = () => {
	return (
		<>
			<Input
				placeholder='Поиск пользавателя'
				icon={props => (
					<IoSearch
						style={{
							width: '25px',
							height: '25px',
							position: 'absolute',
							left: '20px',
							top: '12px',
						}}
						{...props}
					/>
				)}
				// icon={null}
			/>
		</>
	)
}
