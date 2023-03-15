import { useId } from 'react'

import { Translations } from './../../types/recipes'

import VisuallyHidden from './../Generic/VisuallyHidden'

type StepTextAreaProps = {
  label: string
  required: boolean
  maxchar: number
  placeholder: string
  name: string
  forwardedRef?: React.RefObject<HTMLTextAreaElement>
  onChange?: React.ChangeEventHandler
  translations: Translations
  value?: string
  wordcount?: number
}

const EditStepTextArea = ({
  label,
  required,
  maxchar,
  placeholder,
  name,
  forwardedRef,
  onChange,
  translations,
  value,
  wordcount,
}: StepTextAreaProps) => {
  const uniqueId = useId()

  if (required) {
    return (
      <>
        <label htmlFor={'TextArea_' + uniqueId} className="block font-medium mb-2 mt-2 dark:text-white after:content-['_*']">
          {label}
        </label>
        <VisuallyHidden>
          <>
            {translations.srTextAreaInstructions1} {maxchar} {translations.srTextAreaInstructions2}
          </>
        </VisuallyHidden>
        <textarea
          value={value}
          ref={forwardedRef}
          id={'TextArea_' + uniqueId}
          maxLength={maxchar}
          rows={4}
          className="block pl-3 pt-2 pb-2 mb-2 mt-2 min-w-full placeholder-gray-700 placeholder:italic dark:bg-black dark:text-white dark:placeholder-gray-200"
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          required
        ></textarea>
        <div>
          <p className="mb-4 text-right">
            {wordcount} / {maxchar} {translations.textareacounter}
          </p>
        </div>
      </>
    )
  }
  return (
    <>
      <label htmlFor={'TextArea_' + uniqueId} className="block font-medium mb-2 mt-2 dark:text-white">
        {label}
      </label>
      <VisuallyHidden>
        <>
          {translations.srTextAreaInstructions1} {maxchar} {translations.srTextAreaInstructions2}
        </>
      </VisuallyHidden>
      <textarea
        value={value}
        ref={forwardedRef}
        id={'TextArea_' + uniqueId}
        maxLength={maxchar}
        rows={4}
        className="block pl-3 pt-2 pb-2 mb-2 mt-2 min-w-full placeholder-gray-700 placeholder:italic dark:bg-black dark:text-white dark:placeholder-gray-200"
        placeholder={placeholder}
        onChange={onChange}
      ></textarea>
      <div>
        <p className="mb-4 text-right">
          {wordcount} / {maxchar} {translations.textareacounter}
        </p>
      </div>
    </>
  )
}

export default EditStepTextArea
