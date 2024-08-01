import React from 'react';

const SkeletonDashboardStats = () => {
  return (
    <div className='stats drop-shadow-lg cursor-pointer bg-white hover:bg-gray-200 text-ellipsis overflow-hidden w-full h-28'>
      <div className='stat p-4'>
        <div className='flex items-center h-full'>
          <div className='stat-figure dark:text-slate-300 p-2 bg-gray-200 rounded-full w-14 h-14 flex items-center justify-center'>
            <div className='h-8 w-8 bg-gray-300 rounded-full animate-pulse' />
          </div>
          <div className='flex flex-col ml-4 min-w-0 flex-1 justify-center h-full'>
            <div className='stat-title dark:text-slate-300 text-main text-sm h-3 w-3/4 bg-gray-300 rounded animate-pulse mb-2' />
            <div className='stat-value dark:text-slate-300 text-main text-2xl h-6 w-1/2 bg-gray-300 rounded animate-pulse mb-1' />
            <div className='stat-desc text-main text-xs h-2 w-2/3 bg-gray-300 rounded animate-pulse' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonDashboardStats;
