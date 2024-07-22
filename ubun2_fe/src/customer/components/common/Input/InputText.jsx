import {useEffect, useState} from 'react';

const InputText = ({ labelTitle, labelStyle, type, containerStyle, defaultValue, placeholder, updateFormValue, updateType, isError }) => {
  const [value, setValue] = useState(defaultValue);
    const [inputStyle, setInputStyle] = useState('input input-bordered w-full');

  const updateInputValue = val => {
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

    useEffect(() => {
        if (isError) {
            setInputStyle('input input-bordered w-full border-red-500 animate-shake');
            const timer = setTimeout(() => {
                setInputStyle('input input-bordered w-full');
            }, 1000); // 1초 후에 회색 경계선으로 변경

            return () => clearTimeout(timer);
        }
    }, [isError]);

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      {labelTitle && (
        <label className='label'>
          <span className={'label-text text-base-content ' + labelStyle}>{labelTitle}</span>
        </label>
      )}
      <input
        type={type || 'text'}
        value={value}
        placeholder={placeholder || ''}
        onChange={e => updateInputValue(e.target.value)}
        className={inputStyle}
      />
    </div>
  );
};

export default InputText;
