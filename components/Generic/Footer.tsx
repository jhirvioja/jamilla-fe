import styles from './Footer.module.css'

import { useTranslation } from 'next-i18next'

const Footer = () => {
  // i18n
  const { t } = useTranslation('common')
  const footerText = t('footer.text')

  return (
    <div className="dark:bg-gray-900">
      <footer className={styles.footer}>
        © {new Date().getFullYear()} {footerText}
      </footer>
    </div>
  )
}

export default Footer
