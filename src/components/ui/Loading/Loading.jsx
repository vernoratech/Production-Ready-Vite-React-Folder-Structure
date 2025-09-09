import clsx from 'clsx'

const Loading = ({ 
  size = 'medium', 
  text = 'Loading...', 
  overlay = false,
  className 
}) => {
  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8', 
    large: 'w-12 h-12'
  }

  const LoadingContent = () => (
    <div className={clsx('flex flex-col items-center justify-center space-y-3', className)}>
      <div className={clsx(
        'border-4 border-gray-200 border-t-vesnoratech-primary rounded-full animate-spin',
        sizes[size]
      )} />
      {text && <p className="text-gray-600 text-sm">{text}</p>}
    </div>
  )

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        <LoadingContent />
      </div>
    )
  }

  return <LoadingContent />
}

export default Loading
