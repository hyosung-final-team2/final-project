import React from 'react';
import paymentMethodStore from '../../../../customer/store/PaymentMethod/paymentMethodStore';

const ToggleButton = ({ label, onChange }) => {
  const setPaymentMethodType = paymentMethodStore(state => state.setPaymentMethodType);
  const paymentMethodType = paymentMethodStore(state => state.paymentMethodType);

  const handleOnChange = () => {
    if (onChange) {
      paymentMethodType === 'ACCOUNT' ? setPaymentMethodType('CARD') : setPaymentMethodType('ACCOUNT');
      onChange();
    }
  };
  return (
    <label className='inline-flex items-center cursor-pointer ml-5'>
      <input type='checkbox' value='' className='sr-only peer' onChange={handleOnChange} />
      <div className="relative w-11 h-6 bg-white ring-1 ring-main peer-focus:outline-none peer-focus:ring-1 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-gray-700 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-main after:border-main after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white"></div>
      <span className='ms-3 text-lg font-medium text-gray-900 dark:text-gray-300'>{label}</span>
    </label>
  );
};

export default ToggleButton;
