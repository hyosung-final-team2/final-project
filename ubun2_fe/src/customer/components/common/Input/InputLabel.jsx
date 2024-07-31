import { useState, useEffect } from 'react';

const InputLabel = ({
  labelTitle,
  defaultValue,
  type,
  disabled = false,
  containerStyle = '',
  isUpdate = false,
  isOptional = true,
  onChange,
  textStyle = 'text-lg',
}) => {
  const [value, setValue] = useState(defaultValue);

  // defaultValue가 변경될 때마다 value를 업데이트
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const updateInputValue = val => {
    setValue(val);
    if (onChange) {
      onChange(val);
    }
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <div className='flex items-center'>
        <label className={`w-1/3 label ${!isOptional ? 'justify-normal gap-4' : ''}`}>
          {!isOptional ? <span className='text-2xl text-red-500'>*</span> : null}
          <span className={`${textStyle} font-bold label-text`}>{labelTitle}</span>
        </label>
        <input
          type={type || 'text'}
          defaultValue={value}
          onChange={e => updateInputValue(e.target.value)}
          disabled={disabled}
          className={`flex-grow w-full p-3 ${value === '-' ? 'text-center' : ''} ${
            isUpdate ? 'border border-gray-300' : 'border-none'
          } rounded-lg input disabled:bg-custom-input-gray disabled:text-custom-font-gray`}
        />
      </div>
    </div>
  );
};

export default InputLabel;
