import React from 'react';

const SkeletonPieChart = () => {
  return (
    <div className='h-[30dvh] rounded-2xl bg-white drop-shadow-lg shadow-lg col-span-1 p-5'>
      <div className='h-8 w-4/5 bg-gray-200 rounded mb-4'></div>
      <div className='flex justify-center items-center h-[calc(100%-3rem)]'>
        <div className='w-4/5 h-4/5 bg-gray-200 rounded-lg'></div>
      </div>
    </div>
  );
};

export default SkeletonPieChart;
