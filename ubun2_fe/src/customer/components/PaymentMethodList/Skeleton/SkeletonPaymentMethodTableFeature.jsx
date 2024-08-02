import SearchBarWithDrop from '../../common/SearchBar/SearchBarWithDrop.jsx';
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon.js';
import { tableColumn } from '../../common/Table/tableIndex.js';
import paymentMethodStore from '../../../store/PaymentMethod/paymentMethodStore.js';
import ToggleButton from '../../common/ToggleButon/ToggleButton.jsx';
import useSkeletonStore from '../../../store/skeletonStore.js';
import CreateSearchResult from '../../../utils/CreateSearchResult.jsx';
import Dropdown from '../../common/Dropdown/Dropdown.jsx';

const SkeletonAddressTableFeature = () => {
  const commonButtonStyles = 'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';
  const paymentMethodType = paymentMethodStore(state => state.paymentMethodType);
  const isAccount = paymentMethodType === 'ACCOUNT';

  const { skeletonSearchCategory, skeletonSearchKeyword, skeletonTotalElements } = useSkeletonStore();

  const items = [
    { value: 'ACCOUNT', label: '계좌' },
    { value: 'CARD', label: '카드' },
  ];

  const accountStyle = isAccount ? 'text-red-600 font-bold' : 'text-black';
  const cardStyle = isAccount ? 'text-black' : 'text-red-600 font-bold';
  return (
    <div className='flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900'>
      <div className='flex space-x-5 items-center'>
        <SearchBarWithDrop tableColumns={paymentMethodType === 'ACCOUNT' ? tableColumn.paymentMethod.accountList : tableColumn.paymentMethod.cardList} />
        <Dropdown label={paymentMethodType === 'ACCOUNT' ? '계좌' : '카드'} items={items} />
        <CreateSearchResult searchCategory={skeletonSearchCategory} searchKeyword={skeletonSearchKeyword} totalElements={skeletonTotalElements} />
      </div>
      <div className='flex space-x-2 items-center'>
        <button className='btn btn-ghost btn-sm normal-case'>
          <ArrowPathIcon className='w-4 mr-2' />
          Reset
        </button>
        <button className={`${commonButtonStyles} bg-white text-gray-600 hover:text-main hover:bg-slate-50`}>결제수단 등록</button>
        <button className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500 px-8`}>삭제</button>
      </div>
    </div>
  );
};

export default SkeletonAddressTableFeature;
