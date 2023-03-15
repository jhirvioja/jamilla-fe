import { useId } from 'react'

import type { Translations } from '../../types/recipes'

import Input from '../Input'
import Button from '../Button'

type IngredientProps = {
  variant?: string
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onChange?: React.ChangeEventHandler
  translations: Translations
  value?: string
  unit?: string
  name?: string
}

const IngredientInput = ({ variant, onClick, onChange, translations, value, unit, name }: IngredientProps) => {
  const uniqueId = useId()

  if (variant == 'disabled') {
    return (
      <div className="flex flex-col ml-2 mr-2 lg:flex-row lg:items-end" aria-live="polite">
        <div className="basis-1/6 m-2">
          <Input
            type="text"
            label={translations.amountof}
            name={'Value_' + uniqueId}
            required={true}
            value={value}
            onChange={onChange}
          ></Input>
        </div>
        <div className="basis-1/6 m-2">
          <Input
            type="text"
            label={translations.unitof}
            name={'Unit_' + uniqueId}
            required={false}
            value={unit}
            onChange={onChange}
          ></Input>
        </div>
        <div className="basis-4/6 m-2">
          <Input
            type="text"
            label={translations.ingredient}
            name={'Name_' + uniqueId}
            required={true}
            value={name}
            onChange={onChange}
          ></Input>
        </div>
        <div className="basis-2/6 mb-3 text-right"></div>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col ml-2 mr-2 lg:flex-row lg:items-end" aria-live="polite">
        <div className="basis-1/6 m-2">
          <Input
            type="text"
            label={translations.amountof}
            name={'Value_' + uniqueId}
            required={true}
            value={value}
            onChange={onChange}
          ></Input>
        </div>
        <div className="basis-1/6 m-2">
          <Input
            type="text"
            label={translations.unitof}
            name={'Unit_' + uniqueId}
            required={false}
            value={unit}
            onChange={onChange}
          ></Input>
        </div>
        <div className="basis-4/6 m-2">
          <Input
            type="text"
            label={translations.ingredient}
            name={'Name_' + uniqueId}
            required={true}
            value={name}
            onChange={onChange}
          ></Input>
        </div>
        <div className="basis-2/6 mb-3 text-right">
          <Button url="#ainesosat" variant="destructive" onClick={onClick}>
            {translations.deleteingredient}
          </Button>
        </div>
      </div>
    )
  }
}

export default IngredientInput
