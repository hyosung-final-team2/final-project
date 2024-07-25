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
  const discountRate = productDiscount / 100;
  const discountedUnitPrice = productPrice * (1 - discountRate);
  const ProductAmount = discountedUnitPrice * quantity;
  const roundedProductAmount = Math.round(ProductAmount);

  return (
    <div className='flex items-start justify-between px-4 mb-4'>
      <Checkbox color='purple' checked={isSelected} onChange={e => onSelect(e.target.checked)} className='self-start mr-2' />
      <img src={productImagePath} alt={productImageOriginalName} className='object-cover w-24 h-24 mr-4 rounded-md' />
      <div className='flex items-start flex-grow'>
        <div className='flex-grow'>
          <div className='flex flex-col'>
            <h3 className='font-semibold'>{productDescription}</h3>
            <div className='flex gap-3'>
              <p>{productName}</p>
              <span>/</span>
              <p>{`${quantity} 개`}</p>
            </div>
          </div>
          <div className='flex items-center justify-between mt-2'>
            <QuantityButton initialQuantity={quantity} onQuantityChange={onQuantityChange} cartProductId={cartProductId} />
            <p className='text-lg font-bold'>{`${roundedProductAmount?.toLocaleString()} 원`}</p>
          </div>
        </div>
        <XMarkIcon className='w-5 ml-2 cursor-pointer' onClick={() => onDelete(cartProductId)} />
      </div>
    </div>
  );
};

export default ProductItemEditable;
