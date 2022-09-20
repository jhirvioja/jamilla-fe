type VisuallyHiddenProps = {
	children: string | JSX.Element | JSX.Element[]
}

// This is a component that is visually hidden from the user
// It is useful when giving further instructions to screen readers

const VisuallyHidden = ({ children }: VisuallyHiddenProps) => {
	return <span className="sr-only">{children}</span>
}

export default VisuallyHidden
