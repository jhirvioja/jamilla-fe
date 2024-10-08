import Link from 'next/link'

import RecipeTags from '../RecipeTags'

import type { Recipe } from '../../types/recipes'

type RecipeProps = {
  recipe: Recipe
}

const SearchCard = ({ recipe }: RecipeProps) => {
  return (
    <div className="mb-4 max-w rounded overflow-hidden shadow-lg bg-white dark:bg-zinc-800 dark:m-4 dark:text-white dark:border dark:border-white dark:rounded-lg">
      <div className="px-6 pt-4 mb-2 flex flex-col justify-between md:flex-row">
        <Link href={`/browse/${recipe.id}`} passHref>
          <a href="validaccessiblelinkhere">
            <h1 className="text-xl hover:underline underline-offset-8">{recipe.name}</h1>
          </a>
        </Link>
        <div className="ml-0 mt-2 md:ml-5 md:mt-0.5">
          <RecipeTags recipetags={recipe.tags} />
        </div>
      </div>
    </div>
  )
}

export default SearchCard
