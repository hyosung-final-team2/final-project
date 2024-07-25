import { useEffect, useState, useCallback } from 'react';
import useDetectKeyboardOpen from 'use-detect-keyboard-open';

const BottomButton = ({ buttonText, buttonStyle, buttonFunc, disabled }) => {
  const [keyboardSize, setKeyboardSize] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const isKeyboardOpen = useDetectKeyboardOpen();

  const handleResize = useCallback(() => {
    if (isKeyboardOpen) {
      const newKeyboardSize = window.innerHeight - window.visualViewport.height;
      setKeyboardSize(newKeyboardSize);
    } else {
      setKeyboardSize(0);
      setScrollOffset(0);
      console.log('Keyboard closed');
    }
  }, [isKeyboardOpen]);

  const handleScroll = useCallback(() => {
    if (isKeyboardOpen) {
      const newScrollOffset = window.visualViewport.pageTop;
      setScrollOffset(newScrollOffset);
      console.log('Scroll offset:', newScrollOffset);
    } else {
      setScrollOffset(0);
    }
  }, [isKeyboardOpen]);

  useEffect(() => {
    window.visualViewport.addEventListener('resize', handleResize);
    window.visualViewport.addEventListener('scroll', handleScroll);

    return () => {
      window.visualViewport.removeEventListener('resize', handleResize);
      window.visualViewport.removeEventListener('scroll', handleScroll);
    };
  }, [handleResize, handleScroll]);

  const style = {
    position: 'absolute',
    bottom: isKeyboardOpen ? `${Math.max(0, keyboardSize - scrollOffset)}px` : '0px',
    transition: 'bottom 0.3s',
    zIndex: 2,
    background: isKeyboardOpen ? 'none' : 'linear-gradient(to top, white, white 65%, transparent)',
    paddingLeft: isKeyboardOpen ? '0px' : '2rem',
    paddingRight: isKeyboardOpen ? '0px' : '2rem',
    paddingBottom: isKeyboardOpen ? '0px' : '2rem',
  };

  return (
    <div className='w-full px-8 pb-4 bg-white' style={style}>
      <button
        onClick={() => buttonFunc()}
        className={`font-bold w-full h-14 mt-5 ${buttonStyle} ${isKeyboardOpen ? 'rounded-none' : 'rounded-2xl'} flex items-center justify-center`}
        disabled={disabled}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default BottomButton;
