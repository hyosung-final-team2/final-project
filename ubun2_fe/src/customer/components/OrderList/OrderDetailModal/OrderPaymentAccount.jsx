import { Card } from 'flowbite-react';

const OrderPaymentAccount = ({ payment, customTheme }) => {
  return (
    <Card className='flex flex-col h-full bg-gray-50' theme={customTheme}>
      <p className='text-gray-700'>계좌</p>
      <p className='text-gray-700'>
        <span className='mr-2 text-lg'>{payment.bankName}</span>
        <span className='text-sm'>{`( ${payment.paymentNickname} )`}</span>
      </p>
      <p className='text-gray-700'>{payment.accountNumber}</p>
    </Card>
  );
};

export default OrderPaymentAccount;
