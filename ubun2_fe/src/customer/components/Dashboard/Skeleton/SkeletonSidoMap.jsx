import React from 'react';

const SkeletonSidoMap = () => {
  return (
    <div className='flex rounded-2xl p-6 bg-white drop-shadow-lg shadow-lg col-span-2 h-[30dvh]'>
      <div className='w-[30%] p-3 border-r'>
        <div className='h-6 w-3/4 bg-gray-200 rounded mb-2'></div>
        <div className='h-4 w-full bg-gray-200 rounded mb-4'></div>
        <div className='mt-4'>
          <div className='h-5 w-1/2 bg-gray-200 rounded mb-2'></div>
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className='flex items-center mb-1'>
              <div className='w-4 h-4 bg-gray-200 rounded mr-2'></div>
              <div className='h-4 w-16 bg-gray-200 rounded'></div>
            </div>
          ))}
        </div>
      </div>
      <div className='w-[70%] relative'>
        <div className='absolute right-4 top-0 h-6 w-32 bg-gray-200 rounded'></div>
        <div className='w-full h-full bg-gray-200 rounded-lg'></div>
      </div>
    </div>
  );
};

export default SkeletonSidoMap;
