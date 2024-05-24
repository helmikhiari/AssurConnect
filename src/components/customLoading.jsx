
export default function CustomLoading({className}) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="animate-spin rounded-full h-full w-full border-4 border-gray-300 border-t-gray-900 dark:border-gray-600 dark:border-t-gray-50" />
      </div>
    )
  }