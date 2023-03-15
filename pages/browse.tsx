import type { NextPage } from 'next'
import Head from 'next/head'

import NavBar from '../components/Generic/NavBar'
import Footer from '../components/Generic/Footer'
import BrowseFeed from '../components/Browse/BrowseFeed'

import type { Translations } from '../types/recipes'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Browse: NextPage = () => {
  // i18n
  const { t } = useTranslation('common')
  const pageTitle = t('nav.linktitles.browse')

  const translations = t('browse', { returnObjects: true }) as Translations

  return (
    <div>
      <Head>
        <title>{pageTitle} | Jamilla</title>
      </Head>
      <NavBar />
      <div className="container mx-auto">
        <div className="main bg-zinc-100 dark:bg-zinc-900" role="main">
          <BrowseFeed translations={translations} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Browse

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], null, ['fi', 'en'])),
      // Will be passed to the page component as props
    },
  }
}
