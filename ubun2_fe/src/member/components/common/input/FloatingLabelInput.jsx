import React from 'react';

const FloatingLabelInput = ({
  id,
  type = 'text',
  label,
  className,
  value = '', // 기본값을 빈 문자열로 설정
  onChange,
  onFocus,
  isSelectable = false,
  readOnly = false,
  placeholder = ' ',
}) => {
  return (
    <div className='relative z-0 px-6 py-2'>
      <input
        type={type}
        id={id}
        className={`block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-main appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${className} ${
          isSelectable ? 'cursor-pointer' : ''
        }`}
        placeholder={placeholder}
        value={value} // undefined 값이 전달되더라도 빈 문자열이 사용됩니다
        onChange={onChange}
        onFocus={onFocus}
        readOnly={readOnly || isSelectable}
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
