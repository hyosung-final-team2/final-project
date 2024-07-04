import { useState } from 'react';

const InputLabel = ({ labelTitle, defaultValue, type, disabled = false, containerStyle = '', inputStyle }) => {
  const [value, setValue] = useState(defaultValue);

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
          className={`input w-full border-gray-300 disabled:bg-custom-input-gray disabled:text-custom-font-gray p-3 flex-grow rounded-lg ${inputStyle}`}
        />
      </div>
    </div>
  );
};

export default InputLabel;
