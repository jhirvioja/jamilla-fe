/* eslint-disable  @typescript-eslint/no-non-null-assertion */
import { useState, useEffect } from 'react'

import Image from 'next/image'

import RecipeTags from '../Generic/RecipeTags'

import type { Recipe, Translations } from '../../types/recipes'
import Button from '../Generic/Button'

type RecipeProps = {
	recipe: Recipe
	translations: Translations
}

// This could be more elegant overall
// It could use https://usehooks.com/useLocalStorage/ for example

const BrowseRecipe = ({ recipe, translations }: RecipeProps) => {
	const [recipehook, setRecipe] = useState(() => {
		//
		// Sees if props-referred recipe is saved in localstorage
		// If not, saves it to localstorage
		//

		const storageCopy = JSON.parse(window.localStorage.getItem('recipe_' + recipe.recipeId) as string)

		if (storageCopy === null) {
			window.localStorage.setItem('recipe_' + recipe.recipeId, JSON.stringify(recipe))
		}

		//
		// Else: takes the recipe from localstorage and sets as the state
		// This way a browser-local version of the recipe exists with right strikethroughs
		//

		return JSON.parse(window.localStorage.getItem('recipe_' + recipe.recipeId)!)

		//
		// In this particular case it cannot be "null", hence the "!"
		// There is already error checking at the point where it fetches recipes from the API
		// Probably still can be null somewhere along the way now that I typed that
		//
	})

	const handleClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
		const ingredientEl = document.getElementById(event?.currentTarget?.id)
		const ingredientId = ingredientEl?.id.substring(3, ingredientEl?.id.length)

		if (ingredientEl?.className === '') {
			// This here is a hot mess and has a strong scent of refactoring
			// Works for now though

			const recipeIngredients = recipehook.recipeIngredients[ingredientId as string]
			const updatedRecipeIngredientPart = { ...recipeIngredients, stock: true }
			const updatedRecipeIngredientPart2 = {
				...recipehook.recipeIngredients,
				[ingredientId as string]: updatedRecipeIngredientPart,
			}

			const updatedLocalRecipeTrue = { ...recipehook, recipeIngredients: updatedRecipeIngredientPart2 }
			setRecipe(updatedLocalRecipeTrue)
		} else {
			const recipeIngredientsFalse = recipehook.recipeIngredients[ingredientId as string]
			const updatedRecipeIngredientPartFalse = { ...recipeIngredientsFalse, stock: false }
			const updatedRecipeIngredientPart2False = {
				...recipehook.recipeIngredients,
				[ingredientId as string]: updatedRecipeIngredientPartFalse,
			}
			const updatedLocalRecipeFalse = { ...recipehook, recipeIngredients: updatedRecipeIngredientPart2False }
			setRecipe(updatedLocalRecipeFalse)
		}
	}

	const handleKeyPress = (event: React.KeyboardEvent<HTMLSpanElement>) => {
		const ingredientEl = document.getElementById(event?.currentTarget?.id)
		const ingredientId = ingredientEl?.id.substring(3, ingredientEl?.id.length)

		if (event.key === 'Enter') {
			// This here is a hot mess and has a strong scent of refactoring
			// Works for now though

			if (ingredientEl?.className === '') {
				const recipeIngredients = recipehook.recipeIngredients[ingredientId as string]
				const updatedRecipeIngredientPart = { ...recipeIngredients, stock: true }
				const updatedRecipeIngredientPart2 = {
					...recipehook.recipeIngredients,
					[ingredientId as string]: updatedRecipeIngredientPart,
				}
				const updatedLocalRecipeTrue = { ...recipehook, recipeIngredients: updatedRecipeIngredientPart2 }
				setRecipe(updatedLocalRecipeTrue)
			} else {
				const recipeIngredientsFalse = recipehook.recipeIngredients[ingredientId as string]
				const updatedRecipeIngredientPartFalse = { ...recipeIngredientsFalse, stock: false }
				const updatedRecipeIngredientPart2False = {
					...recipehook.recipeIngredients,
					[ingredientId as string]: updatedRecipeIngredientPartFalse,
				}
				const updatedLocalRecipeFalse = { ...recipehook, recipeIngredients: updatedRecipeIngredientPart2False }
				setRecipe(updatedLocalRecipeFalse)
			}
		}
	}

	let imageSource

	if (!recipehook.imgSrc) {
		imageSource = 'https://i.imgur.com/EMnGi9T.webp'
	} else {
		imageSource = recipehook.imgSrc
	}

	useEffect(() => {
		// Sets recipe to localstorage everytime when recipe list state (i.e. strikethrough) is changed

		window.localStorage.setItem('recipe_' + recipehook.recipeId, JSON.stringify(recipehook))
	}, [recipehook])

	return (
		<>
			<div className="container mx-auto dark:bg-zinc-800 dark:pb-3">
				<Image
					src={imageSource}
					layout="responsive"
					width={375}
					height={100}
					alt=""
					objectFit="cover"
					objectPosition="center"
					priority={true}
				/>
				<div className="px-6 pt-4 text-center">
					<RecipeTags recipetags={recipehook.tags[0].tagsArr} />
				</div>
				<div className="text-center p-4">{recipehook.description}</div>
				<div className="text-center p-2">
					<h2>{translations.ingredients}</h2>
					<p className="text-xs">
						{translations.tip} <span aria-hidden="true">📝</span>
					</p>
					<p className="text-xs">{translations.tip2}</p>
				</div>
				<div>
					<table className="text-black table-auto min-w-full dark:text-white">
						<tbody>
							<tr>
								<th className="sr-only">{translations.ingredient}, </th>
								<th className="sr-only">{translations.instock}</th>
							</tr>
							{Object.keys(recipehook.recipeIngredients).map((item, i) => (
								<tr key={i} className="odd:bg-white dark:odd:bg-zinc-900">
									<td className="pl-2 sm:pl-4">
										<span
											className={
												recipehook.recipeIngredients[i].amounts[0].value === '0' ? 'invisible' : 'font-semibold'
											}
										>
											{recipehook.recipeIngredients[item].amounts[0].value}
										</span>{' '}
										<span className="font-semibold">{recipehook.recipeIngredients[item].amounts[0].unit}</span>
										<span
											tabIndex={0}
											onClick={handleClick}
											onKeyPress={handleKeyPress}
											id={`ri_${i}`}
											className={recipehook.recipeIngredients[i].stock ? 'line-through' : ''}
											role="checkbox"
											aria-checked={recipehook.recipeIngredients[i].stock ? 'true' : 'false'}
										>
											{' '}
											{recipehook.recipeIngredients[i].name}
										</span>
									</td>
									<td className="text-right pr-2 sm:pr-4">
										{recipehook.recipeIngredients[i].stock ? (
											<>
												<span className="sr-only">{translations.yes}</span>
												<span aria-hidden="true">✅</span>
											</>
										) : (
											<>
												<span className="sr-only">{translations.no}</span>
												<span aria-hidden="true">❌</span>
											</>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="text-center p-2 pt-6">
					<Button url={`/browse/${recipehook.recipeId}?part=0`} variant="primary">
						{translations.startrecipe}
					</Button>
					<Button url={`/edit/${recipehook.recipeId}`} variant="secondary">
						{translations.editrecipe}
					</Button>
				</div>
			</div>
		</>
	)
}

export default BrowseRecipe
