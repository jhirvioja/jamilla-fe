import { useRouter } from 'next/router'

import type { Recipe } from '../../types/recipes'

type RecipeProps = {
  recipe: Recipe
}

const BrowseProgress = (recipe: RecipeProps) => {
  const router = useRouter()

  const recipeData = recipe.recipe
  const recipePartLength = recipeData.steps.length
  const progress = (parseInt(router.query.part as string) / recipePartLength) * 100

  return (
    <div className="m-6">
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-zinc-700">
        <div id="recipe__progressbar" className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  )
}

export default BrowseProgress
