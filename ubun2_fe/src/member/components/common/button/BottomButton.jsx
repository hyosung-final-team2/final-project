import React from 'react';

const BottomButton = ({ buttonText, buttonStyle, setIsModalOpen }) => {
  return (
    <button onClick={() => setIsModalOpen(false)} className={`${buttonStyle} font-bold w-full h-14 rounded-2xl mt-5`}>
      {buttonText}
    </button>
  );
};

export default BottomButton;
