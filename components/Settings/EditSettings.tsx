import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import SubmitFormButton from '../Generic/SubmitFormButton'
import Select from '../Generic/Select'
import { Translations } from '../../types/recipes'

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
		}
	}

	const figureOutLang = (props: string | number | undefined) => {
		switch (props) {
			case translations.finnishlang:
				return 0
			case translations.englishlang:
				return 1
			case 'fi':
				return 0
			case 'en':
				return 1
		}
	}

	const [formstate, setFormState] = useState({
		theme: 0,
		fontweight: 0,
		lineheight: 0,
		letterspacing: 0,
	})

	const [langstate, setLangState] = useState(figureOutLang(router.locale))

	useEffect(() => {
		if (window.localStorage.getItem('settings') !== null) {
			const settings = JSON.parse(window.localStorage.getItem('settings') as string)
			setFormState(settings)
		}
	}, [])

	const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault()

		try {
			localStorage.settings = JSON.stringify(formstate)
		} catch (error) {
			console.log(error)
			console.log('Could not save settings to localStorage')
		}

		if (langstate === 0) {
			document.cookie = 'NEXT_LOCALE=fi'
			router.push('/settings', '/settings', { locale: 'fi' }).then(() => window.location.reload())
		}

		if (langstate === 1) {
			document.cookie = 'NEXT_LOCALE=en'
			router.push('/settings', '/settings', { locale: 'en' }).then(() => window.location.reload())
		}
	}

	const handleSelectThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value
		const name = event.target.name

		setFormState({ ...formstate, [name]: figureOutTheme(value) })
	}

	const handleSelectWeightChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value
		const name = event.target.name

		setFormState({ ...formstate, [name]: figureOutWeight(value) })
	}

	const handleSelectHeightChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value
		const name = event.target.name

		setFormState({ ...formstate, [name]: figureOutHeight(value) })
	}

	const handleSelectSpacingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value
		const name = event.target.name

		setFormState({ ...formstate, [name]: figureOutSpacing(value) })
	}

	const handleSelectLangChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value

		setLangState(figureOutLang(value))
	}

	return (
		<div>
			<div className="m-4 dark:text-white">{translations.disclaimer}</div>
			<hr></hr>
			<form action="/browse">
				<div className="m-4">
					<Select
						label={translations.language}
						name="lang"
						required={true}
						options={[translations.finnishlang, translations.englishlang]}
						onChange={handleSelectLangChange}
						selectedItem={langstate}
					/>
				</div>
				<div className="m-4">
					<Select
						label={translations.theme}
						name="theme"
						required={true}
						options={[translations.os, translations.dark, translations.light]}
						onChange={handleSelectThemeChange}
						selectedItem={formstate.theme}
					/>
				</div>
				<div className="m-4">
					<Select
						label={translations.fontweight}
						name="fontweight"
						required={true}
						options={[translations.default, translations.semibold, translations.bold]}
						onChange={handleSelectWeightChange}
						selectedItem={formstate.fontweight}
					/>
				</div>
				<div className="m-4">
					<Select
						label={translations.lineheight}
						name="lineheight"
						required={true}
						options={[translations.default, translations.relaxed, translations.loose]}
						onChange={handleSelectHeightChange}
						selectedItem={formstate.lineheight}
					/>
				</div>
				<div className="m-4">
					<Select
						label={translations.letterspacing}
						name="letterspacing"
						required={true}
						options={[translations.default, translations.wider, translations.widest]}
						onChange={handleSelectSpacingChange}
						selectedItem={formstate.letterspacing}
					/>
				</div>
				<div className="mt-6 ml-4">
					<SubmitFormButton variant="primary" onClick={onSubmit}>
						{translations.save}
					</SubmitFormButton>
				</div>
			</form>
		</div>
	)
}

export default EditSettings
