import React, { useState, useRef, useEffect } from 'react';

const PaymentItem = ({ icon, title, subtitle, selected = false, checkedIcon, isEdit, onClick, onTitleChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [isError, setIsError] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setEditedTitle(title);
  }, [title]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditClick = e => {
    e.stopPropagation();
    setIsEditing(true);
    setIsError(false);
  };

  const handleTitleChange = e => {
    setEditedTitle(e.target.value);
    setIsError(false);
    onTitleChange(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editedTitle.trim() === '') {
      setIsError(true);
      setEditedTitle(title);
      onTitleChange(title);
    }
  };

  const handleFocus = () => {
    setIsError(false);
  };

  return (
    <div className='flex items-center p-4' onClick={onClick}>
      <div className='mr-5 flex-shrink-0'>{icon}</div>
      <div>
        <div className='flex pb-1'>
          {isEditing ? (
            <input
              ref={inputRef}
              type='text'
              value={editedTitle}
              onChange={handleTitleChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              onFocus={handleFocus}
              className={`text-xl font-bold border-none focus:text-gray-600 focus:ring-0 p-0 m-0 ${isError ? 'border-2 border-red-500 rounded' : ''}`}
            />
          ) : (
            <p className='text-xl font-bold'>{editedTitle}</p>
          )}
          {isEdit && !isEditing && (
            <svg
              viewBox='0 0 1024 1024'
              className='icon ml-1 w-4 h-4 self-center cursor-pointer'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              fill='#000000'
              onClick={handleEditClick}
            >
              <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
              <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
              <g id='SVGRepo_iconCarrier'>
                <path
                  d='M823.3 938.8H229.4c-71.6 0-129.8-58.2-129.8-129.8V215.1c0-71.6 58.2-129.8 129.8-129.8h297c23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.7 42.7h-297c-24.5 0-44.4 19.9-44.4 44.4V809c0 24.5 19.9 44.4 44.4 44.4h593.9c24.5 0 44.4-19.9 44.4-44.4V512c0-23.6 19.1-42.7 42.7-42.7s42.7 19.1 42.7 42.7v297c0 71.6-58.2 129.8-129.8 129.8z'
                  fill='#3688FF'
                ></path>
                <path
                  d='M483 756.5c-1.8 0-3.5-0.1-5.3-0.3l-134.5-16.8c-19.4-2.4-34.6-17.7-37-37l-16.8-134.5c-1.6-13.1 2.9-26.2 12.2-35.5l374.6-374.6c51.1-51.1 134.2-51.1 185.3 0l26.3 26.3c24.8 24.7 38.4 57.6 38.4 92.7 0 35-13.6 67.9-38.4 92.7L513.2 744c-8.1 8.1-19 12.5-30.2 12.5z m-96.3-97.7l80.8 10.1 359.8-359.8c8.6-8.6 13.4-20.1 13.4-32.3 0-12.2-4.8-23.7-13.4-32.3L801 218.2c-17.9-17.8-46.8-17.8-64.6 0L376.6 578l10.1 80.8z'
                  fill='#5F6379'
                ></path>
              </g>
            </svg>
          )}
        </div>
        <p className='text-md text-gray-500'>{subtitle}</p>
      </div>
      {selected && <div className='right-10 absolute'>{checkedIcon}</div>}
    </div>
  );
};

export default PaymentItem;
