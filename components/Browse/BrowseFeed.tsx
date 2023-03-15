import React, { useEffect, useState } from 'react'

import BrowseCard from './BrowseCard'
import Button from '../Button'

import type { Recipe, Translations } from '../../types/recipes'

const BrowseFeed = ({ translations }: { translations: Translations }) => {
  const [data, setData] = useState<Array<Recipe>>([])
  const [pages, setPages] = useState(0)
  const [error, setError] = useState<boolean>()
  const [areThereAnyMoreRecipes, setPossibleToFetchRecipes] = useState(true)
  const [loadingMoreDone, setLoadingMoreDone] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    fetchRecipes()

    async function fetchRecipes() {
      try {
        const response = await fetch(`${process.env.API_URL}/recipes/${pages}`)

        if (!response.ok) {
          setError(true)
          console.error(error)
        }

        const data = await response.json()

        setData(data)
        setLoading(false)
      } catch (error) {
        setError(true)
        console.error(error)
      }
    }
  }, [])

  const onLoadMoreClick = () => {
    setLoadingMoreDone(false)
    fetchMoreRecipes()

    async function fetchMoreRecipes() {
      try {
        const response = await fetch(`${process.env.API_URL}/recipes/${pages + 1}`)

        if (!response.ok) {
          setError(true)
          console.error(error)
        }

        const newData = await response.json()

        if (newData.length === 0) {
          setPossibleToFetchRecipes(false)
        } else {
          for (let i = 0; i < newData.length; i++) {
            setData((current) => [...current, newData[i]])
          }
          setLoadingMoreDone(true)
          setPages((current) => current + 1)
        }
      } catch (error) {
        setError(true)
        console.error(error)
      }
    }
  }

  return (
    <>
      <div className="flex flex-row flex-wrap justify-center gap-4 items-baseline">
        {error ? (
          <div className="container mx-auto text-center" role="alert">
            <p>
              {translations.recipeLoadingFailed}
              <span aria-hidden="true"> 😔</span>
            </p>
          </div>
        ) : (
          ''
        )}
        {loading && !error ? (
          <div className="animate-pulse dark:text-white">
            {translations.loadingRecipes}
            <span aria-hidden="true">.. 🤞</span>
          </div>
        ) : (
          data.map((recipe: Recipe, i: number) => <BrowseCard recipe={recipe} key={i} translations={translations} />)
        )}
      </div>
      <div className="text-center mt-8">
        {areThereAnyMoreRecipes && !error ? (
          <Button url="/browse" variant="primary" onClick={onLoadMoreClick}>
            {translations.loadMore}
          </Button>
        ) : (
          <span aria-hidden="true">
            <Button url="/browse" variant="disabled">
              {translations.noMoreRecipes}
            </Button>
          </span>
        )}
      </div>
      <div>
        {areThereAnyMoreRecipes ? (
          ''
        ) : (
          <>
            <div role="alert">
              <span className="sr-only">{translations.noMoreRecipes}</span>
            </div>
          </>
        )}
      </div>
      {loadingMoreDone ? (
        <>
          <div role="alert">
            <span className="sr-only">{translations.moreRecipesLoaded}</span>
          </div>
        </>
      ) : (
        ''
      )}
    </>
  )
}

export default BrowseFeed
