import { Checkbox } from 'flowbite-react';
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
    <div className='flex items-center justify-between px-4 mb-4'>
      <Checkbox checked={isSelected} onChange={() => onSelect(subscriptionOrderProductId)} className='self-start mr-2' color={'purple'} disabled={disabled} />
      <img src={productImagePath} alt={productImageOriginalName} className='object-cover mr-4 rounded-md w-28 h-28' />
      <div className='flex items-start flex-grow'>
        <div className='flex-grow'>
          <div className='flex flex-col gap-1'>
            <div className='flex justify-between'>
              <p className='mb-1 text-sm font-bold'>{productName}</p>
              <div className='text-xs'>{orderProductStatus && <OrderStatusTextBadge status={orderProductStatus} />}</div>
            </div>
            <p>{productDescription}</p>
            <div className='flex gap-2 text-sm text-gray-500'>
              <p>{`${price?.toLocaleString()} 원`}</p>
              <span>/</span>
              <p>{`${quantity} 개`}</p>
            </div>
          </div>
          <div className='flex items-end gap-3'>
            <p className='font-bold'>{`${totalPrice?.toLocaleString()} 원`}</p>
            {discount > 0 && <span className='text-red-500'>{`${discount}% 할인`}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionProductItemEditable;
