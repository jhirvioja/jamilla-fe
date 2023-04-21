import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import SubmitFormButton from '../SubmitFormButton'
import Select from '../Select'
import { Translations } from '../../types/recipes'
import { deleteCookie } from '../../utils/cookieUtils'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import Spinner from '../Spinner'

type Settings = {
	theme: string | number
	fontweight: string | number
	lineheight: string | number
	letterspacing: string | number
	lang: string | number
}

const EditSettings = ({ translations }: { translations: Translations }) => {
  const router = useRouter()

  const figureOutTheme = (props: string | number) => {
    switch (props) {
      case translations.os:
        return 0
      case translations.dark:
        return 1
      case translations.light:
        return 2
      case 0:
        return translations.os
      case 1:
        return translations.dark
      case 2:
        return translations.light
    }
  }

  const figureOutWeight = (props: string | number) => {
    switch (props) {
      case translations.default:
        return 0
      case translations.semibold:
        return 1
      case translations.bold:
        return 2
      case 0:
        return translations.default
      case 1:
        return translations.semibold
      case 2:
        return translations.bold
    }
  }

  const figureOutHeight = (props: string | number) => {
    switch (props) {
      case translations.default:
        return 0
      case translations.relaxed:
        return 1
      case translations.loose:
        return 2
      case 0:
        return translations.default
      case 1:
        return translations.relaxed
      case 2:
        return translations.loose
    }
  }

  const figureOutSpacing = (props: string | number) => {
    switch (props) {
      case translations.default:
        return 0
      case translations.wider:
        return 1
      case translations.widest:
        return 2
      case 0:
        return translations.default
      case 1:
        return translations.wider
      case 2:
        return translations.widest
    }
  }

  const figureOutLang = (props: string | number) => {
    if (props) {
      switch (props) {
        case translations.finnishlang:
          return 0
        case translations.englishlang:
          return 1
        case 'fi':
          return 0
        case 'en':
          return 1
        case 0:
          return translations.finnishlang
        case 1:
          return translations.englishlang
      }
    }
    return 0
  }

  const [settings, setSettings] = useLocalStorage<Settings>('settings', {
    theme: 'init',
    fontweight: 'init',
    lineheight: 'init',
    letterspacing: 'init',
    lang: 0,
  })

  const [loading, setLoading] = useState(true)

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()

    if (settings.lang === 0) {
      deleteCookie('NEXT_LOCALE', '/', process.env.APP_URL)
      deleteCookie('NEXT_LOCALE', '/en', process.env.APP_URL)
      document.cookie = 'NEXT_LOCALE=fi'
      router.push('/settings', '/settings', { locale: 'fi' }).then(() => window.location.reload())
    }

    if (settings.lang === 1) {
      deleteCookie('NEXT_LOCALE', '/', process.env.APP_URL)
      deleteCookie('NEXT_LOCALE', '/en', process.env.APP_URL)
      document.cookie = 'NEXT_LOCALE=en'
      router.push('/settings', '/settings', { locale: 'en' }).then(() => window.location.reload())
    }
  }

  const handleSelectThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    const name = event.target.name

    setSettings({ ...settings, [name]: figureOutTheme(value) })
  }

  const handleSelectWeightChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    const name = event.target.name

    setSettings({ ...settings, [name]: figureOutWeight(value) })
  }

  const handleSelectHeightChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    const name = event.target.name

    setSettings({ ...settings, [name]: figureOutHeight(value) })
  }

  const handleSelectSpacingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    const name = event.target.name

    setSettings({ ...settings, [name]: figureOutSpacing(value) })
  }

  const handleSelectLangChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    const name = event.target.name

    setSettings({ ...settings, [name]: figureOutLang(value) })
  }

	useEffect(() => {
		if (settings.theme === 'init') {
			setSettings(
				{
					theme: 0,
					fontweight: 0,
					lineheight: 0,
					letterspacing: 0,
					lang: 0,
				}
			)
		}

  }, [])
	
  useEffect(() => {
    if (
      settings.theme !== 'init' &&
      settings.fontweight !== 'init' &&
      settings.lineheight !== 'init' &&
      settings.letterspacing !== 'init'
    ) {
      setLoading(false)
    }
  }, [settings])

  return (
    <div>
      <div className="m-4 dark:text-white">{translations.disclaimer}</div>
      <hr></hr>
      {loading ? (
        <div className="flex justify-center">
					<div className="mt-8"><Spinner></Spinner></div>
				</div>
      ) : (
        <form action="/browse">
          <div className="m-4">
            <Select
              label={translations.language}
              name="lang"
              required={true}
              options={[translations.finnishlang, translations.englishlang]}
              onChange={handleSelectLangChange}
              value={figureOutLang(settings.lang)}
            />
          </div>
          <div className="m-4">
            <Select
              label={translations.theme}
              name="theme"
              required={true}
              options={[translations.os, translations.dark, translations.light]}
              onChange={handleSelectThemeChange}
              value={figureOutTheme(settings.theme)}
            />
          </div>
          <div className="m-4">
            <Select
              label={translations.fontweight}
              name="fontweight"
              required={true}
              options={[translations.default, translations.semibold, translations.bold]}
              onChange={handleSelectWeightChange}
              value={figureOutWeight(settings.fontweight)}
            />
          </div>
          <div className="m-4">
            <Select
              label={translations.lineheight}
              name="lineheight"
              required={true}
              options={[translations.default, translations.relaxed, translations.loose]}
              onChange={handleSelectHeightChange}
              value={figureOutHeight(settings.lineheight)}
            />
          </div>
          <div className="m-4">
            <Select
              label={translations.letterspacing}
              name="letterspacing"
              required={true}
              options={[translations.default, translations.wider, translations.widest]}
              onChange={handleSelectSpacingChange}
              value={figureOutSpacing(settings.letterspacing)}
            />
          </div>
          <div className="mt-6 ml-4">
            <SubmitFormButton variant="primary" onClick={onSubmit}>
              {translations.save}
            </SubmitFormButton>
          </div>
        </form>
      )}
    </div>
  )
}

export default EditSettings
