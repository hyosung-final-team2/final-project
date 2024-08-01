import { ArrowPathIcon } from '@heroicons/react/16/solid';
import SearchBarWithDrop from '../../common/SearchBar/SearchBarWithDrop';
import CreateSearchResult from "../../../utils/CreateSearchResult.jsx";
import usePendingOrderTableStore from "../../../store/PendingOrderTable/pendingOrderTableStore.js";

const PendingOrderTableFeature = ({ tableColumns, onSearch, handleOrderUpdate, selectedPendingOrders, handleDataReset, dropdownRef }) => {
  const commonButtonStyles = 'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';
  const isButtonDisabled = selectedPendingOrders.length === 0;

  const handleApprove = e => {
    e.preventDefault();
    handleOrderUpdate(selectedPendingOrders, 'APPROVED');
  };

  const handleCancel = e => {
    e.preventDefault();
    handleOrderUpdate(selectedPendingOrders, 'DENIED');
  };

  const { searchCategory, searchKeyword, totalElements} = usePendingOrderTableStore()

  return (
    <div className='flex flex-wrap items-center justify-between p-4 space-y-4 bg-white flex-column md:flex-row md:space-y-0 dark:bg-gray-900'>
      <div className='flex gap-2 items-center'>
        <SearchBarWithDrop tableColumns={tableColumns} onSearch={onSearch} dropdownRef={dropdownRef}/>
        <CreateSearchResult searchCategory={searchCategory} searchKeyword={searchKeyword} totalElements={totalElements}/>
      </div>
      <div className='flex gap-2'>
        <button className='normal-case btn btn-ghost btn-sm' onClick={() => handleDataReset()}>
          <ArrowPathIcon className='w-4 mr-2' />
          Reset
        </button>
        <button
          onClick={handleApprove}
          className={`${commonButtonStyles} ${
            isButtonDisabled ? 'bg-gray-300 text-gray-500' : 'bg-green-300 text-green-700 hover:text-white hover:bg-green-500'
          } px-8`}
          disabled={isButtonDisabled}
        >
          승인
        </button>
        <button
          onClick={handleCancel}
          className={`${commonButtonStyles} ${
            isButtonDisabled ? 'bg-gray-300 text-gray-500' : 'bg-red-300 text-red-700 hover:text-white hover:bg-red-500'
          } px-8`}
          disabled={isButtonDisabled}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default PendingOrderTableFeature;
