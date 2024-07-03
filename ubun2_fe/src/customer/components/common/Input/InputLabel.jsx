import { useState, useEffect } from 'react';

const InputLabel = ({ labelTitle, defaultValue, type, disabled = false, containerStyle = '' }) => {
  const [value, setValue] = useState(defaultValue);

  // defaultValue가 변경될 때마다 value를 업데이트
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const updateInputValue = val => {
    setValue(val);
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <div className='flex items-center'>
        <label className='label w-28'>
          <span className='label-text text-xl font-bold'>{labelTitle}</span>
        </label>
        <input
          type={type || 'text'}
          value={value}
          onChange={e => updateInputValue(e.target.value)}
          disabled={disabled}
          className='input w-full border-none disabled:bg-custom-input-gray disabled:text-custom-font-gray p-3 flex-grow rounded-lg'
        />
      </div>
    </div>
  );
};

export default InputLabel;
