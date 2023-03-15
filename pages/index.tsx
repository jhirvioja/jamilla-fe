import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../components/LandingPage/LandingPage.module.css'

import LandingNavBar from '../components/LandingPage/LandingNavBar'
import LandingBoxes from '../components/LandingPage/LandingBoxes'
import LandingFooter from '../components/LandingPage/LandingFooter'

const Home: NextPage = () => {
  return (
    <div className={styles.landingbackground}>
      <Head>
        <title>Jamilla</title>
      </Head>
      <LandingNavBar />
      <main className={styles.main}>
        <LandingBoxes />
      </main>
      <LandingFooter />
    </div>
  )
}

export default Home
