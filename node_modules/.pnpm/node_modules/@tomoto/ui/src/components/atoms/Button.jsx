export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  onClick,
  className = '',
  ...props 
}) {
  const baseClasses = 'font-semibold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-gradient-to-br from-primary-400 to-primary-600 text-white hover:from-primary-500 hover:to-primary-700 shadow-medium hover:shadow-strong focus:ring-primary-500',
    secondary: 'bg-surface-100 text-gray-700 hover:bg-surface-200 shadow-soft hover:shadow-medium focus:ring-surface-500 border border-surface-300',
    outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 bg-white/80 backdrop-blur-sm',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-surface-100 focus:ring-gray-500',
    danger: 'bg-gradient-to-br from-red-400 to-red-600 text-white hover:from-red-500 hover:to-red-700 shadow-medium hover:shadow-strong focus:ring-red-500'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed active:scale-100' : '';
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}