import React, { useId } from 'react'

type InputProps = {
	type: string
	label: string
	required: boolean
	placeholder?: string
	name: string
	forwardedRef?: React.RefObject<HTMLInputElement>
	onChange?: React.ChangeEventHandler
	value?: string
}

const Input = ({ type, label, required, placeholder, name, forwardedRef, onChange, value }: InputProps) => {
	const uniqueId = useId()

	switch (type) {
		case 'text':
			if (required) {
				return (
					<>
						<label
							htmlFor={'Input_' + uniqueId}
							className="block font-medium mb-2 mt-2 dark:text-white after:content-['_*']"
						>
							{label}
						</label>
						<input
							ref={forwardedRef}
							onChange={onChange}
							value={value}
							type="text"
							id={'Input_' + uniqueId}
							name={name}
							className="block pl-3 pt-2 pb-2 mb-2 mt-2 min-w-full placeholder-gray-700 placeholder:italic dark:bg-black dark:text-white dark:placeholder-gray-200"
							required
						/>
					</>
				)
			}
			return (
				<>
					<label htmlFor={'Input_' + uniqueId} className="block font-medium mb-2 mt-2 dark:text-white">
						{label}
					</label>
					<input
						ref={forwardedRef}
						onChange={onChange}
						value={value}
						type="text"
						id={'Input_' + uniqueId}
						name={name}
						className="block pl-3 pt-2 pb-2 mb-2 mt-2 min-w-full placeholder-gray-700 placeholder:italic dark:bg-black dark:text-white dark:placeholder-gray-200"
					/>
				</>
			)
		case 'email':
			if (required) {
				return (
					<>
						<label
							htmlFor={'Input_' + uniqueId}
							className="block font-medium mb-2 mt-2 dark:text-white after:content-['_*']"
						>
							{label}
						</label>
						<input
							ref={forwardedRef}
							onChange={onChange}
							value={value}
							type="email"
							id={'Input_' + uniqueId}
							name={name}
							className="block pl-3 pt-2 pb-2 mb-2 mt-2 min-w-full placeholder-gray-700 placeholder:italic dark:bg-black dark:text-white dark:placeholder-gray-200"
							required
						/>
					</>
				)
			}
			return (
				<>
					<label htmlFor={'Input_' + uniqueId} className="block font-medium mb-2 mt-2 dark:text-white">
						{label}
					</label>
					<input
						ref={forwardedRef}
						onChange={onChange}
						value={value}
						type="email"
						id={'Input_' + uniqueId}
						name={name}
						className="block pl-3 pt-2 pb-2 mb-2 mt-2 min-w-full placeholder-gray-700 placeholder:italic dark:bg-black dark:text-white dark:placeholder-gray-200"
					/>
				</>
			)
		case 'password':
			if (required) {
				return (
					<>
						<label
							htmlFor={'Input_' + uniqueId}
							className="block font-medium mb-2 mt-2 dark:text-white after:content-['_*']"
						>
							{label}
						</label>
						<input
							ref={forwardedRef}
							onChange={onChange}
							value={value}
							type="password"
							id={'Input_' + uniqueId}
							name={name}
							className="block pl-3 pt-2 pb-2 mb-2 mt-2 min-w-full placeholder-gray-700 placeholder:italic dark:bg-black dark:text-white dark:placeholder-gray-200"
							required
						/>
					</>
				)
			}
			return (
				<>
					<label htmlFor={'Input_' + uniqueId} className="block font-medium mb-2 mt-2 dark:text-white">
						{label}
					</label>
					<input
						ref={forwardedRef}
						onChange={onChange}
						value={value}
						type="password"
						id={'Input_' + uniqueId}
						name={name}
						className="block pl-3 pt-2 pb-2 mb-2 mt-2 min-w-full placeholder-gray-700 placeholder:italic dark:bg-black dark:text-white dark:placeholder-gray-200"
					/>
				</>
			)
		case 'search':
			if (required) {
				return (
					<>
						<label
							htmlFor={'Input_' + uniqueId}
							className="block font-medium mb-2 mt-2 dark:text-white after:content-['_*']"
						>
							{label}
						</label>
						<input
							ref={forwardedRef}
							onChange={onChange}
							value={value}
							type="search"
							id={'Input_' + uniqueId}
							name={name}
							className="block pl-3 pt-2 pb-2 mb-2 mt-2 min-w-full placeholder-gray-700 placeholder:italic dark:bg-black dark:text-white dark:placeholder-gray-200"
							required
						/>
					</>
				)
			}
			return (
				<>
					<label htmlFor={'Input_' + uniqueId} className="block font-medium mb-2 mt-2 dark:text-white">
						{label}
					</label>
					<input
						ref={forwardedRef}
						onChange={onChange}
						value={value}
						type="search"
						id={'Input_' + uniqueId}
						placeholder={placeholder}
						name={name}
						className="block pl-3 pt-2 pb-2 mb-2 mt-2 min-w-full placeholder-gray-700 placeholder:italic dark:bg-black dark:text-white dark:placeholder-gray-200"
					/>
				</>
			)
		default:
			return (
				<>
					<p>Error</p>
				</>
			)
	}
}

export default Input
