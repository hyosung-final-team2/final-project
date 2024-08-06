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
    <div className='flex items-start justify-between px-4 mb-3'>
      <img src={productImagePath} alt={productImageOriginalName} className='object-cover w-24 h-24 mr-4 rounded-md' />
      <div className='flex items-start flex-grow'>
        <div className='flex-grow'>
          <div className='flex flex-col gap-1'>
            <p className='mb-1 text-sm font-bold'>{productName}</p>
            <div className='flex gap-2 text-sm text-gray-500'>
              <p>{productDescription}</p>
              <span>/</span>
              <p>{`${formatPrice(finalPrice)} 원`}</p>
              <span>/</span>
              <p>{`${quantity} 개`}</p>
            </div>
            <div className='flex items-end gap-3'>
              <p className='font-bold'>{`${formatPrice(finalTotalPrice)} 원`}</p>
              {finalDiscount > 0 ? <span className='text-red-500'>{`${finalDiscount}% 할인`}</span> : ''}
            </div>
            {isComplete && <p className='text-sm text-blue-600'>결제완료</p>}
            <div className='text-xs'>{orderProductStatus && <OrderStatusTextBadge status={orderProductStatus} />}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItemReadOnly;
