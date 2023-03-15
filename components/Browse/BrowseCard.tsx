import Image from 'next/image'
import Link from 'next/link'

import CostIcon from '../Generic/CostIcon'
import RecipeTags from '../Generic/RecipeTags'

import type { Recipe, Translations } from '../../types/recipes'

type RecipeProps = {
  recipe: Recipe
  translations: Translations
}

const BrowseCard = ({ recipe, translations }: RecipeProps) => {
  //
  // This is a hardcoded placeholder-image in case user has not provided a recipe picture
  //

  let imageSource

  if (!recipe.imgSrc) {
    imageSource = 'https://i.imgur.com/EMnGi9T.webp'
  } else {
    imageSource = recipe.imgSrc
  }

  return (
    <div className="max-w-sm lg:min-w-[30%] min-w-full rounded overflow-hidden shadow-lg bg-white dark:bg-zinc-800 dark:text-white">
      <Image src={imageSource} layout="responsive" width={375} height={200} alt="" objectFit="cover" priority={true} />
      <div className="px-6 py-4">
        <Link href={`/browse/${recipe.recipeId}`} passHref>
          <a href="validaccessiblelinkhere">
            <h1 className="text-xl mb-2 hover:underline underline-offset-8">{recipe.name}</h1>
          </a>
        </Link>
        <div className="pb-2 opacity-50">
          <CostIcon recipecost={recipe.cost} translations={translations} />
        </div>
        {recipe.description}
      </div>
      <div className="px-6 pt-2 pb-4">
        <RecipeTags recipetags={recipe.tags[0].tagsArr} />
      </div>
    </div>
  )
}

export default BrowseCard
