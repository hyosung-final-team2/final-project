import React from 'react';

function BottomButton({ buttonText, buttonStyle }) {
  return (
    <button onClick={() => setIsModalOpen(false)} className={`${buttonStyle} font-bold w-full h-14 rounded-2xl mt-5`}>
      {buttonText}
    </button>
  );
}

export default BottomButton;
