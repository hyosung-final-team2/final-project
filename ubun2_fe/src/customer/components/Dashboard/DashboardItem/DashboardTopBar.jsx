// import SelectBox from "../../../components/Input/SelectBox"
import SaveIcon from '@heroicons/react/24/outline/ArrowDownTrayIcon';
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import Datepicker from 'react-tailwindcss-datepicker';
import { useState } from 'react';

const DashboardTopBar = ({ dateValue, setDateValue, onRefresh, captureAndSaveImage }) => {
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
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 -mb-2'>
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
          초기화
        </button>
        <button className='btn btn-ghost btn-sm normal-case  ml-2' onClick={captureAndSaveImage}>
          <SaveIcon className='w-4 mr-2' />
          이미지로 저장
        </button>
      </div>
    </div>
  );
};

export default DashboardTopBar;
