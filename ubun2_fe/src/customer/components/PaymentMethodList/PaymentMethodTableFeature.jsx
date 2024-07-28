import React from 'react';
import Dropdown from '../common/Dropdown/Dropdown';
import paymentMethodStore from '../../store/PaymentMethod/paymentMethodStore';
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon.js';
import SearchBarWithDrop from '../common/SearchBar/SearchBarWithDrop';
import ToggleButton from '../common/ToggleButon/ToggleButton';

const PaymentMethodTableFeature = ({ setOpenModal, setCurrentPage, onSearch, tableColumns, handleDataReset }) => {
  const commonButtonStyles = 'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';
  const paymentMethodType = paymentMethodStore(state => state.paymentMethodType);
  const items = [
    { value: 'ACCOUNT', label: '계좌' },
    { value: 'CARD', label: '카드' },
  ];

  const handleClick = () => {
    setOpenModal(true);
  };

  const handleDropdownChange = value => {
    setCurrentPage(1);
  };

  return (
    <div className='flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900'>
      <div className='flex space-x-5 items-center'>
        <SearchBarWithDrop tableColumns={paymentMethodType === 'ACCOUNT' ? tableColumns.accountList : tableColumns.cardList} onSearch={onSearch} />
        <ToggleButton label={paymentMethodType === 'ACCOUNT' ? '계좌' : '카드'} items={items} onChange={handleDropdownChange} />
      </div>
      <div className='flex space-x-2 items-center'>
        <button className='btn btn-ghost btn-sm normal-case ' onClick={() => handleDataReset()}>
          <ArrowPathIcon className='w-4 mr-2' />
          Reset
        </button>
        <button className={`${commonButtonStyles} bg-white text-gray-600 hover:text-main hover:bg-slate-50`} onClick={handleClick}>
          결제수단 등록
        </button>
        <button className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500 px-8`}>삭제</button>
      </div>
    </div>
  );
};

export default PaymentMethodTableFeature;
