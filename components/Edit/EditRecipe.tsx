import React, { useState, createRef } from 'react'

import { useRouter } from 'next/router'

import type { Recipe, Translations } from '../../types/recipes'

import Input from '../Input'
import Button from '../Button'
import SubmitFormButton from '../SubmitFormButton'
import TextArea from '../TextArea'
import EditStepTextArea from '../Edit/EditStepTextArea'
import Spinner from '../Spinner'
import Select from '../Select'

export const EditRecipe = ({ translations, recipe }: { translations: Translations; recipe: Recipe }) => {
  const router = useRouter()

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
  // Init configuration for the state
  //

	const figureOutCost = (props: string | number) => {
		const priceMap = {
			1: 1,
			2: 2,
			3: 3,
			[translations.priceselect1]: 1,
			[translations.priceselect2]: 2,
			[translations.priceselect3]: 3,
		};
	
		return priceMap[props];
	};

  const freshIngredientsObj = recipe.recipeIngredients.map(
    (item, i) =>
      (item = {
        name: recipe.recipeIngredients[i].name,
        stock: false as boolean,
				amountValue: recipe.recipeIngredients[i].amountValue,
				amountUnit: recipe.recipeIngredients[i].amountUnit
      }),
  )

  const freshStepsObj = recipe.steps.map(
    (item, i) =>
      (item = {
        part: i,
        description: recipe.steps[i].description,
        steplast: false as boolean,
      }),
  )

  //
  // State handling starts here
  //

  const [loading, setLoading] = useState<string>()
  const [formstate, setFormState] = useState({
    id: recipe.id,
		userid: '4f959a9c-b9d1-406b-b1ad-886c550066bf',
		date: recipe.date,
    name: recipe.name,
    description: recipe.description,
    prepTime: '30min',
    cost: undefined,
    imgSrc: recipe.imgSrc,
    tags: recipe.tags,
    recipeIngredients: freshIngredientsObj,
    steps: freshStepsObj,
  })

  //
  // Handling onChanges down here
  //

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const name = event.target.name

    setFormState({ ...formstate, [name]: value })
  }

  const handleInputChangeTags = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const name = event.target.name

    setFormState({
      ...formstate,
      [name]: [
        {
          id: 0,
          tagId: 0,
          tagsArr: value,
        },
      ],
    })
  }

  const handleIngredientNameChange = (i: number, event: React.ChangeEvent<Element>) => {
    const value = (event.target as HTMLInputElement).value

    const updObj = {
      name: value,
      stock: false,
			amountValue: formstate.recipeIngredients[i].amountValue,
			amountUnit: formstate.recipeIngredients[i].amountUnit,
    }

    const recipeIngredients = formstate.recipeIngredients.map((item, i2) => (i2 === i ? (item = updObj) : item))

    setFormState({ ...formstate, recipeIngredients })
  }

  const handleIngredientUnitChange = (i: number, event: React.ChangeEvent<Element>) => {
    const value = (event.target as HTMLInputElement).value

    const updObj = {
      name: formstate.recipeIngredients[i].name,
      stock: false,
      amountValue: formstate.recipeIngredients[i].amountValue,
			amountUnit: value
    }

    const recipeIngredients = formstate.recipeIngredients.map((item, i2) => (i2 === i ? (item = updObj) : item))

    setFormState({ ...formstate, recipeIngredients })
  }

  const handleIngredientValueChange = (i: number, event: React.ChangeEvent<Element>) => {
    const value = (event.target as HTMLInputElement).value

    const updObj = {
      name: formstate.recipeIngredients[i].name,
      stock: false,
			amountValue: value,
			amountUnit: formstate.recipeIngredients[i].amountUnit
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
			part: i,
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
			amountValue: '',
			amountUnit: ''
    }

    formstate.recipeIngredients.push(newObj)

    // At the end change the location to the right header
    // So that speech reader catches up on the right spot focus wise

    window.document.location.href = '#ingredients'
  }

  const onAddStepButtonClick = () => {
    const i = formstate.steps.length - 1

    const newObj = {
			part: 0,
      description: '',
      steplast: true,
    }

    formstate.steps.push(newObj)

    const updObj = {
			part: i,
      description: formstate.steps[i].description,
      steplast: false,
    }

    const steps = formstate.steps.map((item, mapsIterator) => (mapsIterator === i ? (item = updObj) : item))

    setFormState({ ...formstate, steps })

    // At the end change the location to the right header
    // So that speech reader catches up on the right spot focus wise

    window.document.location.href = '#recipesteps'
  }

  const onDeleteButtonClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault()

    if (confirm(translations.deletequestion)) {
      deleteRecipe()
    }

    try {
      // In order to keep up the sync with localStorage
      // we need to delete it from there as well

      window.localStorage.removeItem('recipe_' + recipe.id)
    } catch (error) {
      console.log('Error while trying to remove from localStorage')
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

    // Same with these

    formSteps.reportValidity()
    formIngredients.reportValidity()
    descRefValidity.reportValidity()
    tagsRefValidity.reportValidity()
    imgRefValidity.reportValidity()
    priceRefValidity.reportValidity()
    nameRefValidity.reportValidity()

    // Post a recipe // TODO: make a put update option

    async function postRecipe() {
      if (!formSteps.checkValidity() || !formIngredients.checkValidity() || !formBasics.checkValidity()) {
        setLoading('usererror')
      }
      if (formSteps.checkValidity() && formIngredients.checkValidity() && formBasics.checkValidity()) {
        setLoading('loading')

        try {
          const response = await fetch(`${process.env.API_URL}/Recipes/${recipe.id}`, {
            method: 'PUT',
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
						deleteOriginalRecipeFromLocalStorage()
						setLoading('done')
					}
        } catch (error) {
          console.error(error)
        }
      }
    }

    // Delete the old recipe from localStorage

    function deleteOriginalRecipeFromLocalStorage() {
      try {
        window.localStorage.removeItem('recipe_' + recipe.id)
      } catch (error) {
        console.log('Error while trying to remove from localStorage')
      }
    }

    //
    // Final object to be sent to the API. Uncomment for debugging.
    //

    // console.log(formstate)

    //
    // Final command to post the recipe. Comment for debugging.
    //

    postRecipe()
  }

  async function deleteRecipe() {
    try {
      const response = await fetch(`${process.env.API_URL}/Recipes/${recipe.id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      if (!response.ok) {
        console.error('Error:', response.status, response.statusText)
				setLoading('error')
      }

			if (response.ok) {
				window.location.href = `${process.env.APP_URL}/browse/`
			}
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
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
            options={['', translations.priceselect1, translations.priceselect2, translations.priceselect3]}
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
                  value={ingredient.amountValue as string}
                  onChange={(e) => handleIngredientValueChange(i, e)}
                ></Input>
              </div>
              <div className="basis-1/6 m-2">
                <Input
                  type="text"
                  label={translations.unitof}
                  name={'Unit_' + i}
                  required={false}
                  value={ingredient.amountUnit as string}
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
        <Button url="#" variant="destructive" onClick={onDeleteButtonClick}>
          {translations.deleterecipe}
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
