import { useState, useEffect } from 'react';

const UpdateInputLabel = ({ labelTitle, name, defaultValue, type, disabled = false, containerStyle = '', onChange }) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = e => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <div className='flex items-center'>
        <label className='label w-28'>
          <span className='text-xl font-bold label-text'>{labelTitle}</span>
        </label>
        <input
          type={type || 'text'}
          name={name}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className='flex-grow w-full p-3 border-none rounded-lg input disabled:bg-custom-input-gray disabled:text-custom-font-gray'
        />
      </div>
    </div>
  );
};

export default UpdateInputLabel;
