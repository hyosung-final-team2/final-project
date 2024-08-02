import SearchBarWithDrop from '../../common/SearchBar/SearchBarWithDrop.jsx';
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon.js';
import { tableColumn } from '../../common/Table/tableIndex.js';
import useSkeletonStore from '../../../store/skeletonStore.js';
import CreateSearchResult from '../../../utils/CreateSearchResult.jsx';
import Dropdown from '../../common/Dropdown/Dropdown.jsx';

const SkeletonOrderTableFeature = () => {
  const { skeletonSearchCategory, skeletonSearchKeyword, skeletonTotalElements } = useSkeletonStore();

  return (
    <div className='flex flex-wrap items-center justify-between p-4 space-y-4 bg-white flex-column md:flex-row md:space-y-0 dark:bg-gray-900'>
      <div className='flex items-center gap-2'>
        <SearchBarWithDrop tableColumns={tableColumn.order.orders} />
        <CreateSearchResult searchCategory={skeletonSearchCategory} searchKeyword={skeletonSearchKeyword} totalElements={skeletonTotalElements} />
      </div>
      <div className='flex items-center gap-2'>
        <Dropdown label={`승인 상태 : 전체`} />
        <button className='normal-case btn btn-ghost btn-sm'>
          <ArrowPathIcon className='w-4 mr-2' />
          초기화
        </button>
      </div>
    </div>
  );
};

export default SkeletonOrderTableFeature;
