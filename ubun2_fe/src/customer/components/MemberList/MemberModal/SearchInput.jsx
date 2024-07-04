import { useState } from 'react';

const SearchInput = ({ defaultValue, type, disabled = false, placeholder, containerStyle = '' }) => {
  const [value, setValue] = useState(defaultValue);

  const updateInputValue = val => {
    setValue(val);
  };

  return (
    <div className='relative'>
      <input
        type={type || 'text'}
        value={value}
        placeholder={placeholder || ''}
        onChange={e => updateInputValue(e.target.value)}
        disabled={disabled}
        className={`bg-white border border-gray-300 rounded-xl px-4 py-2 w-64 ${containerStyle}`}
      />
      <div className='absolute top-3 right-3 items-center pointer-events-none'>
        <svg className='w-4 h-4 text-gray-500 dark:text-gray-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'>
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z' />
        </svg>
      </div>
    </div>
  );
};

export default SearchInput;
