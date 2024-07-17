import React, { useState, useEffect } from 'react';
import BackIcon from '../../../assets/images/backspace.svg';

const PasswordKeypad = ({ onPasswordEnter, amount }) => {
  const [keypadNumbers, setKeypadNumbers] = useState([]);
  const [password, setPassword] = useState('');

  useEffect(() => {
    generateRandomKeypad();
  }, []);

  const generateRandomKeypad = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const shuffled = numbers.sort(() => 0.5 - Math.random());
    setKeypadNumbers([...shuffled, null, 0, 'delete']);
  };

  const handleKeyPress = key => {
    if (key === 'delete') {
      setPassword(prev => prev.slice(0, -1));
    } else if (key !== null && password.length < 6) {
      setPassword(prev => prev + key);
    }
  };

  useEffect(() => {
    if (password.length === 6) {
      onPasswordEnter(password);
    }
  }, [password, onPasswordEnter]);

  return (
    <div className='flex flex-col items-center h-full bg-gray-100 pt-20'>
      {/* 제목 */}
      <div className='absolute bottom-6/10'>
        <div className='text-center mb-8'>
          <p className='text-2xl font-semibold'>{amount}원을 결제하려면</p>
          <p className='text-2xl font-semibold'>비밀번호를 눌러주세요</p>
        </div>
        {/* 비밀번호 */}
        <div className='flex justify-center mb-10'>
          {[...Array(6)].map((_, index) => (
            <div key={index} className={`w-5 h-5 rounded-full mx-3 ${password.length > index ? 'bg-main' : 'bg-gray-300'}`} />
          ))}
        </div>
      </div>
      {/* 키패드 */}
      <div className='absolute bottom-6/100 grid grid-cols-3 gap-y-5dvh gap-x-12dvw'>
        {keypadNumbers.map((key, index) => (
          <button
            key={index}
            onClick={() => handleKeyPress(key)}
            className={`w-16 h-16 rounded-full ${key === null ? 'invisible' : ''} flex items-center justify-center text-[8dvw] font-bold`}
          >
            {key === 'delete' ? password.length > 0 ? <BackIcon /> : null : key !== null ? key : null}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PasswordKeypad;
