/* eslint-disable  @typescript-eslint/no-non-null-assertion */
import { useEffect } from 'react'

import Image from 'next/image'

import RecipeTags from '../RecipeTags'

import type { Recipe, Translations } from '../../types/recipes'
import Button from '../Button'
import { useLocalStorage } from '../../hooks/useLocalStorage'

type RecipeProps = {
  recipe: Recipe
  translations: Translations
}

const BrowseRecipe = ({ recipe, translations }: RecipeProps) => {
	const [recipeLocalStorage, setRecipeToLocalStorage] = useLocalStorage<Recipe>("recipe_" + recipe.id, recipe)

  const handleClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const ingredientEl = document.getElementById(event.currentTarget.id)

		if (!ingredientEl) {
			return;
		}
		
    const ingredientId = ingredientEl?.id.substring(3, ingredientEl?.id.length)
		const ingredientIdInt = parseInt(ingredientId)

    if (ingredientEl?.className === '') {
      const recipeIngredients = recipeLocalStorage.recipeIngredients
			const updatedRecipeIngredientPart = { ...recipeIngredients, [ingredientIdInt]: {...recipeIngredients[ingredientIdInt], stock: true} }
      const updatedLocalRecipeTrue = { ...recipeLocalStorage, recipeIngredients: updatedRecipeIngredientPart }
      setRecipeToLocalStorage(updatedLocalRecipeTrue)
    } else {
      const recipeIngredientsFalse = recipeLocalStorage.recipeIngredients
      const updatedRecipeIngredientPartFalse = { ...recipeIngredientsFalse, [ingredientIdInt]: {...recipeIngredientsFalse[ingredientIdInt], stock: false} }
      const updatedLocalRecipeFalse = { ...recipeLocalStorage, recipeIngredients: updatedRecipeIngredientPartFalse }
      setRecipeToLocalStorage(updatedLocalRecipeFalse)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLSpanElement>) => {
		const ingredientEl = document.getElementById(event.currentTarget.id)

		if (!ingredientEl) {
			return;
		}

		const ingredientId = ingredientEl?.id.substring(3, ingredientEl?.id.length)
		const ingredientIdInt = parseInt(ingredientId)

    if (event.key === 'Enter') {
      if (ingredientEl?.className === '') {
				const recipeIngredients = recipeLocalStorage.recipeIngredients
				const updatedRecipeIngredientPart = { ...recipeIngredients, [ingredientIdInt]: {...recipeIngredients[ingredientIdInt], stock: true} }
				const updatedLocalRecipeTrue = { ...recipeLocalStorage, recipeIngredients: updatedRecipeIngredientPart }
				setRecipeToLocalStorage(updatedLocalRecipeTrue)
      } else {
				const recipeIngredientsFalse = recipeLocalStorage.recipeIngredients
				const updatedRecipeIngredientPartFalse = { ...recipeIngredientsFalse, [ingredientIdInt]: {...recipeIngredientsFalse[ingredientIdInt], stock: false} }
				const updatedLocalRecipeFalse = { ...recipeLocalStorage, recipeIngredients: updatedRecipeIngredientPartFalse }
				setRecipeToLocalStorage(updatedLocalRecipeFalse)
      }
    }
  }

  let imageSource

  if (!recipeLocalStorage.imgSrc) {
    imageSource = 'https://i.imgur.com/EMnGi9T.webp'
  } else {
    imageSource = recipeLocalStorage.imgSrc
  }

  useEffect(() => {
    // Sets recipe to localstorage everytime when recipe list state (i.e. strikethrough) is changed

    window.localStorage.setItem('recipe_' + recipeLocalStorage.id, JSON.stringify(recipeLocalStorage))
  }, [recipeLocalStorage])

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
          <RecipeTags recipetags={recipeLocalStorage.tags} />
        </div>
        <div className="text-center p-4">{recipeLocalStorage.description}</div>
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
              {Object.keys(recipeLocalStorage.recipeIngredients).map((item, i) => (
                <tr key={i} className="odd:bg-white dark:odd:bg-zinc-900">
                  <td className="pl-2 sm:pl-4">
                    <span className={recipeLocalStorage.recipeIngredients[i].amountValue === '0' ? 'invisible' : 'font-semibold'}>
                      {recipeLocalStorage.recipeIngredients[i].amountValue}
                    </span>{' '}
                    <span className="font-semibold">{recipeLocalStorage.recipeIngredients[i].amountUnit}</span>
                    <span
                      tabIndex={0}
                      onClick={handleClick}
                      onKeyDown={handleKeyPress}
                      id={`ri_${i}`}
                      className={recipeLocalStorage.recipeIngredients[i].stock ? 'line-through' : ''}
                      role="checkbox"
                      aria-checked={recipeLocalStorage.recipeIngredients[i].stock ? 'true' : 'false'}
                    >
                      {' '}
                      {recipeLocalStorage.recipeIngredients[i].name}
                    </span>
                  </td>
                  <td className="text-right pr-2 sm:pr-4">
                    {recipeLocalStorage.recipeIngredients[i].stock ? (
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
          <Button url={`/browse/${recipeLocalStorage.id}?part=0`} variant="primary">
            {translations.startrecipe}
          </Button>
          <Button url={`/edit/${recipeLocalStorage.id}`} variant="secondary">
            {translations.editrecipe}
          </Button>
        </div>
      </div>
    </>
  )
}

export default BrowseRecipe
