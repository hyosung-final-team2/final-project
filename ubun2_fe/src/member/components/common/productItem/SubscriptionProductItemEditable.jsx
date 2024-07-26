import { Checkbox } from 'flowbite-react';
import OrderStatusBadge from '../badge/OrderStatusBadge';
import OrderStatusTextBadge from '../badge/OrderStatusTextBadge';

const SubscriptionProductItemEditable = ({
  subscriptionOrderProductId,
  productImagePath,
  productDescription,
  productName,
  price,
  discount,
  quantity,
  productImageOriginalName,
  isSelected,
  onSelect,
  orderProductStatus,
  disabled,
}) => {
  const discountedPrice = Math.round((price * (1 - discount / 100)) / 10) * 10;
  const totalPrice = discountedPrice * quantity;

  return (
    <div className='flex items-start justify-between mb-4'>
      <Checkbox checked={isSelected} onChange={() => onSelect(subscriptionOrderProductId)} className='self-start mr-2' color={'purple'} disabled={disabled} />
      <img src={productImagePath} alt={productImageOriginalName} className='object-cover w-24 h-24 mr-2 rounded-md' />
      <div className='flex items-start flex-grow'>
        <div className='flex-grow'>
          <div className='flex flex-col gap-1'>
            <p className='mb-1 text-sm font-bold'>{productDescription}</p>
            <div className='flex gap-2 text-sm text-gray-500'>
              <p>{productName}</p>
              <span>/</span>
              <p>{`${price?.toLocaleString()} 원`}</p>
              <span>/</span>
              <p>{`${quantity} 개`}</p>
            </div>
          </div>
          <div className='flex items-end gap-3'>
            <p className='font-bold'>{`${totalPrice?.toLocaleString()} 원`}</p>
            {discount > 0 && <span className='text-red-500'>{`${discount}% 할인`}</span>}
          </div>
          <div className='text-xs'>{orderProductStatus && <OrderStatusTextBadge status={orderProductStatus} />}</div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionProductItemEditable;
