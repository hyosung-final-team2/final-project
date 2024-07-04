import SearchBarWithDrop from '../../common/SearchBar/SearchBarWithDrop';

const PendingOrderTableFeature = ({ tableColumns, onSearch, orderApprove, orderCancel }) => {
  const commonButtonStyles = 'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';

  return (
    <div className='flex flex-wrap items-center justify-between p-4 space-y-4 bg-white flex-column md:flex-row md:space-y-0 dark:bg-gray-900'>
      <div className='flex'>
        <SearchBarWithDrop tableColumns={tableColumns} onSearch={onSearch} />
      </div>
      <div className='flex gap-2'>
        <button onClick={orderApprove} className={`${commonButtonStyles} bg-green-300 text-green-700 hover:text-white hover:bg-green-500 px-8`}>
          승인
        </button>
        <button onClick={orderCancel} className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500 px-8`}>
          취소
        </button>
      </div>
    </div>
  );
};

export default PendingOrderTableFeature;
