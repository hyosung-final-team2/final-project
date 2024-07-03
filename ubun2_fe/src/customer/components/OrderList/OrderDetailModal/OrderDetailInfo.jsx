import { Card } from 'flowbite-react';
import OrderPaymentCard from './OrderPaymentCard';
import OrderPaymentAccount from './OrderPaymentAccount';

const customTheme = {
  root: {
    base: 'flex rounded-lg bg-white dark:border-gray-700 dark:bg-gray-800',
    children: 'flex h-full flex-col justify-start gap-4 p-6',
  },
};

const OrderDetailInfo = ({ delivery, payment }) => {
  const totalPrice = 6000;
  const totalOrderPrice = 3000;
  const totalDiscount = 3000;

  return (
    <div className='p-3 space-y-8'>
      <div className='space-y-4'>
        <h5 className='text-xl font-bold tracking-tight text-gray-900'>배송지</h5>
        <Card className='bg-gray-50' theme={customTheme}>
          <p className='font-normal text-gray-700'>{delivery.addresssNickname}</p>
          <p className='font-normal text-gray-700'>{delivery.address}</p>
        </Card>
      </div>

      <div className='flex flex-col space-y-4'>
        <div className='flex justify-between w-full gap-3'>
          <div className='flex flex-col w-1/2'>
            <h5 className='text-xl font-bold tracking-tight text-gray-900'>결제 수단</h5>
            <div className='flex flex-col h-full'>
              {payment.paymentType === 'CARD' ? (
                <OrderPaymentCard payment={payment} customTheme={customTheme} />
              ) : (
                <OrderPaymentAccount payment={payment} customTheme={customTheme} />
              )}
            </div>
          </div>

          <div className='flex flex-col w-1/2'>
            <h5 className='text-xl font-bold tracking-tight text-gray-900'>결제 정보</h5>
            <div className='flex flex-col h-full'>
              <Card className='flex flex-col h-full bg-gray-50' theme={customTheme}>
                <div className='flex items-center justify-between'>
                  <span className='text-xl font-bold text-black'>주문금액</span>
                  <span className='text-gray-500'>{`${totalPrice} 원`}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='font-bold text-red-500'>총 할인</span>
                  <span className='text-gray-500'>{`- ${totalDiscount} 원`}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-xl font-bold text-custom-primary'>결제 금액</span>
                  <span className='font-bold text-gray-500'>{`${totalOrderPrice} 원`}</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailInfo;
