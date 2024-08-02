import React from 'react';

const SkeletonAreaChart = () => {
  return (
    <div className='h-[30dvh] rounded-2xl bg-white drop-shadow-lg shadow-lg col-span-1 p-5'>
      <div className='h-4 w-[90%] bg-gray-200 rounded mb-4'></div>
      <div className='h-[calc(100%-2rem)] w-full bg-gray-100 rounded-lg'>
        <div className='h-full w-full flex items-end'></div>
      </div>
    </div>
  );
};

export default SkeletonAreaChart;
