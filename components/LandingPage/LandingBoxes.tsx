import styles from './LandingPage.module.css'

const LandingBoxes = () => {
	return (
		<div className={styles.grid}>
			<a href="https://www.google.com/" className={styles.card}>
				<h2 className="dark:text-zinc-700">Hinnoittelu</h2>
				<p className="dark:text-zinc-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
			</a>

			<a href="https://www.google.com/" className={styles.card}>
				<h2 className="dark:text-zinc-700">Demo</h2>
				<p className="dark:text-zinc-700">Cras congue ipsum sit amet elit luctus suscipit.</p>
			</a>

			<a href="https://www.google.com/" className={styles.card}>
				<h2 className="dark:text-zinc-700">Dokumentaatio</h2>
				<p className="dark:text-zinc-700">Suspendisse id velit nisi. Integer ultricies velit in placerat molestie.</p>
			</a>

			<a href="https://www.google.com/" className={styles.card}>
				<h2 className="dark:text-zinc-700">Reseptit</h2>
				<p className="dark:text-zinc-700">Donec aliquet luctus mauris id dapibus. Curabitur eros nunc.</p>
			</a>
		</div>
	)
}

export default LandingBoxes
