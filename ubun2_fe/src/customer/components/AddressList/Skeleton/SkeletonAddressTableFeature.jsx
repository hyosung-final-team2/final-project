import SearchBarWithDrop from '../../common/SearchBar/SearchBarWithDrop.jsx';
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon.js';
import { tableColumn } from '../../common/Table/tableIndex.js';
import useSkeletonStore from '../../../store/skeletonStore.js';
import CreateSearchResult from '../../../utils/CreateSearchResult.jsx';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import AddAddress from '../../../../assets/images/addhome.svg';

const SkeletonAddressTableFeature = () => {
  const commonButtonStyles = 'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';

  const { skeletonSearchCategory, skeletonSearchKeyword, skeletonTotalElements } = useSkeletonStore();
  return (
    <div className='flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900'>
      <div className='flex gap-2 items-center'>
        <SearchBarWithDrop tableColumns={tableColumn.address.list} />
        <CreateSearchResult searchCategory={skeletonSearchCategory} searchKeyword={skeletonSearchKeyword} totalElements={skeletonTotalElements} />
      </div>
      <div className='flex space-x-2 items-center'>
        <button className='btn btn-ghost btn-sm normal-case'>
          <ArrowPathIcon className='w-4 mr-2' />
          초기화
        </button>
        <button className={`${commonButtonStyles} bg-white text-gray-600 hover:text-main hover:bg-slate-50 flex gap-2 items-center`}>
          <AddAddress className='h-5 w-5' />
          주소 등록
        </button>
        <button className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500 flex gap-2 items-center`}>
          <TrashIcon className='w-5' />
          삭제
        </button>
      </div>
    </div>
  );
};

export default SkeletonAddressTableFeature;
