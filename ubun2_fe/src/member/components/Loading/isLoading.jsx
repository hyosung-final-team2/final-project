import React from 'react';

const isLoading = ({ loadingText }) => {
  return (
    <div className='flex items-center justify-center h-full bg-gray-white'>
      <div className='text-center'>
        <span className='loading loading-spinner loading-lg text-main'></span>
        <h2 className='text-xl font-semibold text-gray-700 mb-2'>{loadingText}</h2>
        <p className='text-gray-500'>잠시만 기다려 주세요.</p>
      </div>
    </div>
  );
};

export default isLoading;
