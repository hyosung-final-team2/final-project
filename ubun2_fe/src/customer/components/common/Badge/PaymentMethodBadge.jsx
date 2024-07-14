import { CreditCardIcon, CurrencyDollarIcon } from '@heroicons/react/16/solid';

const PaymentMethodBadge = ({ paymentType }) => {
  return paymentType === 'CARD' ? (
    <div className='flex items-center space-x-2'>
      <CreditCardIcon className='w-6 h-6' />
      <span>카드</span>
    </div>
  ) : (
    <div className='flex items-center space-x-2'>
      <CurrencyDollarIcon className='w-6 h-6' />
      <span>계좌</span>
    </div>
  );
};

export default PaymentMethodBadge;
