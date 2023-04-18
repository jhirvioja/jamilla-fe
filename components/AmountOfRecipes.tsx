import React, { useEffect, useState } from 'react'

const AmountOfRecipes = ({ text1, text2, amounterror }: { text1: string; text2: string; amounterror: string }) => {
  const [recipesLength, setRecipesLength] = useState<number | string>("o")

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
      }
    }
  }, [])

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
  } else {
      return (
        <>
          <p>
            {text1} {recipesLength} {text2}
          </p>
        </>
      )
    }
  
}

export default AmountOfRecipes
