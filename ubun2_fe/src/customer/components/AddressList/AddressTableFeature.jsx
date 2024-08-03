import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon.js';
import SearchBarWithDrop from '../common/SearchBar/SearchBarWithDrop';
import useAddressTableStore from '../../store/Address/addressTableStore.js';
import CreateSearchResult from '../../utils/CreateSearchResult.jsx';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import AddAddress from '../../../assets/images/addhome.svg';

const AddressTableFeature = ({
  onSearch,
  tableColumns,
  handleDataReset,
  selectedAddresses,
  setOpenModal,
  setIsDeleteConfirmModalOpen,
  setIsAlertConfirmModalOpen,
  dropdownRef,
}) => {
  const commonButtonStyles = 'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';

  const handleClick = () => {
    setOpenModal(true);
  };

  const { searchCategory, searchKeyword, totalElements } = useAddressTableStore();

  return (
    <div className='flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900'>
      <div className='flex gap-2 items-center'>
        <SearchBarWithDrop tableColumns={tableColumns} onSearch={onSearch} dropdownRef={dropdownRef} />
        <CreateSearchResult searchCategory={searchCategory} searchKeyword={searchKeyword} totalElements={totalElements} />
      </div>
      <div className='flex space-x-2 items-center'>
        <button className='btn btn-ghost btn-sm normal-case' onClick={() => handleDataReset()}>
          <ArrowPathIcon className='w-4 mr-2' />
          초기화
        </button>
        <button className={`${commonButtonStyles} bg-white text-gray-600 hover:text-main hover:bg-slate-50 flex items-center gap-2`} onClick={handleClick}>
          <AddAddress className='h-5 w-5' />
          주소 등록
        </button>
        <button
          onClick={() => {
            if (selectedAddresses.length > 0) {
              setIsDeleteConfirmModalOpen(true);
            } else {
              setIsAlertConfirmModalOpen(true);
            }
          }}
          className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500 flex gap-2 items-center`}
        >
          <TrashIcon className='w-5' />
          삭제
        </button>
      </div>
    </div>
  );
};

export default AddressTableFeature;
