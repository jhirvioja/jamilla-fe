export type Recipe = {
  id: string
  name: string
  date: string
  description: string
  prepTime: string
  cost: number
  imgSrc: string
  tags: string
  recipeIngredients: Array<RecipeIngredients>
  steps: Array<RecipeSteps>
}

export type RecipeIngredients = {
  name: string
  stock: boolean
  amountValue: string
  amountUnit: string
}

export type RecipeSteps = {
  part: number
  description: string
  steplast: boolean
}

export type Translations = {
  [key: string]: string
}
