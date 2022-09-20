import type { NextPage } from 'next'
import Head from 'next/head'

import NavBar from '../components/Generic/NavBar'
import Footer from '../components/Generic/Footer'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Info: NextPage = () => {
	const { t } = useTranslation('common')
	const pageTitle = t('nav.linktitles.info')

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
						<p>This recipe book app was made within the timespan of 6th of June 2022 – 20th of September 2022 during weekdays as a learning project - so probably in less than 70 days if one takes away vacation and sick leave due to Covid-19, which both amount to a total of two weeks.</p>
						<br></br>
						<p>The motivation behind the whole project was the lousy usability of recipes around internet. Most recipes are featured inside a blog or an article which users cannot access easily, or there is a considerable amount of cognitive stress they have to expose themselves to before they can actually start the cooking process. I personally have a hard time navigating up and down most recipes with my phone or with a tablet when there are a lot of paragraphs, unrelated text and/or ads.</p>
						<br></br>
						<p>I did not have a mentor or a senior to guide me through and everything was made with trial-and-error, reading a fair amount of documentation and tutorials. As such, the code and the app is a product of its time - my first year of coding - and may include anti-patterns, smells of refactoring and spaghetti code.</p>
						<br></br>
						<p>The aim of this project was to understand more about React, Next.js, TypeScript, Tailwind CSS, accessibility, end-to-end testing and anything / everything between. As such, I deem it succesful and I enjoyed learning a bunch of new stuff.</p>
						<br></br>
						<p className="pb-2">Feats which were planned but not implemented due to time constraints:</p>
						<ul className="list-disc">
							<li>Do a put update instead of post + delete when editing a recipe. I know, I know.. it was a backend thing and I did not have time to learn C# and .NET as much as I would have liked to have</li>
							<li>In general, the backend could have been better and more robust</li> 
							<li>Dashboard, which features statistics, widgets which show recipe suggestions from somewhere, recipe articles</li>
							<li>Calendar, which allows user to drag and drop recipes in to it</li>
							<li>Component, which allows user to copypaste an url which the component then scrapes of information (ingredients, steps) for recipe adding purposes</li>
							<li>One to five star review of every recipe</li>
							<li>Doubling and tripling of ingredients on the fly - one portion, two portions, etc.</li> 
							<li>A preference of a store or stores per ingredient - not all stores stock all ingredients always</li>
							<li>A simple dividing element to the ingredient list if the recipe features multiple parts which are not made in unison </li>
							<li>Ability to register, log in and have multiple family members under one profile, each with their own settings and reviews</li>
							<li>More accessibility testing, testing with real people</li>
							<li>Code could have been tighter overall, more error checking and logging</li>
							<li>Sharing of recipes</li>
							<li>Make the whole app a Progressive Web App</li>
							<li>Ability to log in how long it took to make a recipe, and then make the average of different times the default time</li>
							<li>A better component library of reusable components</li>
							<li>This text in Finnish</li>
							<li>Etc., probably forgot something from this list :)</li>
						</ul>
						<br></br>
						<p>If you made it this far, thank you for your interest in my app! If you want to contribute to this app, you can do so by opening an issue or doing a pull request.</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Info

export async function getStaticProps({ locale }: { locale: string }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'], null, ['fi', 'en'])),
			// Will be passed to the page component as props
		},
	}
}
