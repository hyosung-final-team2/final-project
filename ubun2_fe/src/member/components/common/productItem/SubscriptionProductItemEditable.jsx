import { Checkbox } from 'flowbite-react';

const SubscriptionProductItemEditable = ({
  productId,
  productImagePath,
  productDescription,
  productName,
  price,
  discount,
  quantity,
  productImageOriginalName,
  isSelected,
  onSelect,
}) => {
  const discountedPrice = Math.round((price * (1 - discount / 100)) / 10) * 10;
  const totalPrice = discountedPrice * quantity;

  return (
    <div className='relative flex items-start justify-between px-4 mb-4'>
      <Checkbox checked={isSelected} onChange={() => onSelect(productId)} className='self-start mr-2' color={'purple'} />
      <img src={productImagePath} alt={productImageOriginalName} className='object-cover w-24 h-24 mr-4 rounded-md' />
      <div className='flex items-start flex-grow'>
        <div>
          <div className='flex flex-col'>
            <h3 className='font-semibold'>{productDescription}</h3>
            <div className='flex gap-1 text-sm text-gray-500'>
              <p>{productName}</p>
              <span>/</span>
              <p>{`${price.toLocaleString()} 원`}</p>
              <span>/</span>
              <p>{`${quantity} 개`}</p>
            </div>
          </div>
          <div className='flex items-start justify-between mt-2'>
            <p className='text-lg font-bold'>{`${totalPrice.toLocaleString()} 원`}</p>
            {discount > 0 && <span className='text-sm text-red-500'>{`${discount}% 할인`}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionProductItemEditable;
