const formatPrice = price => {
  return typeof price === 'number' ? price.toLocaleString() : '0';
};

const paymentCancel = ['DENIED', 'REJECTED'];

const OrderItemList = ({ productImagePath, productName, productImageOriginalName, totalPrice, orderStatus }) => {
  console.log(orderStatus);
  return (
    <div className='flex items-center justify-between px-4 mb-6'>
      <img src={productImagePath} alt={productImageOriginalName} className='object-cover w-24 h-24 mr-4 rounded-md' />
      <div className='flex items-start flex-grow'>
        <div className='flex-grow'>
          <div className='flex flex-col gap-1'>
            <p className='mb-1 text-sm font-bold'>{productName}</p>
            <div className='flex items-end gap-3'>
              <p className='font-bold'>{`총 ${formatPrice(totalPrice)} 원`}</p>
            </div>
            {paymentCancel.includes(orderStatus) ? <p className='text-sm text-red-600'>결제취소</p> : <p className='text-sm text-blue-600'>결제완료</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemList;
