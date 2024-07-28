import { Card } from 'flowbite-react';
import { formatCurrency } from '../../../utils/currencyFormat';
import OrderPaymentAccount from './OrderPaymentAccount';
import OrderPaymentCard from './OrderPaymentCard';
import { HomeIcon } from '@heroicons/react/16/solid';

const customTheme = {
  root: {
    base: 'flex rounded-lg bg-white dark:border-gray-700 dark:bg-gray-800',
    children: 'flex h-full flex-col justify-start gap-4 p-6',
  },
};

const OrderDetailInfo = ({ orderInfo, selectedCycle, isSubscription }) => {
  // 단건 & 정기 계산
  const calculateAmounts = () => {
    if (!isSubscription) {
      return {
        orderAmount: orderInfo.orderAmount,
        discountAmount: orderInfo.discountAmount,
        paymentAmount: orderInfo.paymentAmount,
      };
    }

    const cycleProducts = orderInfo.subscriptionOrderProducts.filter(p => p.cycleNumber === selectedCycle);
    const orderAmount = cycleProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const discountAmount = cycleProducts.reduce((sum, p) => sum + Math.round((p.price * p.quantity * p.discount) / 100), 0);
    const paymentAmount = orderAmount - discountAmount;

    return { orderAmount, discountAmount, paymentAmount };
  };

  const { orderAmount, discountAmount, paymentAmount } = calculateAmounts();

  return (
    <div className='p-3 space-y-8'>
      {/* 배송지 */}
      <div className='space-y-4'>
        <h5 className='text-xl font-bold tracking-tight text-gray-900'>배송지</h5>
        <Card className='bg-gray-50' theme={customTheme}>
          <div className='flex items-center gap-1'>
            <HomeIcon className='w-6 h-6 mr-2' />
            <p className='text-xl font-normal text-gray-700'>{orderInfo?.addressNickname}</p>
          </div>
          <p className='font-normal text-gray-700'>{orderInfo?.address}</p>
        </Card>
      </div>

      <div className='flex flex-col space-y-4'>
        <div className='flex justify-between w-full gap-3'>
          {/* 결제 수단 */}
          <div className='flex flex-col w-1/2 gap-3'>
            <h5 className='text-xl font-bold tracking-tight text-gray-900'>결제 수단</h5>
            <div className='flex flex-col h-full'>
              {orderInfo?.paymentType === 'CARD' ? (
                <OrderPaymentCard payment={orderInfo} customTheme={customTheme} />
              ) : (
                <OrderPaymentAccount payment={orderInfo} customTheme={customTheme} />
              )}
            </div>
          </div>

          {/* 금액 정보 */}
          <div className='flex flex-col w-1/2 gap-3'>
            <h5 className='text-xl font-bold tracking-tight text-gray-900'>결제 정보</h5>
            <div className='flex flex-col h-full'>
              <Card className='flex flex-col h-full bg-gray-50' theme={customTheme}>
                <div className='flex items-center justify-between'>
                  <span className='text-xl font-bold text-black'>주문금액</span>
                  <span className='text-gray-500'>{`${formatCurrency(orderAmount)} 원`}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='font-bold text-red-500'>총 할인</span>
                  <span className='text-red-500'>{discountAmount > 0 ? `- ${formatCurrency(discountAmount)} 원` : '-'}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-xl font-bold text-custom-primary'>결제 금액</span>
                  <span className='font-bold text-gray-500'>{`${formatCurrency(paymentAmount)} 원`}</span>
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
