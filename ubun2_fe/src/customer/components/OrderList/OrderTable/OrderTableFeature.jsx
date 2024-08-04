import { ArrowPathIcon } from '@heroicons/react/16/solid';
import useOrderTableStore from '../../../store/OrderTable/orderTableStore.js';
import CreateSearchResult from '../../../utils/CreateSearchResult.jsx';
import SearchBarWithDrop from '../../common/SearchBar/SearchBarWithDrop';
import { orderStatusOptions } from '../orderStatusOption.js';
import Dropdown from '../../common/Dropdown/Dropdown.jsx';

const OrderTableFeature = ({ tableColumns, onSearch, handleDataReset, dropdownRef, onOrderStatusChange }) => {
  const { searchCategory, searchKeyword, totalElements, orderStatus } = useOrderTableStore();

  return (
    <div className='flex flex-wrap items-center justify-between p-4 space-y-4 bg-white flex-column md:flex-row md:space-y-0 dark:bg-gray-900'>
      <div className='flex items-center gap-2'>
        <SearchBarWithDrop tableColumns={tableColumns} onSearch={onSearch} dropdownRef={dropdownRef} />
        <CreateSearchResult searchCategory={searchCategory} searchKeyword={searchKeyword} totalElements={totalElements} />
      </div>
      <div className='flex items-center gap-4'>
        <button className='normal-case btn btn-ghost btn-sm' onClick={handleDataReset}>
          <ArrowPathIcon className='w-4 mr-2' />
          초기화
        </button>
        <Dropdown
          label={`승인 상태 : ${orderStatusOptions.find(option => option.value === orderStatus)?.label || '전체'}`}
          items={orderStatusOptions}
          onChange={item => onOrderStatusChange(item.value)}
        />
      </div>
    </div>
  );
};

export default OrderTableFeature;
