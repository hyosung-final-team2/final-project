import OrderStatusTextBadge from '../badge/OrderStatusTextBadge';

const ProductItemReadOnly = ({
  productImagePath,
  productDescription,
  productName,
  price,
  productPrice,
  discount,
  productDiscount,
  quantity,
  productImageOriginalName,
  totalPrice,
  isComplete = false,
  orderProductStatus,
}) => {
  const finalPrice = price || productPrice || 0;
  const finalDiscount = discount || productDiscount || 0;
  const finalTotalPrice = totalPrice || finalPrice * quantity || 0;

  const formatPrice = price => {
    return typeof price === 'number' ? price?.toLocaleString() : '0';
  };

  return (
    <div className='flex items-center justify-between px-4 mb-3'>
      <img src={productImagePath} alt={productImageOriginalName} className='object-cover mr-4 rounded-md w-28 h-28' />
      <div className='flex items-start flex-grow'>
        <div className='flex-grow'>
          <div className='flex flex-col gap-1'>
            <div className='flex justify-between'>
              <p className='mb-1 text-sm font-bold'>{productName}</p>
              {isComplete && <p className='text-sm text-blue-600'>결제완료</p>}
              {orderProductStatus && <div className='text-xs'>{<OrderStatusTextBadge status={orderProductStatus} />}</div>}
            </div>
            <p>{productDescription}</p>
            <div className='flex gap-2 text-sm text-gray-500'>
              <p>{`${formatPrice(finalPrice)} 원`}</p>
              <span>/</span>
              <p>{`${quantity} 개`}</p>
            </div>
            <div className='flex items-center gap-3'>
              <p className='font-bold'>{`${formatPrice(finalTotalPrice)} 원`}</p>
              {finalDiscount > 0 ? <span className='text-red-500'>{`${finalDiscount}% 할인`}</span> : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItemReadOnly;
