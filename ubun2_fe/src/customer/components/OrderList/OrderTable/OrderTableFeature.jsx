import SearchBarWithDrop from '../../common/SearchBar/SearchBarWithDrop';

const OrderTableFeature = ({ tableColumns, onSearch }) => {
  const commonButtonStyles = 'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';

  return (
    <div className='flex flex-wrap items-center justify-between p-4 space-y-4 bg-white flex-column md:flex-row md:space-y-0 dark:bg-gray-900'>
      <div className='flex'>
        <SearchBarWithDrop tableColumns={tableColumns} onSearch={onSearch} />
      </div>
      <button className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500 px-8`}>삭제</button>
    </div>
  );
};
export default OrderTableFeature;
