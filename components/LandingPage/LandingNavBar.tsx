import styles from './LandingPage.module.css'
import LandingSignUpSheet from './LandingSignUpSheet'

import Link from 'next/link'

const LandingNavBar = () => {
	return (
		<nav className="container mx-auto">
			<div className="bg-blend-screen bg-bottom bg-no-repeat bg-[url('https://i.imgur.com/CtYwNIN.webp')]">
				<div className="flex items-center flex-col md:justify-between md:flex-row">
					<div className="w-48"></div>
					<div>
						<span className={styles.jamillalogo}>JAMILLA</span>
					</div>
					<div>
						<Link href="/browse" role="button" tabIndex={0} passHref>
							<a href="validaccessiblelinkhere" className="primary">
								Kirjaudu sisään
							</a>
						</Link>
					</div>
				</div>
				<LandingSignUpSheet />
			</div>
		</nav>
	)
}

export default LandingNavBar
