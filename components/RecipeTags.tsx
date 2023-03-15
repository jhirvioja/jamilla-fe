type RecipeTagsProps = {
  recipetags: string
}

const RecipeTags = ({ recipetags }: RecipeTagsProps) => {
  const tagsArraySplit = recipetags.split(',')
  return (
    <>
      <span className="sr-only">Hashtagit </span>
      <span className="sr-only">&nbsp;</span>
      {tagsArraySplit.map((recipetag: string, i: number) => (
        <span key={i} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {recipetag}
          <span className="sr-only">,</span>
          <span className="sr-only">&nbsp;</span>
        </span>
      ))}
    </>
  )
}

export default RecipeTags
