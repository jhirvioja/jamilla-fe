import { useId } from 'react'

import Link from 'next/link'

type ButtonProps = {
  children?: string
  variant?: string
  url: string
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

// This is a component that should not be used with forms to submit
// For a form submit button, use SubmitFormButton

const Button = ({ children, variant, url, onClick }: ButtonProps) => {
  const uniqueId = useId()

  switch (variant) {
    case 'primary':
      return (
        <Link href={url} passHref>
          <a
            role="button"
            href={url}
            id={'Button_' + uniqueId}
            className="border inline-block border-green-700 hover:border-black bg-green-700 hover:bg-black p-4 pt-2 pb-2 m-1 text-white dark:hover:text-black dark:border dark:hover:border-white dark:hover:bg-white"
            onClick={onClick}
          >
            {children}
          </a>
        </Link>
      )
    case 'secondary':
      return (
        <Link href={url} passHref>
          <a
            role="button"
            href={url}
            id={'Button_' + uniqueId}
            className="border inline-block hover:bg-black border-black hover:text-white p-4 pt-2 pb-2 m-1 text-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
            onClick={onClick}
          >
            {children}
          </a>
        </Link>
      )
    case 'disabled':
      return (
        <button
          type="button"
          id={'Button_' + uniqueId}
          className="border inline-bock border-zinc-600 text-zinc-600 hover:text-zinc-300 hover:border-zinc-300 dark:border-zinc-400 p-4 pt-2 pb-2 m-1 text-black dark:text-zinc-400"
          aria-disabled="true"
        >
          {children}
        </button>
      )
    case 'destructive':
      return (
        <Link href={url} passHref>
          <a
            role="button"
            href={url}
            id={'Button_' + uniqueId}
            className="border inline-block border-red-700 text-red-700 hover:bg-red-700 hover:text-white dark:border-rose-400 p-4 pt-2 pb-2 m-1 text-black dark:text-rose-400 dark:hover:bg-rose-400 dark:hover:text-black"
            onClick={onClick}
          >
            {children}
          </a>
        </Link>
      )
    default:
      return (
        <Link href={url} passHref>
          <a
            role="button"
            href={url}
            id={'Button_' + uniqueId}
            className="inline-block p-4 pt-2 pb-2 m-1 text-black dark:text-white"
            onClick={onClick}
          >
            {children}
          </a>
        </Link>
      )
  }
}

export default Button
