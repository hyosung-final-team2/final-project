import { List, Select } from 'flowbite-react';
import { useMemo } from 'react';
import { formatCurrency } from '../../../utils/currencyFormat';
import StatusBadge from '../../common/Badge/StatusBadge';

const SubscriptionOrderProduct = ({ orderInfo, selectedCycle, onCycleChange }) => {
  const filteredProducts = useMemo(() => {
    return orderInfo?.subscriptionOrderProducts.filter(product => product.cycleNumber === selectedCycle);
  }, [selectedCycle, orderInfo?.subscriptionOrderProducts]);

  const getPriceClassName = (discount, orderStatus) => {
    if (orderStatus === 'MODIFIED') return `text-badge-orange`;
    if (discount > 0) return `line-through text-red-500 dark:text-red-500`;
    return `text-gray-900 dark:text-white`;
  };

  return (
    <div className='p-3'>
      <div className='flex items-center justify-between mb-3 text-main'>
        <h3 className='text-2xl font-bold'>{selectedCycle}회차 정기배송 상품 목록</h3>

        {orderInfo?.orderStatus !== 'PENDING' && (
          <div className='mb-4'>
            <label htmlFor='cycle-select' className='block mb-2 text-sm font-medium text-gray-500'>
              * 정기주문 회차
            </label>
            <Select value={selectedCycle} onChange={e => onCycleChange(Number(e.target.value))} className='mt-2 w-fit'>
              {Array.from({ length: orderInfo?.latestCycleNumber }, (_, i) => i + 1).map(cycleNum => (
                <option key={cycleNum} value={cycleNum}>
                  {cycleNum} 회차
                </option>
              ))}
            </Select>
          </div>
        )}
      </div>

      <List unstyled className='px-8 py-6 divide-y divide-gray-200 rounded-md dark:divide-gray-700 bg-custom-alert-bg-gray'>
        {filteredProducts?.map(product => (
          <List.Item key={product.productId} className='flex items-center gap-6 py-4'>
            <div className='w-32 h-32'>
              <img src={product.productImagePath || '/image.jpg'} alt={product.productImageOriginalName} className='w-full h-full rounded-md' />
            </div>
            <div className='flex flex-col flex-1 min-w-0 gap-2 ml-4'>
              <div className='flex gap-3'>
                <span className='text-xs'>
                  <StatusBadge status={product.orderProductStatus} />
                </span>
                <p className='text-lg font-bold text-gray-900 dark:text-white'>{product.productName}</p>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-sm text-gray-500 dark:text-gray-400'>{product.productDescription}</span>
                <span>|</span>
                <span className='text-sm text-gray-500 dark:text-gray-400'>{`${formatCurrency(product.price)} 원`}</span>
                <span>|</span>
                <span className='text-sm text-gray-500 dark:text-gray-400'>{`${product.quantity} 개`}</span>
              </div>
              <div className='flex gap-3'>
                <p className='text-lg font-bold text-gray-900 dark:text-white'>{`${formatCurrency(product.totalPrice)} 원`}</p>
                <div className='flex items-center gap-3'>
                  <p className={`text-sm font-bold ${getPriceClassName(product.discount, product.orderProductStatus)}`}>{`${formatCurrency(
                    product.price * product.quantity
                  )} 원`}</p>
                  {product.discount > 0 && <span className='text-sm text-red-500 dark:text-red-500'>{`${product.discount} % 할인`}</span>}
                </div>
              </div>
            </div>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default SubscriptionOrderProduct;
