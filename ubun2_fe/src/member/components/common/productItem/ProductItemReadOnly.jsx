const ProductItemReadOnly = ({
  productImagePath,
  productDescription,
  productName,
  productPrice,
  productDiscount,
  quantity,
  productImageOriginalName,
  isComplete = false,
}) => {
  const discountRate = productDiscount / 100;
  const discountedUnitPrice = productPrice * (1 - discountRate);
  const ProductAmount = discountedUnitPrice * quantity;
  const roundedProductAmount = Math.round(ProductAmount);

  return (
    <div className='flex items-start justify-between px-4 mb-4'>
      <img src={productImagePath} alt={productImageOriginalName} className='object-cover w-24 h-24 mr-4 rounded-md' />
      <div className='flex items-start flex-grow'>
        <div className='flex-grow'>
          <div className='flex flex-col gap-1'>
            <p className='mb-1 text-sm font-bold'>{productDescription}</p>
            <div className='flex gap-2 text-sm text-gray-500'>
              <p>{productName}</p>
              <span>/</span>
              <p>{`${productPrice} 원`}</p>
              <span>/</span>
              <p>{`${quantity} 개`}</p>
            </div>
            <div className='flex items-end gap-3'>
              <p className='font-bold'>{`${roundedProductAmount.toLocaleString()} 원`}</p>
              {productDiscount > 0 ? <span className='text-red-500'>{`${productDiscount}% 할인`}</span> : ''}
            </div>
            {isComplete && <p className='text-sm text-blue-600'>결제완료</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItemReadOnly;
