import {useEffect, useState} from 'react';

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
  showTimer = false, // 타이머 표시 여부
  timerValue,
  isAuthSuccess,
  regex = /.*/
}) => {
  const [value, setValue] = useState(defaultValue);

  const updateInputValue = val => {
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

  const [isValid, setIsValid] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timerValue);

  useEffect(() => {
    setIsValid(regex.test(value)); // regex 검사를 통해 isValid 설정
  }, [value, regex]);

  useEffect(() => {
    let timer;
    if (showTimer && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showTimer, timeLeft]);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };



  // isValid를 포함한 isButtonDisabled 조건
  const isButtonDisabled = !clickPossibleWithoutData && (!value || !isValid);
  const buttonClasses = `btn ${!isButtonDisabled ? 'bg-main text-white btn-primary' : 'bg-gray-300 text-gray-600 cursor-not-allowed'} w-1/4`;

  return (
    <div className='flex w-full items-center'>
      <div className={`form-control w-full ${containerStyle}`}>
        <label className='label'>
          <span className={'label-text text-base-content ' + labelStyle}>{labelTitle}</span>
        </label>
        <div className='flex'>
          <div className="w-full relative">
            <input
              type={type || 'text'}
              value={value}
              placeholder={placeholder || ''}
              onChange={e => updateInputValue(e.target.value)}
              className='input input-bordered w-full'
            />
            {showTimer && isAuthSuccess === null && <div className='absolute top-2 right-3 mt-2 text-sm text-red-500'>{formatTime(timeLeft)}</div>}
            {showTimer && isAuthSuccess !== null && (
                <div className={`absolute top-2 right-3 mt-2 text-sm ${isAuthSuccess ? 'text-green-500' : 'text-red-500'}`}>
                  {isAuthSuccess ? '인증완료' : '인증실패'}
                </div>
            )}
          </div>
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
