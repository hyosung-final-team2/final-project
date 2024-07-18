import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';

const SubscriptionProductItemEditable = ({
  productId,
  productImagePath,
  productDescription,
  productName,
  productPrice,
  productDiscount,
  quantity,
  productImageOriginalName,
  onDelete,
}) => {
  const discountRate = productDiscount / 100;
  const discountedUnitPrice = productPrice * (1 - discountRate);
  const ProductAmount = discountedUnitPrice * quantity;
  const roundedProductAmount = Math.round(ProductAmount);

  return (
    <div className='relative flex items-start justify-between px-4 mb-4'>
      <img src={productImagePath} alt={productImageOriginalName} className='object-cover w-24 h-24 mr-4 rounded-md' />
      <div className='flex items-start flex-grow'>
        <div>
          <div className='flex flex-col'>
            <h3 className='font-semibold'>{productDescription}</h3>
            <div className='flex gap-1 text-sm text-gray-500'>
              <p>{productName}</p>
              <span>/</span>
              <p>{`${productPrice.toLocaleString()} 원`}</p>
              <span>/</span>
              <p>{`${quantity} 개`}</p>
            </div>
          </div>
          <div className='flex items-start justify-between mt-2'>
            <p className='text-lg font-bold'>{`${roundedProductAmount.toLocaleString()} 원`}</p>
            {productDiscount > 0 && <span className='text-sm text-red-500'>{`${productDiscount}% 할인`}</span>}
          </div>
        </div>
      </div>
      <button onClick={() => onDelete(productId)} className='text-red-500 hover:text-red-700'>
        <XMarkIcon className='w-5' />
      </button>
    </div>
  );
};

export default SubscriptionProductItemEditable;
