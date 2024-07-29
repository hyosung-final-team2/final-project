import { useEffect, useState } from 'react';

const UpdateInputLabel = ({ labelTitle, name, value, type, disabled = false, containerStyle = '', onChange }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = e => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange({ target: { name, value: newValue } });
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
          value={inputValue}
          onChange={handleChange}
          disabled={disabled}
          className='flex-grow w-full p-3 border-none rounded-lg input disabled:bg-custom-input-gray disabled:text-custom-font-gray'
        />
      </div>
    </div>
  );
};

export default UpdateInputLabel;
