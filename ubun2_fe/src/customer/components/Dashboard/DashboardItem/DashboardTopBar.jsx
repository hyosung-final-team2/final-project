// import SelectBox from "../../../components/Input/SelectBox"
import ArrowDownTrayIcon from '@heroicons/react/24/outline/ArrowDownTrayIcon';
import ShareIcon from '@heroicons/react/24/outline/ShareIcon';
import EnvelopeIcon from '@heroicons/react/24/outline/EnvelopeIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/outline/EllipsisVerticalIcon';
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import Datepicker from 'react-tailwindcss-datepicker';
import { useState } from 'react';

const DashboardTopBar = ({ dateValue, setDateValue, onRefresh }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDatePickerValueChange = newValue => {
    setDateValue(newValue);
  };

  const handleRefreshData = () => {
    setRefreshKey(prevKey => prevKey + 1);
    if (onRefresh) {
      onRefresh();
    }
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      <div className=''>
        <Datepicker
          i18n='ko'
          containerClassName='w-72 '
          value={dateValue}
          theme={'light'}
          inputClassName='input input-bordered w-72'
          toggleClassName='invisible'
          onChange={handleDatePickerValueChange}
          showShortcuts={true}
          primaryColor={'white'}
          configs={{
            shortcuts: { today: '오늘', yesterday: '어제', past: p => `${p}일 전`, pastMonth: '저번달', currentMonth: '이번달' },
          }}
        />
      </div>
      <div className='text-right '>
        <button className='btn btn-ghost btn-sm normal-case' onClick={handleRefreshData}>
          <ArrowPathIcon className='w-4 mr-2' />
          Refresh Data
        </button>
        <button className='btn btn-ghost btn-sm normal-case  ml-2'>
          <ShareIcon className='w-4 mr-2' />
          Share
        </button>

        <div className='dropdown dropdown-bottom dropdown-end  ml-2'>
          <label tabIndex={0} className='btn btn-ghost btn-sm normal-case btn-square '>
            <EllipsisVerticalIcon className='w-5' />
          </label>
          <ul tabIndex={0} className='dropdown-content menu menu-compact  p-2 shadow bg-base-100 rounded-box w-52'>
            <li>
              <a>
                <EnvelopeIcon className='w-4' />
                Email Digests
              </a>
            </li>
            <li>
              <a>
                <ArrowDownTrayIcon className='w-4' />
                Download
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopBar;
