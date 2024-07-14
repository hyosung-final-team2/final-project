import { List } from 'flowbite-react';
import StatusBadge from '../../common/Badge/StatusBadge';
import { formatCurrency } from '../../../utils/currencyFormat';

const BADGE_STYLES = {
  APPROVED: { bgColor: 'bg-badge-green', txtColor: 'text-badge-green', text: '승인' },
  PENDING: { bgColor: 'bg-badge-orange', txtColor: 'text-badge-orange', text: '대기' },
  REJECTED: { bgColor: 'bg-badge-red', txtColor: 'text-badge-red', text: '거절' },
  DENIED: { bgColor: 'bg-badge-red', txtColor: 'text-badge-red', text: '취소' },
};

const renderStatusBadge = status => {
  const { bgColor, txtColor, text } = BADGE_STYLES[status];
  return <StatusBadge bgColor={bgColor} txtColor={txtColor} badgeText={text} />;
};

const SingleOrderProduct = ({ orderInfo }) => {
  const getPriceClassName = discount => {
    return discount > 0 ? 'line-through text-red-500 dark:text-red-500' : 'text-gray-900 dark:text-white';
  };

  return (
    <div className='p-3'>
      <div className='flex items-center justify-between mb-3'>
        <h3 className='text-xl font-bold'>상품목록</h3>
      </div>
      <List unstyled className='px-8 py-6 divide-y divide-gray-200 rounded-md dark:divide-gray-700 bg-custom-alert-bg-gray'>
        {orderInfo.orderProducts?.map(orderProduct => (
          <List.Item key={orderProduct.productId} className='flex items-start gap-6 py-4'>
            <div className='w-2/12 relativecd'>
              <div className='relative' style={{ paddingBottom: '100%' }}>
                <img
                  src={orderProduct.productImagePath || '/image.jpg'}
                  alt={orderProduct.productImageOriginalName}
                  className='absolute inset-0 object-cover w-full h-full rounded-md'
                />
              </div>
            </div>
            <div className='flex flex-col flex-1 min-w-0 gap-2 ml-4'>
              <div className='flex gap-3'>
                <span className='text-xs'>{renderStatusBadge(orderProduct.orderProductStatus)}</span>
                <p className='text-lg font-bold text-gray-900 dark:text-white'>{orderProduct.productDescription}</p>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-sm text-gray-500 dark:text-gray-400'>{orderProduct.productName}</span>
                <span>|</span>
                <span className='text-sm text-gray-500 dark:text-gray-400'>{`${formatCurrency(orderProduct.price)} 원`}</span>
                <span>|</span>
                <span className='text-sm text-gray-500 dark:text-gray-400'>{`${orderProduct.quantity} 개`}</span>
              </div>
              <div className='flex gap-3'>
                <p className='text-lg font-bold text-gray-900 dark:text-white'>{`${formatCurrency(
                  Math.round(orderProduct.price * orderProduct.quantity * (1 - orderProduct.discount / 100))
                )} 원`}</p>
                <div className='flex items-center gap-3'>
                  <p className={`text-sm font-bold ${getPriceClassName(orderProduct.discount)}`}>{`${formatCurrency(
                    orderProduct.price * orderProduct.quantity
                  )} 원`}</p>
                  {orderProduct.discount > 0 && <span className='text-sm text-red-500 dark:text-red-500'>{`${orderProduct.discount} % 할인`}</span>}
                </div>
              </div>
            </div>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default SingleOrderProduct;
