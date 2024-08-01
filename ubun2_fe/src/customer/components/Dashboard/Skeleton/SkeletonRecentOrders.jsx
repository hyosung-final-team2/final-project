import React from 'react';

const SkeletonRecentOrders = () => {
  return (
    <div className='h-[30dvh] rounded-2xl p-5 bg-white drop-shadow-lg shadow-lg col-span-2 flex flex-col'>
      <div className='h-6 w-40 bg-gray-200 rounded mb-4'></div>
      <div className='flex-grow'>
        <div className='w-full h-full bg-gray-200 rounded-lg animate-pulse'></div>
      </div>
    </div>
  );
};

export default SkeletonRecentOrders;
