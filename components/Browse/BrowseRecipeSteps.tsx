import { useState, useEffect } from 'react'

import BrowseProgress from './BrowseProgress'

import type { Recipe, Translations } from '../../types/recipes'

import Button from '../Button'
import BrowseModal from './BrowseModal'
import VisuallyHidden from '../VisuallyHidden'

type RecipeProps = {
  recipe: Recipe
  part: string
  translations: Translations
}

const BrowseRecipe = (recipe: RecipeProps) => {
  const [isItTheLastStep, setLastStep] = useState(false)

  const recipeData = recipe.recipe
  const ingredients = recipeData.recipeIngredients
  const recipeStepPart = parseInt(recipe.part)
  const previousPart = parseInt(recipe.part) - 1
  const nextPart = parseInt(recipe.part) + 1
  const visualPartForRecipe = parseInt(recipe.part) + 1
  const recipePartLength = recipeData.steps.length

  useEffect(() => {
    if (document.activeElement) {
      const getActiveElement = document.activeElement as HTMLElement
      getActiveElement.blur()
    }
    if (recipeStepPart === recipeData.steps.length - 1) {
      setLastStep(true)
    } else {
      setLastStep(false)
    }
  }, [recipeStepPart])
  return (
    <>
      <div className="container mx-auto dark:bg-zinc-800 dark:pb-2">
        <div className="text-center p-2 pl-10 pr-10 dark:pt-5">
          <VisuallyHidden>
            <div aria-live="assertive">
              {recipe.translations.part} {visualPartForRecipe} / {recipePartLength},{' '}
              {recipeData.steps[recipeStepPart].description as string}
            </div>
          </VisuallyHidden>
          <p id="recipe__progress--part" aria-hidden="true">
            {recipe.translations.part} {visualPartForRecipe} / {recipePartLength}
          </p>
        </div>
        <BrowseProgress recipe={recipeData} />
        <div className="text-center p-2 pl-10 pr-10 dark:mt-5" aria-hidden="true">
          {recipeData.steps[recipeStepPart].description as string}
        </div>
        <div className="text-center p-2">
          <div className="inline-block p-2">
            <Button
              url={recipe.part === '0' ? `/browse/${recipeData.id}` : `/browse/${recipeData.id}?part=${previousPart}`}
              variant="primary"
            >
              {recipe.translations.previous}
            </Button>
          </div>
          <div className="inline-block p-2">
            <Button
              url={isItTheLastStep ? `/browse/${recipeData.id}?part=fin` : `/browse/${recipeData.id}?part=${nextPart}`}
              variant="primary"
            >
              {recipe.translations.next}
            </Button>
          </div>
          <div>
            <BrowseModal peepmsg={recipe.translations.peep} closemsg={recipe.translations.closemodal} ingredients={ingredients} />
          </div>
        </div>
      </div>
    </>
  )
}

export default BrowseRecipe
