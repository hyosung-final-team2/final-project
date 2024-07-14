import { Card } from 'flowbite-react';
import { formatAccountNumber } from '../../../utils/accountFormat';

const OrderPaymentAccount = ({ payment, customTheme }) => {
  return (
    <Card className='flex flex-col h-full bg-gray-50' theme={customTheme}>
      <p className='text-gray-700'>계좌</p>
      <p className='text-gray-700'>
        <span className='mr-2 text-lg'>{payment.bankName}</span>
        <span className='text-sm'>{`( ${payment.paymentMethodNickname} )`}</span>
      </p>
      <p className='text-gray-700'>{formatAccountNumber(payment.accountNumber)}</p>
    </Card>
  );
};

export default OrderPaymentAccount;
