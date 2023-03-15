import React, { useEffect, useState } from 'react'

const AmountOfRecipes = ({ text1, text2, amounterror }: { text1: string; text2: string; amounterror: string }) => {
  const [recipesLength, setRecipesLength] = useState<number>()

  useEffect(() => {
    fetch(`${process.env.API_URL}/recipes/amount`)
      .then((res) => res.json())
      .then((data) => {
        setRecipesLength(data)
      })
      .catch((error) => {
        console.log(error)
      })
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
    if (recipesLength === undefined) {
      return (
        <>
          <span className="text-red-500 font-bold">{amounterror}</span>
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
}

export default AmountOfRecipes
