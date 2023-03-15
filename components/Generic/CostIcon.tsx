import type { Translations } from '../../types/recipes'

type RecipeProps = {
  recipecost: number
  translations: Translations
}

const CostIcon = ({ recipecost, translations }: RecipeProps) => {
  if (recipecost === 1) {
    return (
      <>
        <p aria-hidden="true">€</p>
        <span className="sr-only">{translations.costIconCheap}</span>
      </>
    )
  } else if (recipecost === 2) {
    return (
      <>
        <p aria-hidden="true">€€</p>
        <span className="sr-only">{translations.costIconAvg}</span>
      </>
    )
  } else if (recipecost === 3) {
    return (
      <>
        <p aria-hidden="true">€€€</p>
        <span className="sr-only">{translations.costIconPricier}</span>
      </>
    )
  } else {
    return <p aria-hidden="true">N/A</p>
  }
}

export default CostIcon
