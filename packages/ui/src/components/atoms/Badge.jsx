export function Badge({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '' 
}) {
  const baseClasses = 'inline-flex items-center font-medium rounded-xl backdrop-blur-sm';
  
  const variants = {
    primary: 'bg-primary-100/80 text-primary-800 border border-primary-200',
    secondary: 'bg-surface-100/80 text-gray-700 border border-surface-300',
    success: 'bg-green-100/80 text-green-800 border border-green-200',
    warning: 'bg-yellow-100/80 text-yellow-800 border border-yellow-200',
    danger: 'bg-red-100/80 text-red-800 border border-red-200',
    info: 'bg-blue-100/80 text-blue-800 border border-blue-200'
  };
  
  const sizes = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  
  return (
    <span className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}