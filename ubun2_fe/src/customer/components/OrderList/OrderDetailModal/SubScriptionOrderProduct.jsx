import { useState } from 'react';
import { List, Select } from 'flowbite-react';
import StatusBadge from '../../common/Badge/StatusBadge';
import { ArrowLongRightIcon } from '@heroicons/react/16/solid';

const SubscriptionOrderProduct = ({ subscription, orderProductList }) => {
  const cycleArr = Array(subscription.cycleNumber)
    .fill()
    .map((v, i) => i + 1);
  const [selectedCycle, setSelectedCycle] = useState(subscription.cycleNumber);

  const handleCycleChange = event => {
    setSelectedCycle(Number(event.target.value));
  };

  return (
    <div className='p-3'>
      <div className='flex items-center justify-between mb-3 text-main'>
        <h3 className='text-xl font-bold'>{subscription.cycleNumber}회차 정기배송 상품 목록</h3>
        <div className='font-bold text-md text-custom-primary'>
          <h5>{`${subscription.cycleNumber} 회`}</h5>
          <h5>{`${subscription.createdAt}`}</h5>
        </div>
      </div>

      <div className='mb-4'>
        <label htmlFor='cycle-select' className='block mb-2 text-sm font-medium text-gray-500'>
          * 정기주문 회차
        </label>
        <Select id='cycle-select' className='w-40' value={selectedCycle} onChange={handleCycleChange}>
          {cycleArr.map(cycleNum => (
            <option key={cycleNum} value={cycleNum}>
              {cycleNum}회차
            </option>
          ))}
        </Select>
      </div>

      <List unstyled className='px-8 py-6 divide-y divide-gray-200 rounded-md dark:divide-gray-700 bg-custom-alert-bg-gray'>
        {orderProductList.map(orderProduct => (
          <List.Item key={orderProduct.orderProductId} className='flex items-start gap-6 py-4'>
            <div className='w-2/12 relativecd'>
              <div className='relative' style={{ paddingBottom: '100%' }}>
                <img src={orderProduct.productImagePath} alt='상품이미지' className='absolute inset-0 object-cover w-full h-full rounded-md' />
              </div>
            </div>
            <div className='flex flex-col flex-1 min-w-0 gap-2 ml-4'>
              <div className='flex gap-3'>
                <span className='text-xs'>
                  {orderProduct.orderProductStatus === 'APPROVED' ? (
                    <StatusBadge bgColor='bg-badge-green' txtColor='text-badge-green' badgeText='승인' />
                  ) : (
                    <StatusBadge bgColor='bg-badge-orange' txtColor='text-badge-orange' badgeText='변경' />
                  )}
                </span>
                <p className='text-lg font-bold text-gray-900 dark:text-white'>{orderProduct.productDescription}</p>
              </div>
              <div className='flex gap-3'>
                <div className='flex gap-2'>
                  <span className='text-sm text-gray-500 dark:text-gray-400'>{orderProduct.productName}</span>
                  <span>|</span>
                  <span className='text-sm text-gray-500 dark:text-gray-400'>{orderProduct.quantity} 개</span>
                </div>
                {orderProduct.orderProductStatus === 'MODIFIED' && (
                  <div className='flex items-center gap-2 text-sm text-badge-orange'>
                    <ArrowLongRightIcon className='inline w-4 h-4' />
                    <span className='dark:text-gray-400'>{`${orderProduct.productName}`}</span>
                    <span>|</span>
                    <span className='dark:text-gray-400'>{orderProduct.quantity} 개</span>
                  </div>
                )}
              </div>
              <p className='text-lg font-bold text-gray-900 dark:text-white'>{orderProduct.price} 원</p>
            </div>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default SubscriptionOrderProduct;
