import React from 'react';
import SearchInput from '../common/Input/SearchInput';
import Dropdown from '../common/Dropdown/Dropdown';
import paymentMethodStore from '../../store/PaymentMethod/paymentMethodStore';

const PaymentMethodTableFeature = ({ setOpenModal, setCurrentPage }) => {
  const commonButtonStyles = 'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';
  const paymentMethodType = paymentMethodStore(state => state.paymentMethodType);
  const dropdownItems = [
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
      <div className='flex space-x-2'>
        <SearchInput placeholder='은행명 / 카드사 검색' />
        <Dropdown label={paymentMethodType === 'ACCOUNT' ? '계좌' : '카드'} items={dropdownItems} onChange={handleDropdownChange} />
      </div>
      <div className='flex space-x-2'>
        <button className={`${commonButtonStyles} bg-white text-gray-600 hover:text-main hover:bg-slate-50`} onClick={handleClick}>
          결제수단 등록
        </button>
        <button className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500 px-8`}>삭제</button>
      </div>
    </div>
  );
};

export default PaymentMethodTableFeature;
