import React from 'react';

const Input = ({
    label,
    error,
    icon: Icon,
    className = '',
    containerClassName = '',
    ...props
}) => {
    return (
        <div className={`space-y-1.5 ${containerClassName}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-300">
                    {label}
                </label>
            )}
            <div className="relative group">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon className={`h-5 w-5 text-gray-500 group-focus-within:text-primary-400 transition-colors ${error ? 'text-red-400' : ''}`} />
                    </div>
                )}
                <input
                    className={`
            block w-full 
            ${Icon ? 'pl-10' : 'pl-4'} 
            pr-4 py-3 
            bg-dark-800/50 border 
            ${error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-dark-700 focus:border-primary-500 focus:ring-primary-500/20'} 
            rounded-xl 
            text-gray-100 placeholder-gray-500 
            focus:outline-none focus:ring-4 
            transition-all duration-200 
            sm:text-sm
            ${className}
          `}
                    {...props}
                />
            </div>
            {error && (
                <p className="text-sm text-red-400 mt-1">{error}</p>
            )}
        </div>
    );
};

export default Input;
