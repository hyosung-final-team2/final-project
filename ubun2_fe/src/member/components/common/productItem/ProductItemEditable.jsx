import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import { Checkbox } from 'flowbite-react';
import QuantityButton from '../button/QuantityButton';

const ProductItemEditable = ({
  productId,
  cartProductId,
  productImagePath,
  productDescription,
  productName,
  productPrice,
  productDiscount,
  quantity,
  productImageOriginalName,
  orderOption,
  isSelected,
  onSelect,
  onQuantityChange,
  onDelete,
}) => {
  const discountedPrice = Math.round((productPrice * (1 - productDiscount / 100)) / 10) * 10 * quantity;

  return (
    <div className='flex items-center justify-between px-4 mb-4'>
      <Checkbox color='purple' checked={isSelected} onChange={e => onSelect(e.target.checked)} className='self-start mr-2' />
      <img src={productImagePath} alt={productImageOriginalName} className='object-cover mr-4 rounded-md w-28 h-28' />
      <div className='flex items-start flex-grow'>
        <div className='flex-grow'>
          <div className='flex flex-col'>
            <h3 className='font-semibold'>{productName}</h3>
            <div className='flex gap-3'>
              <p>{productDescription}</p>
            </div>
            <p className='font-bold'>
              <span className='text-red-500 mr-0.5'>{productDiscount}%</span> {discountedPrice.toLocaleString()}원
            </p>
          </div>
          <div className='flex items-center justify-between mt-2'>
            <QuantityButton initialQuantity={quantity} onQuantityChange={onQuantityChange} cartProductId={cartProductId} />
          </div>
        </div>
        <XMarkIcon className='w-5 ml-2 cursor-pointer' onClick={() => onDelete(cartProductId)} />
      </div>
    </div>
  );
};

export default ProductItemEditable;
