import Head from 'next/head'

import NavBar from '../NavBar'
import Footer from '../Footer'

import type { Translations } from '../../types/recipes'

type Props = {
  translations: Translations
}

const BrowseError = ({ translations }: Props) => {
  return (
    <div>
      <Head>
        <title>{translations.browserecipes} | Jamilla</title>
      </Head>
      <NavBar />
      <div className="container mx-auto">
        <div className="main dark:bg-zinc-900" role="main">
          <div className="text-black dark:text-white text-center" aria-live="polite">
            {translations.loadingrecipefailed}
            <span aria-hidden="true"> 😔</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default BrowseError
