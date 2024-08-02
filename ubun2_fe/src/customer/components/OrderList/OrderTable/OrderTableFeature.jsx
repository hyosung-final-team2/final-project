import { ArrowPathIcon } from '@heroicons/react/16/solid';
import SearchBarWithDrop from '../../common/SearchBar/SearchBarWithDrop';
import CreateSearchResult from "../../../utils/CreateSearchResult.jsx";
import useOrderTableStore from "../../../store/OrderTable/orderTableStore.js";


const OrderTableFeature = ({ tableColumns, onSearch, handleDataReset, dropdownRef }) => {

    const { searchCategory, searchKeyword, totalElements} = useOrderTableStore()

    return (
    <div className='flex flex-wrap items-center justify-between p-4 space-y-4 bg-white flex-column md:flex-row md:space-y-0 dark:bg-gray-900'>
      <div className='flex gap-2 items-center'>
        <SearchBarWithDrop tableColumns={tableColumns} onSearch={onSearch} dropdownRef={dropdownRef}/>
        <CreateSearchResult searchCategory={searchCategory} searchKeyword={searchKeyword} totalElements={totalElements}/>
      </div>
      <div className='flex items-start gap-2'>
        <button className='normal-case btn btn-ghost btn-sm' onClick={() => handleDataReset()}>
          <ArrowPathIcon className='w-4 mr-2' />
          초기화
        </button>
      </div>
    </div>
  );
};
export default OrderTableFeature;
