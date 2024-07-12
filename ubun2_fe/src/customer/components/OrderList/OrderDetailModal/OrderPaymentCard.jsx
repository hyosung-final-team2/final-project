import { Card } from 'flowbite-react';

const OrderPaymentCard = ({ payment, customTheme }) => {
  return (
    <Card className='flex flex-col h-full bg-gray-50' theme={customTheme}>
      <p className='text-gray-700'>카드</p>
      <p className='text-gray-700'>
        <span className='mr-2 text-lg'>{payment.cardCompanyName}</span>
        <span className='text-sm'>{`( ${payment.paymentMethodNickname} )`}</span>
      </p>
      <p className='text-gray-700'>{payment.cardNumber}</p>
    </Card>
  );
};

export default OrderPaymentCard;
