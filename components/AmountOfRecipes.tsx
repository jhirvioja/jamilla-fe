import React, { useEffect, useState } from 'react'

const AmountOfRecipes = ({
  text1,
  text2,
  amounterror,
  amountloading,
}: {
  text1: string
  text2: string
  amounterror: string
  amountloading: string
}) => {
  const [recipesLength, setRecipesLength] = useState<number | string>()
  const [status, setStatus] = useState<string>()

  useEffect(() => {
    fetchAmountOfRecipes()

    async function fetchAmountOfRecipes() {
      try {
        const response = await fetch(`${process.env.API_URL}/Recipes/amount/${process.env.USER_ID}`)

        if (!response.ok) {
          console.error('Error:', response.status, response.statusText)
        }

        const data = await response.json()
        setRecipesLength(data)
      } catch (error) {
        console.error(error)
        setStatus('error')
      }
    }
  }, [])

  if (status === 'error') {
    return (
      <>
        <p>{amounterror}</p>
      </>
    )
  }

  if (!recipesLength) {
    return (
      <>
        <p>{amountloading}</p>
      </>
    )
  }

  if (recipesLength) {
    if (recipesLength === 0) {
      return (
        <>
          <p>
            {text1} <span className="text-green-700 font-bold">0</span> {text2}
          </p>
        </>
      )
    }
    if (recipesLength === 250) {
      return (
        <>
          <p>
            {text1} <span className="text-red-500 font-bold">250</span> {text2}
          </p>
        </>
      )
    }
  }

  return <></>
}

export default AmountOfRecipes
