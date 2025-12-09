import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, id, className = '', error, type, ...props }) => {
  return (
    <div className={`${className}`}>
      <label htmlFor={id} className="block text-[10px] font-bold text-(--black-color) uppercase mb-1 ml-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={`w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-(--black-color) text-sm placeholder-[#757575] focus:ring-2 focus:ring-(--green-color) focus:bg-white outline-none
          ${error 
            ? 'border-red-500 focus:ring-red-200' 
            : 'border-gray-300 focus:ring-(--green-color) focus:border-transparent'
          }
        `}
        {...props}
        required
      />
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
};

export default Input;