import ReactModal from 'react-modal'

import Button from '../../components/Generic/Button'

import React, { useState } from 'react'

import type { RecipeIngredients } from '../../types/recipes'

type ModalProps = {
	ingredients: RecipeIngredients[]
}

const IngredientList = ({ ingredients }: ModalProps) => {
	const listIngredients = ingredients.map((ingredient, i) => (
		//
		// Somehow, someway the fragment (<>) needs to be there for typescript?
		// Not sure if a bug or what is going on
		//

		<li key={i} className="p-2 odd:bg-zinc-100 dark:odd:bg-zinc-800 dark:text-white w-80">
			<>
				<span className={ingredient.amounts[0].value === '0' ? 'invisible' : 'font-semibold'}>
					<>
						{ingredient.amounts[0].value} {ingredient.amounts[0].unit}
					</>
				</span>{' '}
				{ingredient.name}
			</>
		</li>
	))
	return <ul>{listIngredients}</ul>
}

const BrowseModal = ({
	peepmsg,
	closemsg,
	ingredients,
}: {
	peepmsg: string
	closemsg: string
	ingredients: Array<RecipeIngredients>
}) => {
	const [showModal, setShowModal] = useState<boolean>(false)

	const handleOpenModal = () => {
		setShowModal(true)
	}

	const handleCloseModal = () => {
		setShowModal(false)
	}

	const nextAppId = document.getElementById('__next')

	if (nextAppId) {
		ReactModal.setAppElement(nextAppId)
	} else {
		console.log('SetAppElement (react-modal) was not set')
	}

	return (
		<div className="text-center">
			<Button url="#" variant="secondary" onClick={handleOpenModal}>
				{peepmsg}
			</Button>
			<ReactModal
				isOpen={showModal}
				contentLabel="Ingredients"
				className="grid place-items-center bg-white dark:bg-zinc-900 pt-10 overflow-y-auto max-h-screen"
			>
				<IngredientList ingredients={ingredients} />
				<div className="p-6 mb-6">
					<Button variant="primary" url="#" onClick={handleCloseModal}>
						{closemsg}
					</Button>
				</div>
			</ReactModal>
		</div>
	)
}

export default BrowseModal
