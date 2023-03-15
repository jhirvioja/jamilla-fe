const SkeletonLoading = ({ loading }: { loading: string }) => {
  return (
    <>
      <div className="animate-pulse">
        <div className="mb-4 max-w rounded overflow-hidden shadow-lg bg-white dark:bg-zinc-800 dark:text-white dark:bg-zinc-800 dark:m-4 dark:text-white dark:border dark:border-white dark:rounded-lg">
          <div className="pt-6 pb-4 mb-2 text-center">
            {loading}
            <span aria-hidden="true">... 🤞</span>
          </div>
        </div>
      </div>
      <div className="animate-pulse opacity-50 dark:opacity-25" aria-hidden="true">
        <div className="mb-4 max-w rounded overflow-hidden shadow-lg bg-white dark:bg-zinc-800 dark:text-white dark:bg-zinc-800 dark:text-white dark:bg-zinc-800 dark:m-4 dark:text-white dark:border dark:border-white dark:rounded-lg">
          <div className="pt-6 pb-4 mb-2 text-center"></div>
        </div>
      </div>
      <div className="animate-pulse opacity-25 dark:opacity-10" aria-hidden="true">
        <div className="mb-4 max-w rounded overflow-hidden shadow-lg bg-white dark:bg-zinc-800 dark:text-white dark:bg-zinc-800 dark:text-white dark:bg-zinc-800 dark:m-4 dark:text-white dark:border dark:border-white dark:rounded-lg">
          <div className="pt-4 pb-2 mb-2 text-center"></div>
        </div>
      </div>
    </>
  )
}

export default SkeletonLoading
