import React, { useEffect, useState } from 'react'

import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { EditRecipe } from '../../components/Edit/EditRecipe'
import Browse404 from '../../components/Browse/Browse404'
import BrowseError from '../../components/Browse/BrowseError'
import BrowseLoading from '../../components/Browse/BrowseLoading'
import NavBar from '../../components/Generic/NavBar'
import Footer from '../../components/Generic/Footer'

import type { Recipe, Translations } from '../../types/recipes'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Edit: NextPage = () => {
  const [recipe, setRecipe] = useState<Recipe>()
  const [error, setError] = useState<boolean>()

  // i18n
  const { t } = useTranslation('common')
  const translations = t('recipe', { returnObjects: true }) as Translations
  const browseOnePageTranslations = t('browseonepage', { returnObjects: true }) as Translations
  const router = useRouter()

  useEffect(() => {
    // This could use localStorage copy, works like this for now though
    if (router.query.editByRecipeId) {
      fetchRecipeById()
    }

    async function fetchRecipeById() {
      try {
        const response = await fetch(`${process.env.API_URL}/recipe/${router.query.editByRecipeId}`)

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
  return (
    <div>
      <Head>
        <title>
          {translations.editrecipe} {recipe.name} | Jamilla
        </title>
      </Head>
      <NavBar />
      <div className="container mx-auto">
        <div className="mainadd bg-zinc-100 dark:bg-zinc-900" role="main">
          <h1>
            {translations.editrecipe} {recipe.name}
          </h1>
          <div className="dark:bg-zinc-800 p-4">
            <EditRecipe translations={translations} recipe={recipe} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Edit

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], null, ['fi', 'en'])),
      // Will be passed to the page component as props
    },
  }
}
