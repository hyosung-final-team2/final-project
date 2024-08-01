import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon.js';
import SearchBarWithDrop from '../common/SearchBar/SearchBarWithDrop';
import useAddressTableStore from "../../store/Address/addressTableStore.js";
import CreateSearchResult from "../../utils/CreateSearchResult.jsx";

const AddressTableFeature = ({ onSearch, tableColumns, handleDataReset, setOpenModal, deleteSelectedAddressesMutate,dropdownRef }) => {
  const commonButtonStyles = 'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';

  const handleClick = () => {
    setOpenModal(true);
  };

    const { searchCategory, searchKeyword, totalElements} = useAddressTableStore()

    return (
    <div className='flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900'>
      <div className='flex gap-2 items-center'>
        <SearchBarWithDrop tableColumns={tableColumns} onSearch={onSearch} dropdownRef={dropdownRef}/>
        <CreateSearchResult searchCategory={searchCategory} searchKeyword={searchKeyword} totalElements={totalElements}/>
      </div>
      <div className='flex space-x-2 items-center'>
        <button className='btn btn-ghost btn-sm normal-case' onClick={() => handleDataReset()}>
          <ArrowPathIcon className='w-4 mr-2' />
          Reset
        </button>
        <button className={`${commonButtonStyles} bg-white text-gray-600 hover:text-main hover:bg-slate-50`} onClick={handleClick}>
          주소 등록
        </button>
        <button onClick={() => deleteSelectedAddressesMutate()} className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500 px-8`}>삭제</button>
      </div>
    </div>
  );
};

export default AddressTableFeature;
