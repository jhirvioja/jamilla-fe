type SubmitFormButtonProps = {
  children?: string
  variant?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

// This is a component that should be used only with forms
// For normal buttons, use Button

const SubmitButton = ({ children, variant, onClick }: SubmitFormButtonProps) => {
  switch (variant) {
    case 'primary':
      return (
        <button
          onClick={onClick}
          className="border border-green-700 hover:border-black bg-green-700 hover:bg-black p-4 pt-2 pb-2 text-white dark:hover:text-black dark:border dark:hover:border-white dark:hover:bg-white"
        >
          {children}
        </button>
      )
    case 'secondary':
      return (
        <button
          onClick={onClick}
          className="border hover:bg-black border-black hover:text-white p-4 pt-2 pb-2 text-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
        >
          {children}
        </button>
      )
    case 'disabled':
      return (
        <button
          onClick={onClick}
          className="border border-zinc-600 text-zinc-600 hover:text-zinc-300 hover:border-zinc-300 dark:border-zinc-400 p-4 pt-2 pb-2 text-black dark:text-zinc-400"
          aria-disabled="true"
        >
          {children}
        </button>
      )
    case 'destructive':
      return (
        <button
          onClick={onClick}
          className="border border-red-700 text-red-700 hover:bg-red-700 hover:text-white dark:border-rose-400 p-4 pt-2 pb-2 text-black dark:text-rose-400 dark:hover:bg-rose-400 dark:hover:text-black"
        >
          {children}
        </button>
      )
    default:
      return (
        <button onClick={onClick} className="p-4 pt-2 pb-2 m-1 text-black dark:text-white">
          {children}
        </button>
      )
  }
}

export default SubmitButton
