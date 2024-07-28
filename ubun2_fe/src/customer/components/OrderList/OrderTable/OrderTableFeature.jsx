import { ArrowPathIcon } from '@heroicons/react/16/solid';
import SearchBarWithDrop from '../../common/SearchBar/SearchBarWithDrop';

const OrderTableFeature = ({ tableColumns, onSearch, handleDataReset }) => {
  return (
    <div className='flex flex-wrap items-center justify-between p-4 space-y-4 bg-white flex-column md:flex-row md:space-y-0 dark:bg-gray-900'>
      <div className='flex'>
        <SearchBarWithDrop tableColumns={tableColumns} onSearch={onSearch} />
      </div>
      <div className='flex items-center gap-2'>
        <button className='normal-case btn btn-ghost btn-sm' onClick={() => handleDataReset()}>
          <ArrowPathIcon className='w-4 mr-2' />
          Reset
        </button>
      </div>
    </div>
  );
};
export default OrderTableFeature;
