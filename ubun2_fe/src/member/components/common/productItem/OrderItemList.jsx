const formatPrice = price => {
  return typeof price === 'number' ? price?.toLocaleString() : '0';
};

const OrderItemList = ({ productImagePath, productName, productImageOriginalName, totalPrice, isComplete = false }) => {
  return (
    <div className='flex items-start justify-between px-4 mb-6'>
      <img src={productImagePath} alt={productImageOriginalName} className='object-cover w-24 h-24 mr-4 rounded-md' />
      <div className='flex items-start flex-grow'>
        <div className='flex-grow'>
          <div className='flex flex-col gap-1'>
            <p className='mb-1 text-sm font-bold'>{productName}</p>
            <div className='flex items-end gap-3'>
              <p className='font-bold'>{`${formatPrice(totalPrice)} 원`}</p>
            </div>
            {isComplete && <p className='text-sm text-blue-600'>결제완료</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemList;
