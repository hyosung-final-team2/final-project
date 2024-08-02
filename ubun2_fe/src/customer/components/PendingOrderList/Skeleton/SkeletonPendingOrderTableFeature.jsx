import SearchBarWithDrop from '../../common/SearchBar/SearchBarWithDrop.jsx';
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon.js';
import { tableColumn } from '../../common/Table/tableIndex.js';
import useSkeletonStore from '../../../store/skeletonStore.js';
import CreateSearchResult from '../../../utils/CreateSearchResult.jsx';

const SkeletonPendingOrderTableFeature = () => {
  const commonButtonStyles = 'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md bg-gray-300 text-gray-500';

  const { skeletonSearchCategory, skeletonSearchKeyword, skeletonTotalElements } = useSkeletonStore();
  return (
    <div className='flex flex-wrap items-center justify-between p-4 space-y-4 bg-white flex-column md:flex-row md:space-y-0 dark:bg-gray-900'>
      <div className='flex items-center gap-2'>
        <SearchBarWithDrop tableColumns={tableColumn.order.pendingOrders} />
        <CreateSearchResult searchCategory={skeletonSearchCategory} searchKeyword={skeletonSearchKeyword} totalElements={skeletonTotalElements} />
      </div>
      <div className='flex items-center gap-2'>
        <button className='normal-case btn btn-ghost btn-sm'>
          <ArrowPathIcon className='w-4 mr-2' />
          초기화
        </button>
        <button className={`${commonButtonStyles} px-8`} disabled={true}>
          승인
        </button>
        <button className={`${commonButtonStyles} px-8`} disabled={true}>
          취소
        </button>
      </div>
    </div>
  );
};

export default SkeletonPendingOrderTableFeature;
