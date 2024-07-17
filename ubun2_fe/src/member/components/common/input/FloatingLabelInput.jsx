import React from 'react';

const FloatingLabelInput = ({ id, type, label, pattern, className, setIsModalOpen, selectedItem, isSelectable = false }) => {
  const handleOnclick = () => {
    isSelectable ? setIsModalOpen(true) : '';
  };
  return (
    <div className='relative z-0 px-6 py-2'>
      <input
        type={type || 'text'}
        id={id}
        className={`block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-main appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${className}`}
        placeholder=' '
        pattern={pattern}
        onClick={handleOnclick}
        defaultValue={selectedItem ? `${selectedItem}은행` : ''}
      />
      <label
        htmlFor={id}
        className='absolute text-md text-main dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-6 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto'
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
