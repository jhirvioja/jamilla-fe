import Link from 'next/link'

import BrowseProgress from './BrowseProgress'

import type { Recipe, Translations } from '../../types/recipes'

type RecipeProps = {
	recipe: Recipe
	part: string
	translations: Translations
}

const BrowseRecipeFinal = (recipe: RecipeProps) => {
	const translations = recipe.translations
	const recipeData = recipe.recipe
	const recipePartLength = recipeData.steps.length + 1
	const previousPartInThisCase = recipePartLength - 2

	return (
		<>
			<div className="container mx-auto dark:bg-zinc-800 dark:pb-2">
				<div className="text-center p-2 pl-10 pr-10 dark:pt-5">
					<p id="recipe__progress--part">{translations.fin}!</p>
				</div>
				<BrowseProgress recipe={recipeData} />
				<div className="text-center p-2 pl-10 pr-10 dark:mt-5">
					<p>
						{translations.recipe} &quot;{recipeData.name}&quot; {translations.fintext} Bon appétit!
					</p>
				</div>
				<div className="text-center p-2">
					<div className="inline-block p-2">
						<Link
							href={
								recipe.part === '0'
									? `/browse/${recipeData.recipeId}`
									: `/browse/${recipeData.recipeId}?part=${previousPartInThisCase}`
							}
						>
							<button className="bg-green-700 hover:bg-black p-4 pt-2 pb-2 text-white hover:text-white">
								{translations.previous}
							</button>
						</Link>
					</div>
					<div className="inline-block p-2">
						<Link href={`/browse/${recipeData.recipeId}`}>
							<button
								id="recipe__button--final"
								className="border hover:bg-black border-black dark:border-white p-4 pt-2 pb-2 text-black dark:text-white hover:text-white"
							>
								{translations.gobackto}
							</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default BrowseRecipeFinal
