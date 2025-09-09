import { forwardRef } from 'react'
import clsx from 'clsx'

const Input = forwardRef(({ 
  label,
  error,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  className,
  ...props 
}, ref) => {
  return (
    <div className={clsx('space-y-1', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          'w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-vesnoratech-primary focus:border-transparent',
          {
            'border-red-500 focus:ring-red-500': error,
            'bg-gray-100 cursor-not-allowed': disabled
          }
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
})

Input.displayName = 'Input'
export default Input
