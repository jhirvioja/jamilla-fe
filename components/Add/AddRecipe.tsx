import React, { useState, createRef } from 'react'

import type { Translations } from '../../types/recipes'

import AmountOfRecipes from '../AmountOfRecipes'
import Input from '../Input'
import Button from '../Button'
import SubmitFormButton from '../SubmitFormButton'
import TextArea from '../TextArea'
import EditStepTextArea from '../Edit/EditStepTextArea'
import Spinner from '../Spinner'
import Select from '../Select'

export const AddRecipe = ({ translations }: { translations: Translations }) => {
  //
  // Screen reader helpers
  //

  const InformSrOfLoading = () => {
    return (
      <div role="alert">
        <span className="sr-only">{translations.srAddingRecipe}</span>
      </div>
    )
  }

  const InformSrOfDone = () => {
    return (
      <div role="alert">
        <span className="sr-only">{translations.srRecipeAdded}</span>
      </div>
    )
  }

  //
  // Init configuration & helper function for the state
  //

  const figureOutCost = (props: string | number) => {
    const priceMap = {
      1: 1,
      2: 2,
      3: 3,
      [translations.priceselect1]: 1,
      [translations.priceselect2]: 2,
      [translations.priceselect3]: 3,
    }

    return priceMap[props]
  }

  const EmptyIngredientsObj = {
    name: '',
    amountvalue: '',
    amountunit: '',
    stock: false as boolean,
  }

  const EmptyStepsObj = {
    part: 0,
    description: '',
    steplast: false as boolean,
  }

  //
  // State handling starts here
  //

  const [loading, setLoading] = useState<string>()
  const [formstate, setFormState] = useState({
    userid: '4f959a9c-b9d1-406b-b1ad-886c550066bf',
    name: '',
    description: '',
    prepTime: '30min',
    cost: 1,
    imgSrc: '',
    tags: '',
    recipeIngredients: [EmptyIngredientsObj],
    steps: [EmptyStepsObj],
  })

  //
  // Handling onChanges here
  //

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const name = event.target.name

    setFormState({ ...formstate, [name]: value })
  }

  const handleInputChangeTags = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setFormState({ ...formstate, tags: value })
  }

  const handleIngredientNameChange = (i: number, event: React.ChangeEvent<Element>) => {
    const value = (event.target as HTMLInputElement).value

    const updObj = {
      name: value,
      stock: false,
      amountunit: formstate.recipeIngredients[i].amountunit,
      amountvalue: formstate.recipeIngredients[i].amountvalue,
    }

    const recipeIngredients = formstate.recipeIngredients.map((item, i2) => (i2 === i ? (item = updObj) : item))

    setFormState({ ...formstate, recipeIngredients })
  }

  const handleIngredientUnitChange = (i: number, event: React.ChangeEvent<Element>) => {
    const value = (event.target as HTMLInputElement).value

    const updObj = {
      name: formstate.recipeIngredients[i].name,
      stock: false,
      amountunit: value,
      amountvalue: formstate.recipeIngredients[i].amountvalue,
    }

    const recipeIngredients = formstate.recipeIngredients.map((item, i2) => (i2 === i ? (item = updObj) : item))

    setFormState({ ...formstate, recipeIngredients })
  }

  const handleIngredientValueChange = (i: number, event: React.ChangeEvent<Element>) => {
    const value = (event.target as HTMLInputElement).value

    const updObj = {
      name: formstate.recipeIngredients[i].name,
      stock: false,
      amountunit: formstate.recipeIngredients[i].amountunit,
      amountvalue: value,
    }

    const recipeIngredients = formstate.recipeIngredients.map((item, i2) => (i2 === i ? (item = updObj) : item))

    setFormState({ ...formstate, recipeIngredients })
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    const name = event.target.name

    setFormState({ ...formstate, [name]: figureOutCost(value) })
  }

  const handleStepTextAreaChange = (i: number, event: React.ChangeEvent<Element>) => {
    const value = (event.target as HTMLInputElement).value

    const updObj = {
      part: formstate.steps[i].part,
      description: value,
      steplast: formstate.steps[i].steplast,
    }

    const steps = formstate.steps.map((item, i2) => (i2 === i ? (item = updObj) : item))

    setFormState({ ...formstate, steps })
  }

  //
  // onClicks are here
  //

  const deleteIngredient = (i: number) => {
    const currentRecipe = formstate.recipeIngredients
    const recipeIngredients = currentRecipe.filter((ingredient, filterIterator) => {
      return filterIterator !== i
    })
    setFormState({ ...formstate, recipeIngredients })
  }

  const deleteStep = (i: number) => {
    const steps = formstate.steps.filter((ingredient, filterIterator) => {
      return filterIterator !== i
    })

    setFormState({ ...formstate, steps })
  }

  const onAddIngredientButtonClick = () => {
    const newObj = {
      name: '',
      stock: false,
      amountunit: '',
      amountvalue: '',
    }

    formstate.recipeIngredients.push(newObj)

    // At the end change the location to the right header
    // So that speech reader catches up on the right spot focus wise

    window.document.location.href = '#ingredients'
  }

  const onAddStepButtonClick = () => {
    const i = formstate.steps.length - 1

    const newObj = {
      part: i,
      description: '',
      steplast: true,
    }

    formstate.steps.push(newObj)

    // const updObj = {
    //   part: formstate.steps[i].part,
    //   description: formstate.steps[i].description,
    //   steplast: false,
    // }

    // const steps = formstate.steps.map((item, mapsIterator) => (mapsIterator === i ? (item = newObj) : item))

    // setFormState({ ...formstate, steps })

    // At the end change the location to the right header
    // So that speech reader catches up on the right spot focus wise

    window.document.location.href = '#recipesteps'
  }

  const onEmptyButtonClick = () => {
    if (confirm(translations.emptyquestion)) {
      setFormState({
        userid: '4f959a9c-b9d1-406b-b1ad-886c550066bf',
        name: '',
        description: '',
        prepTime: '30min',
        cost: formstate.cost,
        imgSrc: '',
        tags: '',
        recipeIngredients: [EmptyIngredientsObj],
        steps: [EmptyStepsObj],
      })
    }
  }

  //
  // Creating refs for form validation
  //

  const nameRef = createRef() as React.RefObject<HTMLInputElement>
  const priceRef = createRef() as React.RefObject<HTMLSelectElement>
  const imgRef = createRef() as React.RefObject<HTMLInputElement>
  const tagsRef = createRef() as React.RefObject<HTMLInputElement>
  const descRef = createRef() as React.RefObject<HTMLTextAreaElement>

  //
  // Lastly, error checking & submitting
  //

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()

    const nameRefValidity = nameRef.current as HTMLInputElement
    const priceRefValidity = priceRef.current as HTMLSelectElement
    const imgRefValidity = imgRef.current as HTMLInputElement
    const tagsRefValidity = tagsRef.current as HTMLInputElement
    const descRefValidity = descRef.current as HTMLTextAreaElement
    const formBasics = document.getElementById('recipeFormBasics') as HTMLFormElement
    const formIngredients = document.getElementById('recipeFormIngredients') as HTMLFormElement
    const formSteps = document.getElementById('recipeFormSteps') as HTMLFormElement

    // These have to be in the opposite order for the validation to work in order
    // Here one could probably use a custom hook like useFormHandling to achieve the same result

    formSteps.checkValidity()
    formIngredients.checkValidity()
    formBasics.checkValidity()

    if (formstate.description.length < 1) {
      descRefValidity.setCustomValidity(translations.descValid)
    } else {
      descRefValidity.setCustomValidity('')
    }

    if (formstate.tags.length < 1) {
      tagsRefValidity.setCustomValidity(translations.hashValid)
    } else {
      tagsRefValidity.setCustomValidity('')
    }

    if (formstate.cost === undefined) {
      priceRefValidity.setCustomValidity(translations.priceValid)
    } else {
      priceRefValidity.setCustomValidity('')
    }

    if (formstate.name.length < 1) {
      nameRefValidity.setCustomValidity(translations.nameValid)
    } else {
      nameRefValidity.setCustomValidity('')
    }

    formSteps.reportValidity()
    formIngredients.reportValidity()
    descRefValidity.reportValidity()
    tagsRefValidity.reportValidity()
    imgRefValidity.reportValidity()
    priceRefValidity.reportValidity()
    nameRefValidity.reportValidity()

    // Post a recipe

    postRecipe()

    async function postRecipe() {
      if (!formSteps.checkValidity() || !formIngredients.checkValidity() || !formBasics.checkValidity()) {
        setLoading('usererror')
      }
      if (formSteps.checkValidity() && formIngredients.checkValidity() && formBasics.checkValidity()) {
        setLoading('loading')
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Recipes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formstate),
          })

          if (!response.ok) {
            console.error('Error:', response.status, response.statusText)
            setLoading('error')
          }

          if (response.ok) {
            setLoading('done')
          }
        } catch (error) {
          console.error(error)
          setLoading('error')
        }
      }
    }
  }

  return (
    <div>
      <div className="m-4">
        <AmountOfRecipes
          text1={translations.amountofrecipes1}
          text2={translations.amountofrecipes2}
          amounterror={translations.amounterror}
        />
      </div>
      <hr></hr>
      <form action="" id="recipeFormBasics">
        <div className="m-4">
          <Input
            forwardedRef={nameRef}
            type="text"
            label={translations.name}
            name="name"
            required={true}
            onChange={handleInputChange}
            value={formstate.name}
          ></Input>
        </div>
        <div className="m-4">
          <Select
            forwardedRef={priceRef}
            label={translations.portionprice}
            name="cost"
            required={true}
            options={[translations.priceselect1, translations.priceselect2, translations.priceselect3]}
            onChange={handleSelectChange}
          ></Select>
        </div>
        <div className="m-4">
          <Input
            forwardedRef={imgRef}
            type="text"
            label={translations.imgurl}
            name="imgSrc"
            required={false}
            value={formstate.imgSrc}
            onChange={handleInputChange}
          ></Input>
        </div>
        <div className="m-4">
          <Input
            forwardedRef={tagsRef}
            type="text"
            label={translations.hashtags}
            name="tags"
            required={true}
            value={formstate.tags}
            onChange={handleInputChangeTags}
          ></Input>
        </div>
        <div className="m-4">
          <TextArea
            placeholder=""
            forwardedRef={descRef}
            label={translations.description}
            maxchar={300}
            name="description"
            translations={translations}
            required
            value={formstate.description}
            onChange={handleInputChange}
            wordcount={formstate.description.length}
          ></TextArea>
        </div>
      </form>
      <h2 id="ingredients">{translations.ingredients}</h2>
      <hr></hr>
      <form action="" id="recipeFormIngredients">
        {formstate.recipeIngredients.map((ingredient, i) => (
          <div key={i}>
            <div className="flex flex-col ml-2 mr-2 lg:flex-row lg:items-end" aria-live="polite">
              <div className="basis-1/6 m-2">
                <Input
                  type="text"
                  label={translations.amountof}
                  name={'Value_' + i}
                  required={true}
                  value={ingredient.amountvalue}
                  onChange={(e) => handleIngredientValueChange(i, e)}
                ></Input>
              </div>
              <div className="basis-1/6 m-2">
                <Input
                  type="text"
                  label={translations.unitof}
                  name={'Unit_' + i}
                  required={false}
                  value={ingredient.amountunit}
                  onChange={(e) => handleIngredientUnitChange(i, e)}
                ></Input>
              </div>
              <div className="basis-4/6 m-2">
                <Input
                  type="text"
                  label={translations.ingredient}
                  name={'Name_' + i}
                  required={true}
                  value={ingredient.name}
                  onChange={(e) => handleIngredientNameChange(i, e)}
                ></Input>
              </div>
              <div className="basis-2/6 mb-3 text-right">
                {i !== 0 ? (
                  <Button url="#ingredients" variant="destructive" onClick={() => deleteIngredient(i)}>
                    {translations.deleteingredient}
                  </Button>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="m-3">
          <Button url="#ingredients" variant="secondary" onClick={onAddIngredientButtonClick}>
            {translations.addingredient}
          </Button>
        </div>
      </form>
      <h2 id="recipesteps">{translations.recipesteps}</h2>
      <hr></hr>
      <form action="" id="recipeFormSteps">
        {formstate.steps.map((step, i) => (
          <div key={i}>
            <div className="flex flex-col ml-2 mr-2 lg:flex-row lg:items-start">
              <div className="basis-1/6 lg:basis-1/6 m-2 mb-2 pt-2 font-semibold dark:text-white">
                {translations.recipestep + ' ' + (i + 1)}
              </div>
              <div className="basis-5/6 m-2">
                <EditStepTextArea
                  label={translations.stepdesc}
                  maxchar={800}
                  placeholder=""
                  name={'StepDescription_' + i}
                  translations={translations}
                  value={step.description}
                  onChange={(e) => handleStepTextAreaChange(i, e)}
                  wordcount={formstate.steps[i].description.length}
                  required
                ></EditStepTextArea>
              </div>
              <div className="basis-1/6 lg:basis-2/6 lg:mt-10 text-right">
                {i !== 0 ? (
                  <Button url="#recipesteps" variant="destructive" onClick={() => deleteStep(i)}>
                    {translations.deletestep}
                  </Button>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="m-3">
          <Button url="#recipesteps" variant="secondary" onClick={onAddStepButtonClick}>
            {translations.addstep}
          </Button>
        </div>
      </form>
      <hr></hr>
      <div className="m-3">
        <SubmitFormButton variant="primary" onClick={onSubmit}>
          {translations.save}
        </SubmitFormButton>
        <Button url="#" variant="secondary" onClick={onEmptyButtonClick}>
          {translations.empty}
        </Button>
        {loading === 'loading' ? (
          <div className="inline-block pl-4 dark:text-white">
            <InformSrOfLoading />
            <Spinner />
          </div>
        ) : (
          ''
        )}
        {loading === 'done' ? (
          <div className="inline-block pl-4 dark:text-white">
            <InformSrOfDone />
            {translations.recipesaved}
          </div>
        ) : (
          ''
        )}
        {loading === 'usererror' ? <div className="inline-block pl-4 dark:text-white">{translations.checktheform}</div> : ''}
        {loading === 'error' ? <div className="inline-block pl-4 dark:text-white">{translations.errormsg}</div> : ''}
      </div>
    </div>
  )
}
