import React, { useId } from 'react'

type SelectProps = {
	label: string
	required: boolean
	name: string
	options: string[]
	forwardedRef?: React.RefObject<HTMLSelectElement>
	onChange?: React.ChangeEventHandler
	value?: string
	selectedItem?: number
}

const Select = ({ label, required, name, options, onChange, forwardedRef, value, selectedItem }: SelectProps) => {
	const uniqueId = useId()

	if (required) {
		return (
			<>
				<label
					htmlFor={'Input_' + uniqueId}
					className="block font-medium mb-2 mt-2 dark:text-white after:content-['_*']"
				>
					{label}
				</label>
				<select
					ref={forwardedRef}
					id={'Input_' + uniqueId}
					name={name}
					className="block pl-3 pt-2 pb-2 mb-2 mt-2 min-w-full placeholder-gray-700 dark:bg-black dark:text-white dark:placeholder-gray-200"
					onChange={onChange}
					value={value}
				>
					{options.map((value, i) => (
						<option key={i} selected={i === selectedItem ? true : false}>
							{value}
						</option>
					))}
				</select>
			</>
		)
	}
	return (
		<>
			<label htmlFor={'Input_' + uniqueId} className="block font-medium mb-2 mt-2 dark:text-white">
				{label}
			</label>
			<select
				ref={forwardedRef}
				id={'Input_' + uniqueId}
				name={name}
				className="block pl-3 pt-2 pb-2 mb-2 mt-2 min-w-full placeholder-gray-700 dark:bg-black dark:text-white dark:placeholder-gray-200"
				onChange={onChange}
				value={value}
			>
				{options.map((value, i) => (
					<option key={i}>{value}</option>
				))}
			</select>
		</>
	)
}

export default Select
