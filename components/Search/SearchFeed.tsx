import React, { useState, useEffect, createRef } from 'react'

import useSWR from 'swr'

import SearchCard from './SearchCard'
import Input from '../Input'
import SubmitFormButton from '../SubmitFormButton'

import type { Recipe, Translations } from '../../types/recipes'
import SkeletonLoading from './SkeletonLoading'

type dataFromApi = {
  nameResults: Array<Recipe>
  tagsResults: Array<Recipe>
}

// interface FetcherOptions {
//   url: string;
//   body?: object;
// }

const fetcher = (url: string) => fetch(url).then(r => r.json())

// const fetcher = async ({ url, body }: FetcherOptions) => {
// 	console.log(url)
//   const options: RequestInit = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };

//   if (body) {
//     options.method = 'POST';
//     options.body = JSON.stringify(body);
//   }

//   const response = await fetch(url, options);

//   if (!response.ok) {
//     const error = new Error('An error occurred while fetching the data.');
//     throw error;
//   }

//   return response.json();
// };

const SearchFeed = ({ translations }: { translations: Translations }) => {
  const [recipes, setRecipes] = useState<JSX.Element[]>()
  const [keyword, setKeyword] = useState<string>("test")
  const [isLoading, setLoading] = useState<boolean>(false)
  const [searchIsDone, setSearchIsDone] = useState<boolean>(false)

  const { data: recipe, error: recipeError } = useSWR(`${process.env.API_URL}/Recipes`, fetcher)
  const { data: searchResults, error: searchError } = useSWR(`${process.env.API_URL}/Recipes/search/${keyword}`, fetcher)

  const searchRef = createRef() as React.RefObject<HTMLInputElement>

	const findRecipesAndParse = (searchResultsData: dataFromApi, recipes: Recipe[]) => {
		if (!searchResultsData || !recipes) {
			setLoading(false);
			return;
		}

		console.log(searchResultsData)
	
		const recipeIdsSet = new Set<string>();
	
		searchResultsData.nameResults.forEach(({ id }) => {
			recipeIdsSet.add(id);
		});
	
		searchResultsData.tagsResults.forEach(({ id }) => {
			recipeIdsSet.add(id);
		});
	
		const filteredRecipes = recipes.filter(({ id }) =>
			recipeIdsSet.has(id)
		);
	
		const mappedRecipes = filteredRecipes.map((recipe, i) => (
			<SearchCard recipe={recipe} key={i} />
		));
	
		setRecipes(mappedRecipes);
		setSearchIsDone(true);
		setLoading(false);
	};

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()

    const form = document.getElementById('search__form') as HTMLFormElement
    const searchRefValidity = searchRef.current as HTMLInputElement

    const formData = new FormData(form)
    const searchterm = formData.getAll('search__term')[0] as string

    form.checkValidity()
		form.reportValidity()

    if (searchterm.length < 1) {
      searchRefValidity.setCustomValidity(translations.searchValid)
    } else {
      searchRefValidity.setCustomValidity('')
			setKeyword(searchterm)
    }


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
