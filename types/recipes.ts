export type Recipe = {
  recipeId: number
  name: string
  description: string
  prepTime: string
  cost: number
  imgSrc: string
  tags: Array<TagsArray>
  recipeIngredients: Array<RecipeIngredients>
  steps: Array<RecipeSteps>
}

export type TagsArray = {
  recipeId: number
  tagId: number
  tagsArr: string
}

export type RecipeIngredients = {
  recipeId: number
  recipeIngredientId: number
  name: string
  stock: boolean
  amounts: Array<Amount>
}

export type Amount = {
  recipeIngredientId: number
  amountId: number
  value: string | File
  unit: string | File
}

export type RecipeSteps = {
  recipeId: number
  stepId: number
  description: string
  steplast: boolean
}

export type Translations = {
  [key: string]: string
}
