import {useEffect, useState} from 'react';
import CheckIcon from '@heroicons/react/24/outline/CheckCircleIcon'
import XIcon from '@heroicons/react/24/outline/XCircleIcon'

const InputText = ({ labelTitle, labelStyle, type, containerStyle, defaultValue, placeholder, updateFormValue, updateType, isError, regex, regexMessage,isRegexInput=false }) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState(null);
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

    useEffect(() => {
        if (regex && !regex.test(value)) {
            setError(regexMessage);
        } else {
            setError('');
        }
    }, [value, regex]);

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      {labelTitle && (
          <label className='label'>
                  <span className={'label-text text-base-content ' + labelStyle}>{labelTitle}</span>
              {containerStyle !== 'mt-1 w-48/100' ? <span className={'label-text text-red-500 ' + labelStyle}>{error}</span> : null }
          </label>
      )}
        <div className="w-full relative">
            <input
                type={type || 'text'}
                value={value}
                placeholder={placeholder || ''}
                onChange={e => updateInputValue(e.target.value)}
                className={inputStyle}
            />
            {isRegexInput ?
                <div className={`absolute top-1 right-3 mt-2 text-sm`}>
                {error === '' ? <CheckIcon className='text-badge-green h-7 w-7'/> :
                    <XIcon className='text-badge-red h-7 w-7'/>}
                </div> : null
            }

        </div>
        {containerStyle === 'mt-1 w-48/100' ? <span className={' text-red-500 text-xs pt-2 ' + labelStyle}>{error}</span> : null}
    </div>
  );
};

export default InputText;
