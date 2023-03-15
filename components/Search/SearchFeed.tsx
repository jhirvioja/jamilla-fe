import React, { useState, useEffect, createRef } from 'react'

import useSWR from 'swr'

import SearchCard from './SearchCard'
import Input from '../Generic/Input'
import SubmitFormButton from '../Generic/SubmitFormButton'

import type { Recipe, TagsArray, Translations } from '../../types/recipes'
import SkeletonLoading from './SkeletonLoading'

type dataFromApi = {
  recipesTagsUpd: Array<TagsArray>
  recipesUpd: Array<Recipe>
}

// This component / feat uses SWR by Vercel
// It caches stuff by default and does other neat stuff
// See more at: https://swr.vercel.app/docs/getting-started
// Error handling down below taken from: https://swr.vercel.app/docs/error-handling

const fetcher = async (url: string) => {
  const res = await fetch(url)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')

    // Attach extra info to the error object.

    throw error
  }
  return res.json()
}

const SearchFeed = ({ translations }: { translations: Translations }) => {
  const [recipes, setRecipes] = useState<JSX.Element[]>()
  const [keyword, setKeyword] = useState<string>()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [searchIsDone, setSearchIsDone] = useState<boolean>(false)

  const { data: recipe, error: recipeError } = useSWR(`${process.env.API_URL}/recipes`, fetcher)
  const { data: searchResults, error: searchError } = useSWR(`${process.env.API_URL}/search?keyword=${keyword}`, fetcher)

  const searchRef = createRef() as React.RefObject<HTMLInputElement>

  const findRecipesAndParse = (searchResultsData: dataFromApi, recipe: Array<Recipe>) => {
    setRecipes(undefined)

    if (!searchResultsData && !recipe) {
      setLoading(false)
    }

    setSearchIsDone(false)
    setLoading(true)

    if (searchResultsData && recipe) {
      const tagsArray = searchResultsData.recipesTagsUpd
      const recipesArray = searchResultsData.recipesUpd

      const recipeIdsArray: number[] = []

      tagsArray.forEach(function (tags: TagsArray) {
        recipeIdsArray.push(tags.recipeId)
      })

      recipesArray.forEach(function (recipe: Recipe) {
        recipeIdsArray.push(recipe.recipeId)
      })

      const uniqueIds = [...new Set(recipeIdsArray)]
      const filteredRecipe = recipe.filter((e) => uniqueIds.includes(e.recipeId))
      const mappedRecipes = filteredRecipe.map((recipe: Recipe, i: number) => <SearchCard recipe={recipe} key={i} />)

      setRecipes(mappedRecipes)
      setSearchIsDone(true)
      setLoading(false)
    }
  }

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()

    const form = document.getElementById('search__form') as HTMLFormElement
    const searchRefValidity = searchRef.current as HTMLInputElement

    const formData = new FormData(form)
    const searchterm = formData.getAll('search__term')[0] as string

    form.checkValidity()

    if (searchterm.length < 1) {
      searchRefValidity.setCustomValidity(translations.searchValid)
    } else {
      searchRefValidity.setCustomValidity('')
    }

    form.reportValidity()

    setKeyword(searchterm)
  }

  useEffect(() => {
    findRecipesAndParse(searchResults, recipe)
  }, [searchResults, recipe])

  if (recipeError || searchError) {
    return (
      <>
        <form id="search__form">
          <div className="flex flex-wrap flex-col ml-4 mr-4 md:flex-row md:items-end gap-x-2 justify-center">
            <div className="basis-5/6 mb-2">
              <Input forwardedRef={searchRef} type="search" label={translations.searchterm} name="search__term" required={true}></Input>
            </div>
            <div className="mb-4">
              <SubmitFormButton variant="primary" onClick={onSubmit}>
                {translations.searchbutton}
              </SubmitFormButton>
            </div>
          </div>
        </form>
        <hr></hr>
        <div className="mt-4 flex flex-col">
          <div className="pt-6 pb-4 mb-2 flex flex-col text-center">
            <p>
              {translations.loadingsearchfailed}
              <span aria-hidden="true"> 😔</span>
            </p>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <form id="search__form">
        <div className="flex flex-wrap flex-col ml-4 mr-4 md:flex-row md:items-end gap-x-2 justify-center">
          <div className="basis-5/6 mb-2">
            <Input forwardedRef={searchRef} type="search" label={translations.searchterm} name="search__term" required={true}></Input>
          </div>
          <div className="mb-4">
            <SubmitFormButton variant="primary" onClick={onSubmit}>
              {translations.searchbutton}
            </SubmitFormButton>
          </div>
        </div>
      </form>
      <hr></hr>
      <div className="mt-4 flex flex-col">
        {isLoading ? (
          <>
            <SkeletonLoading loading={translations.loading} />
          </>
        ) : (
          ''
        )}
        {keyword && searchIsDone ? (
          <>
            <div role="alert">
              <span className="sr-only">
                {translations.searchUpd} {keyword}
              </span>
            </div>
          </>
        ) : (
          ''
        )}
        {recipes}
        {keyword && recipes?.length === 0 ? (
          <>
            <div className="pt-6 pb-4 mb-2 flex flex-col text-center dark:text-white">{translations.noresults}</div>
          </>
        ) : (
          ''
        )}
      </div>
    </>
  )
}
export default SearchFeed
