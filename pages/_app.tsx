import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
	//
	// Setting a dark theme, persisting user settings
	//
	const [darkMode, setDarkMode] = useState(false)

	useEffect(() => {
		settingsCheck()
	}, [darkMode])

	useEffect(() => {
		settingsCheck()
	}, [])

	const settingsCheck = () => {
		if (window.localStorage.getItem('settings') === null) {
			const settings = {
				theme: 0,
				fontweight: 0,
				lineheight: 0,
				letterspacing: 0,
			}
			localStorage.settings = JSON.stringify(settings)
		} else {
			const settings = JSON.parse(window.localStorage.getItem('settings') as string)

			if (
				settings.theme === 1 ||
				(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
			) {
				document.documentElement.classList.add('dark')
				setDarkMode(true)
			}
			if (settings.theme === 2) {
				document.documentElement.classList.remove('dark')
				setDarkMode(false)
			}
			if (settings.fontweight === 1) {
				document.documentElement.classList.add('font-semibold')
			}
			if (settings.fontweight === 2) {
				document.documentElement.classList.add('font-bold')
			}
			if (settings.lineheight === 1) {
				document.documentElement.classList.add('leading-relaxed')
			}
			if (settings.lineheight === 2) {
				document.documentElement.classList.add('leading-10')
			}
			if (settings.letterspacing === 1) {
				document.documentElement.classList.add('tracking-wider')
			}
			if (settings.letterspacing === 2) {
				document.documentElement.classList.add('tracking-widest')
			}
		}
	}

	return (
		<>
			<Component {...pageProps} />
		</>
	)
}

export default appWithTranslation(MyApp)
