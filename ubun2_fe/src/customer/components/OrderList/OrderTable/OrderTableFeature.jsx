import SearchBarWithDrop from '../../common/SearchBar/SearchBarWithDrop';

const OrderTableFeature = ({ tableColumns, onSearch }) => {
  return (
    <div className='flex flex-wrap items-center justify-between p-4 space-y-4 bg-white flex-column md:flex-row md:space-y-0 dark:bg-gray-900'>
      <div className='flex'>
        <SearchBarWithDrop tableColumns={tableColumns} onSearch={onSearch} />
      </div>
    </div>
  );
};
export default OrderTableFeature;
