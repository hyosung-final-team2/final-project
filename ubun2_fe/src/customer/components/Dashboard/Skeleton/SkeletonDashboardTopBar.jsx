import React from 'react';
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import Datepicker from 'react-tailwindcss-datepicker';
import SaveIcon from '@heroicons/react/24/outline/ArrowDownTrayIcon';

const SkeletonDashboardTopBar = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 -mb-2'>
      <div className=''>
        <Datepicker
          i18n='ko'
          containerClassName='w-72 '
          theme={'light'}
          inputClassName='input input-bordered w-72'
          toggleClassName='invisible'
          primaryColor={'white'}
        />
      </div>
      <div className='text-right '>
        <button className='btn btn-ghost btn-sm normal-case'>
          <ArrowPathIcon className='w-4 mr-2' />
          초기화
        </button>
        <button className='btn btn-ghost btn-sm normal-case  ml-2'>
          <SaveIcon className='w-4 mr-2' />
          이미지로 저장
        </button>
      </div>
    </div>
  );
};

export default SkeletonDashboardTopBar;
