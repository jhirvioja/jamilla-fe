/* eslint-disable @typescript-eslint/no-unused-vars */
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useMediaQuery } from '../hooks/useMediaQuery'

function MyApp({ Component, pageProps }: AppProps) {
  //
  // Setting a dark theme, persisting user settings
  //
  const [settings, setSettings] = useLocalStorage('settings', {
    theme: 0,
    fontweight: 0,
    lineheight: 0,
    letterspacing: 0,
    lang: 0,
  })
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (settings.theme === 1 || (!('theme' in settings) && useMediaQuery('(prefers-color-scheme: dark)'))) {
      document.documentElement.classList.add('dark')
      setDarkMode(true)
    } else if (settings.theme === 2) {
      document.documentElement.classList.remove('dark')
      setDarkMode(false)
    }
  }, [settings.theme])

  useEffect(() => {
    if (settings.fontweight === 1) {
      document.documentElement.classList.add('font-semibold')
    } else if (settings.fontweight === 2) {
      document.documentElement.classList.add('font-bold')
    } else {
      document.documentElement.classList.remove('font-semibold', 'font-bold')
    }

    if (settings.lineheight === 1) {
      document.documentElement.classList.add('leading-relaxed')
    } else if (settings.lineheight === 2) {
      document.documentElement.classList.add('leading-10')
    } else {
      document.documentElement.classList.remove('leading-relaxed', 'leading-10')
    }

    if (settings.letterspacing === 1) {
      document.documentElement.classList.add('tracking-wider')
    } else if (settings.letterspacing === 2) {
      document.documentElement.classList.add('tracking-widest')
    } else {
      document.documentElement.classList.remove('tracking-wider', 'tracking-widest')
    }
  }, [settings.fontweight, settings.lineheight, settings.letterspacing])

  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default appWithTranslation(MyApp)
