import { Card } from 'flowbite-react';
import { maskCardNumber } from '../../../utils/cardFormat';
import { CreditCardIcon } from '@heroicons/react/16/solid/index.js';

const OrderPaymentCard = ({ payment, customTheme }) => {
  return (
    <Card className='flex flex-col h-full bg-gray-50' theme={customTheme}>
      <div className='flex items-center gap-2 text-lg font-semibold'>
        <CreditCardIcon className='w-6 h-6 mr-2' />
        <p className='text-gray-700'>카드</p>
      </div>
      <p className='text-gray-700'>
        <span className='mr-2 text-lg'>{payment?.cardCompanyName}</span>
        <span className='text-sm'>{`( ${payment?.paymentMethodNickname} )`}</span>
      </p>
      <p className='text-gray-700'>{maskCardNumber(payment?.cardNumber)}</p>
    </Card>
  );
};

export default OrderPaymentCard;
