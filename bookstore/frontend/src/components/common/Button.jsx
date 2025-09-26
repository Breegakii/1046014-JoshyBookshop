// Button.jsx
import { FaSpinner } from 'react-icons/fa';

const Button = ({ 
  children, 
  onClick, 
  loading = false, 
  disabled = false,
  variant = 'primary',
  className = '',
  ...props 
}) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <FaSpinner className="animate-spin mr-2" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;