import React, { useEffect, useState } from 'react'

import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import NavBar from '../../components/Generic/NavBar'
import Footer from '../../components/Generic/Footer'
import Browse404 from '../../components/Browse/Browse404'
import BrowseError from '../../components/Browse/BrowseError'
import BrowseLoading from '../../components/Browse/BrowseLoading'
import BrowseRecipe from '../../components/Browse/BrowseRecipe'
import BrowseRecipeSteps from '../../components/Browse/BrowseRecipeSteps'
import BrowseRecipeFinal from '../../components/Browse/BrowseRecipeFinal'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import type { Recipe, Translations } from '../../types/recipes'

const BrowseByRecipeId: NextPage = () => {
  const [recipe, setRecipe] = useState<Recipe>()
  const [error, setError] = useState<boolean>()

  const { t } = useTranslation('common')

  const pageTitle = t('nav.linktitles.browse')
  const browseOnePageTranslations = t('browseonepage', { returnObjects: true }) as Translations
  const browseOneStepsTranslations = t('browseonesteps', { returnObjects: true }) as Translations

  const router = useRouter()

  useEffect(() => {
    if (router.query.browseByRecipeId) {
      fetchRecipeById()
    }

    async function fetchRecipeById() {
      try {
        const response = await fetch(`${process.env.API_URL}/recipe/${router.query.browseByRecipeId}`)

        if (!response.ok) {
          console.error('Error: ', response.status, response.statusText)
          setError(true)
        }

        const recipe = await response.json()
        setRecipe(recipe)
      } catch (error) {
        console.error(error)
        setError(true)
      }
    }
  }, [])

  if (recipe === null) return <Browse404 translations={browseOnePageTranslations} />
  if (error) return <BrowseError translations={browseOnePageTranslations} />
  if (!recipe) return <BrowseLoading translations={browseOnePageTranslations} />
  if (router.query.part === 'fin') {
    return (
      <div>
        <Head>
          <title>
            {browseOneStepsTranslations.fin} | {recipe.name} | Jamilla
          </title>
        </Head>
        <NavBar />
        <div className="container mx-auto">
          <div className="main bg-zinc-100 dark:bg-zinc-900 dark:text-white" role="main">
            <div className="text-center pb-4">
              <h1>{recipe.name}</h1>
            </div>
            <BrowseRecipeFinal translations={browseOneStepsTranslations} recipe={recipe} part={router.query.part} />
          </div>
        </div>
        <Footer />
      </div>
    )
  } else if (router.query.part) {
    return (
      <div>
        <Head>
          <title>{recipe.name} | Jamilla</title>
        </Head>
        <NavBar />
        <div className="container mx-auto">
          <div className="main bg-zinc-100 dark:bg-zinc-900 dark:text-white" role="main">
            <div className="text-center pb-4">
              <h1>{recipe.name}</h1>
            </div>
            <BrowseRecipeSteps translations={browseOneStepsTranslations} recipe={recipe} part={router.query.part as string} />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
  return (
    <div>
      <Head>
        <title>{pageTitle} | Jamilla</title>
      </Head>
      <NavBar />
      <div className="container mx-auto">
        <div className="main bg-zinc-100 dark:bg-zinc-900 dark:text-white" role="main">
          <div className="text-center pb-4">
            <h1>{recipe.name}</h1>
          </div>
          <BrowseRecipe translations={browseOnePageTranslations} recipe={recipe} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default BrowseByRecipeId

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], null, ['fi', 'en'])),
      // Will be passed to the page component as props
    },
  }
}
