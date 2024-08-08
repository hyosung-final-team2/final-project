import { useState, useRef, useEffect } from 'react';
import paymentMethodStore from '../../../../customer/store/PaymentMethod/paymentMethodStore';
import usePaymentMethodTableStore from '../../../store/PaymentMethod/paymentMethodTableStore';

const Dropdown = ({ label, items, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const paymentMethodType = paymentMethodStore(state => state.paymentMethodType);
  const setPaymentMethodType = paymentMethodStore(state => state.setPaymentMethodType);
  const dropdownRef = useRef(null);
  const { resetData } = usePaymentMethodTableStore();

  const handleToggle = () => setIsOpen(!isOpen);

  const handleItemClick = item => {
    const newType = paymentMethodType === 'ACCOUNT' ? 'CARD' : 'ACCOUNT';
    setPaymentMethodType(newType);
    onChange && onChange(item);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className='w-full bg-white border shadow-md btn focus:border-blue-500 focus:outline-none focus:ring hover:bg-gray-200'
        style={{ height: '42px', minHeight: 'auto' }}
      >
        {label}
        <svg className='w-2.5 h-2.5 ml-3' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 4 4 4-4' />
        </svg>
      </button>
      {isOpen && (
        <ul className='absolute z-20 w-full p-2 mt-1 text-sm text-gray-700 bg-white border-gray-700 rounded-lg shadow-md'>
          {items.map((item, index) => (
            <li
              key={index}
              className='px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-main hover:font-bold'
              onClick={() => handleItemClick(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
