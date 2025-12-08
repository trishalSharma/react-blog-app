import react from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-700',
    hoverColor = 'hover:bg-blue-600',
    cursorPointer = 'cursor-pointer',
    textColor = 'text-white',
    className = '',
    loading =false,
    disabled = {loading},

    ...props
}) {
    return (
        <button className={`px-6 py-2 rounded-lg ${bgColor} ${textColor} ${hoverColor} ${cursorPointer} ${className }`} {...props}>
           {loading && (
                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}  {children}
        </button>
    )
}
export default Button