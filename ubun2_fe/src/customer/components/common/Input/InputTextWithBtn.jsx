import { useState } from 'react';

const InputTextWithBtn = ({
  labelTitle,
  labelStyle,
  type,
  containerStyle,
  defaultValue,
  placeholder,
  updateFormValue, // 값이 어떤 걸로 업데이트 되는지
  updateType, // 어떤 값을 업데이트 하는지
  buttonText, // 버튼에 들어갈 텍스트
  clickPossibleWithoutData, // 최초에 데이터 없어도 버튼 사용가능 여부
  buttonFunc,
}) => {
  const [value, setValue] = useState(defaultValue);

  const updateInputValue = val => {
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

  const isButtonDisabled = !clickPossibleWithoutData && !value;
  const buttonClasses = `btn ${!isButtonDisabled ? 'bg-main text-white btn-primary' : 'bg-gray-300 text-gray-600 cursor-not-allowed'} w-1/4`;

  return (
    <div className='flex w-full items-center'>
      <div className={`form-control w-full ${containerStyle}`}>
        <label className='label'>
          <span className={'label-text text-base-content ' + labelStyle}>{labelTitle}</span>
        </label>
        <div className='flex'>
          <input
            type={type || 'text'}
            value={value}
            placeholder={placeholder || ''}
            onChange={e => updateInputValue(e.target.value)}
            className='input input-bordered w-full'
          />
          <div className='w-1/20'></div>
          <button className={buttonClasses} disabled={isButtonDisabled} onClick={() => buttonFunc()}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputTextWithBtn;
