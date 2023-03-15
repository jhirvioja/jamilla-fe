import React, { useState } from 'react'
import styles from './NavBar.module.css'

import { useRouter } from 'next/router'
import Link from 'next/link'

import { useTranslation } from 'next-i18next'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  // i18n
  const { t } = useTranslation('common')
  const browse = t('nav.linktitles.browse')
  const add = t('nav.linktitles.add')
  const search = t('nav.linktitles.search')
  const settings = t('nav.linktitles.settings')
  const info = t('nav.linktitles.info')

  const handleNavKeyPress = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Enter') {
      setIsOpen(!isOpen)
    }
  }

  const handleNavOnClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-blend-screen bg-bottom bg-no-repeat bg-green-700 h-min">
      <div className="container mx-auto">
        <div className="flex items-center justify-center flex-row">
          <span className={styles.jamillalogo}>JAMILLA</span>
          <div
            role="button"
            tabIndex={0}
            className={styles.icon}
            id="nav__button"
            onClick={handleNavOnClick}
            onKeyPress={handleNavKeyPress}
            aria-label="Avaa tai sulje navigaatio"
            aria-expanded={isOpen ? 'true' : 'false'}
          >
            <div className="space-y-2 opacity-85">
              <div className="w-8 h-0.5 bg-white"></div>
              <div className="w-8 h-0.5 bg-white"></div>
              <div className="w-8 h-0.5 bg-white"></div>
            </div>
          </div>
        </div>
        <div className={isOpen ? styles.nav : styles.navhidden} id="nav">
          <Link href="/browse" passHref>
            <a
              href="validaccessiblelinkhere"
              className={router.pathname == '/browse' ? styles.active : ''}
              aria-current={router.pathname == '/browse' ? 'page' : 'false'}
            >
              {browse}
            </a>
          </Link>
          <Link href="/add" passHref>
            <a
              href="validaccessiblelinkhere"
              className={router.pathname == '/add' ? styles.active : ''}
              aria-current={router.pathname == '/add' ? 'page' : 'false'}
            >
              {add}
            </a>
          </Link>
          <Link href="/search" passHref>
            <a
              href="validaccessiblelinkhere"
              className={router.pathname == '/search' ? styles.active : ''}
              aria-current={router.pathname == '/search' ? 'page' : 'false'}
            >
              {search}
            </a>
          </Link>
          <Link href="/settings" passHref>
            <a
              href="validaccessiblelinkhere"
              className={router.pathname == '/settings' ? styles.active : ''}
              aria-current={router.pathname == '/settings' ? 'page' : 'false'}
            >
              {settings}
            </a>
          </Link>
          <Link href="/info" passHref>
            <a
              href="validaccessiblelinkhere"
              className={router.pathname == '/info' ? styles.active : ''}
              aria-current={router.pathname == '/info' ? 'page' : 'false'}
            >
              {info}
            </a>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
