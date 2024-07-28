import SearchBarWithDrop from '../../common/SearchBar/SearchBarWithDrop.jsx';
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon.js';
import { tableColumn } from '../../common/Table/tableIndex.js';

const SkeletonAddressTableFeature = () => {
  const commonButtonStyles = 'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';

  return (
    <div className='flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900'>
      <div className='flex'>
        <SearchBarWithDrop tableColumns={tableColumn.address.list} />
      </div>
      <div className='flex space-x-2 items-center'>
        <button className='btn btn-ghost btn-sm normal-case'>
          <ArrowPathIcon className='w-4 mr-2' />
          Reset
        </button>
        <button className={`${commonButtonStyles} bg-white text-gray-600 hover:text-main hover:bg-slate-50`}>주소 등록</button>
        <button className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500 px-8`}>삭제</button>
      </div>
    </div>
  );
};

export default SkeletonAddressTableFeature;
