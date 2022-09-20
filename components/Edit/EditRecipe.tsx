import React, { useState, createRef } from 'react'

import { useRouter } from 'next/router'

import type { Recipe, Translations } from '../../types/recipes'

import Input from '../Generic/Input'
import Button from '../Generic/Button'
import SubmitFormButton from '../Generic/SubmitFormButton'
import TextArea from '../Generic/TextArea'
import EditStepTextArea from '../Edit/EditStepTextArea'
import Spinner from '../Generic/Spinner'
import Select from '../Generic/Select'

export const EditRecipe = ({ translations, recipe }: { translations: Translations; recipe: Recipe }) => {
	const router = useRouter()

	//
	// Screen reader helpers
	//

	const InformSrOfLoading = () => {
		return (
			<div role="alert">
				<span className="sr-only">{translations.srAddingRecipe}</span>
			</div>
		)
	}

	const InformSrOfDone = () => {
		return (
			<div role="alert">
				<span className="sr-only">{translations.srRecipeAdded}</span>
			</div>
		)
	}

	//
	// Init configuration for the state 
	//

	const figureOutCost = (props: string | number) => {
		switch (props) {
			case 1:
				return 1
			case 2:
				return 2
			case 3:
				return 3
			case translations.priceselect1:
				return 1
			case translations.priceselect2:
				return 2
			case translations.priceselect3:
				return 3
		}
	}

	const freshIngredientsObj = recipe.recipeIngredients.map((item, i) => (item = {
		recipeId: 0,
		recipeIngredientId: 0,
		name: recipe.recipeIngredients[i].name,
		stock: false as boolean,
		amounts: [
			{
				recipeIngredientId: 0,
				amountId: 0,
				value: recipe.recipeIngredients[i].amounts[0].value,
				unit: recipe.recipeIngredients[i].amounts[0].unit,
			},
		],
	}))

	const freshStepsObj = recipe.steps.map((item, i) => (item = {
			recipeId: 0,
			stepId: 0,
			description: recipe.steps[i].description,
			steplast: false as boolean
	}))

	const freshTagsObj = recipe.tags.map((item, i) => (item = {
		recipeId: 0,
		tagId: 0,
		tagsArr: recipe.tags[i].tagsArr
	}))

	//
	// State handling starts here
	//

	const [loading, setLoading] = useState<string>()
	const [formstate, setFormState] = useState({
		recipeId: 0,
		name: recipe.name,
		description: recipe.description,
		prepTime: "30min",
		cost: undefined,
		imgSrc: recipe.imgSrc,
		tags: freshTagsObj,
		recipeIngredients: freshIngredientsObj,
		steps: freshStepsObj
	})

	//
	// Handling onChanges down here
	//

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		const name = event.target.name

		setFormState({ ...formstate, [name]: value })
	}

	const handleInputChangeTags = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		const name = event.target.name

		setFormState({ ...formstate, [name]: [{
			recipeId: 0,
			tagId: 0,
			tagsArr: value
		}]})
	}

	const handleIngredientNameChange = (i: number, event: React.ChangeEvent<Element>) => {

		const value = (event.target as HTMLInputElement).value

		const updObj = {
			recipeId: 0,
			recipeIngredientId: 0,
			name: value,
			stock: false,
			amounts: [
				{
					recipeIngredientId: 0,
					amountId: 0,
					value: formstate.recipeIngredients[i].amounts[0].value,
					unit: formstate.recipeIngredients[i].amounts[0].unit,
				},
			],
		}

		const recipeIngredients = formstate.recipeIngredients.map((item, i2) => (i2 === i ? (item = updObj) : item))

		setFormState({ ...formstate, recipeIngredients })
	}

	const handleIngredientUnitChange = (i: number, event: React.ChangeEvent<Element>) => {

		const value = (event.target as HTMLInputElement).value

		const updObj = {
			recipeId: formstate.recipeIngredients[i].recipeId,
			recipeIngredientId: formstate.recipeIngredients[i].recipeIngredientId,
			name: formstate.recipeIngredients[i].name,
			stock: false,
			amounts: [
				{
					recipeIngredientId: formstate.recipeIngredients[i].recipeIngredientId,
					amountId: formstate.recipeIngredients[i].amounts[0].amountId,
					value: formstate.recipeIngredients[i].amounts[0].value,
					unit: value,
				},
			],
		}

		const recipeIngredients = formstate.recipeIngredients.map((item, i2) => (i2 === i ? (item = updObj) : item))

		setFormState({ ...formstate, recipeIngredients })
	}

	const handleIngredientValueChange = (i: number, event: React.ChangeEvent<Element>) => {

		const value = (event.target as HTMLInputElement).value

		const updObj = {
			recipeId: formstate.recipeIngredients[i].recipeId,
			recipeIngredientId: formstate.recipeIngredients[i].recipeIngredientId,
			name: formstate.recipeIngredients[i].name,
			stock: false,
			amounts: [
				{
					recipeIngredientId: formstate.recipeIngredients[i].recipeIngredientId,
					amountId: formstate.recipeIngredients[i].amounts[0].amountId,
					value: value,
					unit: formstate.recipeIngredients[i].amounts[0].unit,
				},
			],
		}

		const recipeIngredients = formstate.recipeIngredients.map((item, i2) => (i2 === i ? (item = updObj) : item))

		setFormState({ ...formstate, recipeIngredients })

	}

	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value
		const name = event.target.name

		setFormState({ ...formstate, [name]: figureOutCost(value) })
	}

	const handleStepTextAreaChange = (i: number, event: React.ChangeEvent<Element>) => {
		const value = (event.target as HTMLInputElement).value

		const updObj = {
			recipeId: formstate.steps[i].recipeId,
			stepId: formstate.steps[i].stepId,
			description: value,
			steplast: formstate.steps[i].steplast
		}

		const steps = formstate.steps.map((item, i2) => (i2 === i ? (item = updObj) : item))

		setFormState({ ...formstate, steps })

	}

	//
	// onClicks are here
	//

	const deleteIngredient = (i: number) => {
		const currentRecipe = formstate.recipeIngredients
		const recipeIngredients = currentRecipe.filter((ingredient, filterIterator) => {
			return filterIterator !== i
		})
		setFormState({ ...formstate, recipeIngredients })
	}

	
	const deleteStep = (i: number) => {
			const steps = formstate.steps.filter((ingredient, filterIterator) => {
				return filterIterator !== i
			})
	
			setFormState({ ...formstate, steps })
	
		}

	const onAddIngredientButtonClick = () => {
		const newObj = {
			recipeId: recipe.recipeId,
			recipeIngredientId: 0,
			name: '',
			stock: false,
			amounts: [
				{
					recipeIngredientId: 0,
					amountId: 0,
					value: '',
					unit: '',
				},
			],
		}

		formstate.recipeIngredients.push(newObj)

		// At the end change the location to the right header
		// So that speech reader catches up on the right spot focus wise

		window.document.location.href = '#ingredients'
	}

	const onAddStepButtonClick = () => {
		const i = formstate.steps.length - 1

		const newObj = {
			recipeId: recipe.recipeId,
			stepId: 0,
			description: '',
			steplast: true
		}

		formstate.steps.push(newObj)

		const updObj = {
			recipeId: formstate.steps[i].recipeId,
			stepId: formstate.steps[i].stepId,
			description: formstate.steps[i].description,
			steplast: false
		}

		const steps = formstate.steps.map((item, mapsIterator) => (mapsIterator === i ? (item = updObj) : item))

		setFormState({ ...formstate, steps })

		// At the end change the location to the right header
		// So that speech reader catches up on the right spot focus wise

		window.document.location.href = '#recipesteps'
	}

	const onDeleteButtonClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		event.preventDefault()

		const deleteMethod = {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		}

		const url = `${process.env.API_URL}/recipe/${recipe.recipeId}`

		if (confirm(translations.deletequestion)) {
			fetch(url, deleteMethod)
				.then((response) => response.json())
				.then((data) => console.log('Succesful, ' + data))
				.catch((err) => console.log('An error occured ' + err))
				// Then go to browse page. Todo: Should convey a message to screenreader that it was deleted
				window.location.href = `${process.env.REACT_APP_URL}/browse/`
		}

		try {
			// In order to keep up the sync with localStorage
			// we need to delete it from there as well

			window.localStorage.removeItem('recipe_' + recipe.recipeId)
		} catch (error) {
			console.log('Error while trying to remove from localStorage')
		}

	}

	//
	// Creating refs for form validation
	//

	const nameRef = createRef() as React.RefObject<HTMLInputElement>
	const priceRef = createRef() as React.RefObject<HTMLSelectElement>
	const imgRef = createRef() as React.RefObject<HTMLInputElement>
	const tagsRef = createRef() as React.RefObject<HTMLInputElement>
	const descRef = createRef() as React.RefObject<HTMLTextAreaElement>

	//
	// Lastly, error checking & submitting
	//

	const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault()

		const nameRefValidity = nameRef.current as HTMLInputElement
		const priceRefValidity = priceRef.current as HTMLSelectElement
		const imgRefValidity = imgRef.current as HTMLInputElement
		const tagsRefValidity = tagsRef.current as HTMLInputElement
		const descRefValidity = descRef.current as HTMLTextAreaElement
		const formBasics = document.getElementById('recipeFormBasics') as HTMLFormElement
		const formIngredients = document.getElementById('recipeFormIngredients') as HTMLFormElement
		const formSteps = document.getElementById('recipeFormSteps') as HTMLFormElement

		// These have to be in the opposite order for the validation to work in order
		// Here one could probably use a custom hook like useFormHandling to achieve the same result

		formSteps.checkValidity()
		formIngredients.checkValidity()
		formBasics.checkValidity()

		if (formstate.description.length < 1) {
			descRefValidity.setCustomValidity(translations.descValid)
		} else {
			descRefValidity.setCustomValidity('')
		}

		if (formstate.tags[0].tagsArr.length < 1) {
			tagsRefValidity.setCustomValidity(translations.hashValid)
		} else {
			tagsRefValidity.setCustomValidity('')
		}

		if (formstate.cost === undefined) {
			priceRefValidity.setCustomValidity(translations.priceValid)
		} else {
			priceRefValidity.setCustomValidity('')
		}

		if (formstate.name.length < 1) {
			nameRefValidity.setCustomValidity(translations.nameValid)
		} else {
			nameRefValidity.setCustomValidity('')
		}

		// Same with these

		formSteps.reportValidity()
		formIngredients.reportValidity()
		descRefValidity.reportValidity()
		tagsRefValidity.reportValidity()
		imgRefValidity.reportValidity()
		priceRefValidity.reportValidity()
		nameRefValidity.reportValidity()


		// Post a recipe

		async function postRecipe() {

			if (!formSteps.checkValidity() || !formIngredients.checkValidity() || !formBasics.checkValidity()) {
				setLoading('usererror')
			}
			if (formSteps.checkValidity() && formIngredients.checkValidity() && formBasics.checkValidity()) {
				setLoading('loading')
				await fetch(`${process.env.API_URL}/recipe`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formstate),
				})
					.then((response) => response.json())
					.then(() => {
						setLoading('done')
						deleteOriginalRecipeFromApi()
					})
					.catch((error) => {
						console.error('Error:', error)
						setLoading('error')
					})
			}
		}

		// Delete the old recipe from localStorage and API

		async function deleteOriginalRecipeFromApi() {

			try {
				window.localStorage.removeItem('recipe_' + recipe.recipeId)
			} catch (error) {
				console.log('Error while trying to remove from localStorage')
			}

			const url = `${process.env.API_URL}/recipe/${recipe.recipeId}`
	
			const deleteMethod = {
				method: 'DELETE',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}
	
			const response = await fetch(url, deleteMethod)
				.then((response) => response.json())
				.then(() => router.push('/browse'))
				.catch((err) => console.log('An error occured, ' + err))

			return response
		}

		//
		// Final object to be sent to the API. Uncomment for debugging.
		//

		// console.log(formstate)
	
		//
		// Final command to post the recipe. Comment for debugging.
		// 

		postRecipe()

	}

	return (
		<div>
			<hr></hr>
			<form action="" id="recipeFormBasics">
				<div className="m-4">
					<Input
						forwardedRef={nameRef}
						type="text"
						label={translations.name}
						name="name"
						required={true}
						onChange={handleInputChange}
						value={formstate.name}
					></Input>
				</div>
				<div className="m-4">
					<Select
						forwardedRef={priceRef}
						label={translations.portionprice}
						name="cost"
						required={true}
						options={["", translations.priceselect1, translations.priceselect2, translations.priceselect3]}
						onChange={handleSelectChange}
					></Select>
				</div>
				<div className="m-4">
					<Input
						forwardedRef={imgRef}
						type="text"
						label={translations.imgurl}
						name="imgSrc"
						required={false}
						value={formstate.imgSrc}
						onChange={handleInputChange}
					></Input>
				</div>
				<div className="m-4">
					<Input
						forwardedRef={tagsRef}
						type="text"
						label={translations.hashtags}
						name="tags"
						required={true}
						value={formstate.tags[0].tagsArr}
						onChange={handleInputChangeTags}
					></Input>
				</div>
				<div className="m-4">
					<TextArea
						placeholder=""
						forwardedRef={descRef}
						label={translations.description}
						maxchar={300}
						name="description"
						translations={translations}
						required
						value={formstate.description}
						onChange={handleInputChange}
						wordcount={formstate.description.length}
					></TextArea>
				</div>
			</form>
			<h2 id="ingredients">{translations.ingredients}</h2>
			<hr></hr>
			<form action="" id="recipeFormIngredients">
				{formstate.recipeIngredients.map((ingredient, i) => (
					<div key={i}>
						<div className="flex flex-col ml-2 mr-2 lg:flex-row lg:items-end" aria-live="polite">
							<div className="basis-1/6 m-2">
								<Input
									type="text"
									label={translations.amountof}
									name={'Value_' + i}
									required={true}
									value={ingredient.amounts[0].value as string}
									onChange={(e) => handleIngredientValueChange(i, e)}
								></Input>
							</div>
							<div className="basis-1/6 m-2">
								<Input
									type="text"
									label={translations.unitof}
									name={'Unit_' + i}
									required={false}
									value={ingredient.amounts[0].unit as string}
									onChange={(e) => handleIngredientUnitChange(i, e)}
								></Input>
							</div>
							<div className="basis-4/6 m-2">
								<Input
									type="text"
									label={translations.ingredient}
									name={'Name_' + i}
									required={true}
									value={ingredient.name}
									onChange={(e) => handleIngredientNameChange(i, e)}
								></Input>
							</div>
							<div className="basis-2/6 mb-3 text-right">
								{i !== 0 ? (
									<Button url="#ingredients" variant="destructive" onClick={() => deleteIngredient(i)}>
										{translations.deleteingredient}
									</Button>
								) : (
									''
								)}
							</div>
						</div>
					</div>
				))}
				<div className="m-3">
					<Button url="#ingredients" variant="secondary" onClick={onAddIngredientButtonClick}>
						{translations.addingredient}
					</Button>
				</div>
			</form>
			<h2 id="recipesteps">{translations.recipesteps}</h2>
			<hr></hr>
			<form action="" id="recipeFormSteps">
			{formstate.steps.map((step, i) => (
			<div key={i}>
				<div className="flex flex-col ml-2 mr-2 lg:flex-row lg:items-start">
				<div className="basis-1/6 lg:basis-1/6 m-2 mb-2 pt-2 font-semibold dark:text-white">
					{translations.recipestep + " " + (i+1)}
				</div>
				<div className="basis-5/6 m-2">
					<EditStepTextArea
						label={translations.stepdesc}
						maxchar={800}
						placeholder=""
						name={'StepDescription_' + i}
						translations={translations}
						value={step.description}
						onChange={(e) => handleStepTextAreaChange(i, e)}
						wordcount={formstate.steps[i].description.length}
						required
					></EditStepTextArea>
				</div>
				<div className="basis-1/6 lg:basis-2/6 lg:mt-10 text-right">
				{i !== 0 ? (
					<Button url="#recipesteps" variant="destructive" onClick={() => deleteStep(i)}>
						{translations.deletestep}
					</Button>) : ''}
				</div>
				</div>
			</div>
			))}
				<div className="m-3">
					<Button url="#recipesteps" variant="secondary" onClick={onAddStepButtonClick}>
						{translations.addstep}
					</Button>
				</div>
			</form>
			<hr></hr>
			<div className="m-3">
				<SubmitFormButton variant="primary" onClick={onSubmit}>
					{translations.save}
				</SubmitFormButton>
				<Button url="#" variant="destructive" onClick={onDeleteButtonClick}>
					{translations.deleterecipe}
				</Button>
				{loading === 'loading' ? (
					<div className="inline-block pl-4 dark:text-white">
						<InformSrOfLoading />
						<Spinner />
					</div>
				) : (
					''
				)}
				{loading === 'done' ? (
					<div className="inline-block pl-4 dark:text-white">
						<InformSrOfDone />
						{translations.recipesaved}
					</div>
				) : (
					''
				)}
				{loading === 'usererror' ? (
					<div className="inline-block pl-4 dark:text-white">
						{translations.checktheform}
					</div>
				) : (
					''
				)}
				{loading === 'error' ? (
					<div className="inline-block pl-4 dark:text-white">
						{translations.errormsg}
					</div>
				) : (
					''
				)}
			</div>
		</div>
	)
}