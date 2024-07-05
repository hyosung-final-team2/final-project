import React from 'react';
import paymentMethodStore from '../../../store/PaymentMethod/paymentMethodStore';
const Dropdown = ({ label, items }) => {
  const setPaymentMethodType = paymentMethodStore(state => state.setPaymentMethodType);

  const handleOnClick = item => {
    setPaymentMethodType(item.value);
  };

  return (
    <div className='flex items-center'>
      <button
        id='dropdownDefaultButton'
        data-dropdown-toggle='dropdown'
        type='button'
        className='shadow-md border-gray-300 bg-white text-black font-medium rounded-lg text-sm px-4 py-2.5 inline-flex items-center'
      >
        {label}
        <svg className='w-2.5 h-2.5 ml-3' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 4 4 4-4' />
        </svg>
      </button>
      <div id='dropdown' className='z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700'>
        <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownDefaultButton'>
          {items.map((item, index) => (
            <li
              key={index}
              className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'
              onClick={() => handleOnClick(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
