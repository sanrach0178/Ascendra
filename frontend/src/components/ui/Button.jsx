import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    className = '',
    disabled,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-900/20 hover:shadow-primary-900/40 border border-transparent focus:ring-primary-500',
        secondary: 'bg-dark-800 hover:bg-dark-700 text-white border border-dark-700 hover:border-dark-600 focus:ring-dark-500',
        outline: 'bg-transparent border-2 border-primary-600 text-primary-400 hover:bg-primary-950/50 focus:ring-primary-500',
        ghost: 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5 focus:ring-gray-500',
        danger: 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20 focus:ring-red-500',
    };

    const sizes = {
        sm: 'text-xs px-3 py-1.5 rounded-lg',
        md: 'text-sm px-4 py-2.5 rounded-xl',
        lg: 'text-base px-6 py-3.5 rounded-2xl',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {children}
        </button>
    );
};

export default Button;
