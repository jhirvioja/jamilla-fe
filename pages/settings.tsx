import type { NextPage } from 'next'
import Head from 'next/head'

import NavBar from '../components/Generic/NavBar'
import Footer from '../components/Generic/Footer'
import EditSettings from '../components/Settings/EditSettings'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Translations } from '../types/recipes'

const Settings: NextPage = () => {
  const { t } = useTranslation('common')
  const pageTitle = t('nav.linktitles.settings')
  const settingsTranslations = t('settings', { returnObjects: true }) as Translations

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
            <EditSettings translations={settingsTranslations} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Settings

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], null, ['fi', 'en'])),
      // Will be passed to the page component as props
    },
  }
}
