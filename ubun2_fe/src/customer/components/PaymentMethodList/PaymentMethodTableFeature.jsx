import React from 'react';
import SearchInput from '../common/Input/SearchInput';
import Dropdown from '../common/Dropdown/Dropdown';

const PaymentMethodTableFeature = ({ setOpenModal }) => {
  const dropdownItems = [
    { label: '계좌', href: '#' },
    { label: '카드', href: '#' },
  ];
  const handleClick = () => {
    setOpenModal(true);
  };
  return (
    <div className='flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900'>
      <div className='flex space-x-2'>
        <SearchInput placeholder='은행명 / 카드사 검색' />
        <Dropdown label='계좌' items={dropdownItems} />
      </div>
      <div className='flex space-x-2'>
        <button
          type='button'
          className='text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800'
          onClick={handleClick}
        >
          결제수단 등록
        </button>
        <button
          type='button'
          className='text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900'
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodTableFeature;
