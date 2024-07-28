import { Card } from 'flowbite-react';
import { maskAccountNumber } from '../../../utils/accountFormat';
import { CurrencyDollarIcon } from '@heroicons/react/16/solid/index.js';

const OrderPaymentAccount = ({ payment, customTheme }) => {
  return (
    <Card className='flex flex-col h-full bg-gray-50' theme={customTheme}>
      <div className='flex items-center gap-2 text-lg font-semibold'>
        <CurrencyDollarIcon className='w-6 h-6 mr-2' />
        <p className='text-gray-700'>계좌</p>
      </div>
      <p className='text-gray-700'>
        <span className='mr-2 text-lg'>{payment?.bankName}</span>
        <span className='text-sm'>{`( ${payment?.paymentMethodNickname} )`}</span>
      </p>
      <p className='text-gray-700'>{maskAccountNumber(payment?.accountNumber)}</p>
    </Card>
  );
};

export default OrderPaymentAccount;
