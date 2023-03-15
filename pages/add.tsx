import type { NextPage } from 'next'
import Head from 'next/head'

import NavBar from '../components/Generic/NavBar'
import Footer from '../components/Generic/Footer'
import { AddRecipe } from '../components/Add/AddRecipe'

import type { Translations } from '../types/recipes'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Add: NextPage = () => {
  // i18n
  const { t } = useTranslation('common')
  const pageTitle = t('nav.linktitles.add')
  const translations = t('recipe', { returnObjects: true }) as Translations

  return (
    <div>
      <Head>
        <title>{pageTitle} | Jamilla</title>
      </Head>
      <NavBar />
      <div className="container mx-auto">
        <div className="mainadd bg-zinc-100 dark:bg-zinc-900" role="main">
          <h1>{pageTitle}</h1>
          <hr></hr>
          <div className="dark:bg-zinc-800 p-4">
            <AddRecipe translations={translations} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Add

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'addrecipe'], null, ['fi', 'en'])),
      // Will be passed to the page component as props
    },
  }
}
