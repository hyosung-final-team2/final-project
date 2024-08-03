import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import { Checkbox } from 'flowbite-react';
import { useEffect, useState } from 'react';
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
  stockQuantity,
  productImageOriginalName,
  orderOption,
  isSelected,
  onSelect,
  onQuantityChange,
  onDelete,
}) => {
  const [showAdjustmentMessage, setShowAdjustmentMessage] = useState(false);
  const discountedPrice = Math.round((productPrice * (1 - productDiscount / 100)) / 10) * 10 * quantity;
  const safeStockQuantity = stockQuantity ?? 0;
  const isOutOfStock = safeStockQuantity === 0;
  const isOverStock = quantity > safeStockQuantity;

  useEffect(() => {
    if (isOverStock && !isOutOfStock) {
      onQuantityChange(cartProductId, safeStockQuantity);
      setTimeout(() => {
        setShowAdjustmentMessage(true);
      }, 500);
    } else {
      setShowAdjustmentMessage(false);
    }
  }, [isOverStock, isOutOfStock, safeStockQuantity, cartProductId, onQuantityChange]);

  return (
    <div className={`flex items-center justify-between px-4 mb-4 ${isOutOfStock ? 'opacity-50' : ''}`}>
      <Checkbox color='purple' checked={isSelected} onChange={e => onSelect(e.target.checked)} className='self-start mr-2' disabled={isOutOfStock} />
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
            <QuantityButton
              initialQuantity={Math.min(quantity, safeStockQuantity)}
              onQuantityChange={onQuantityChange}
              cartProductId={cartProductId}
              maxQuantity={safeStockQuantity}
              disabled={isOutOfStock}
            />
          </div>
          {isOutOfStock ? (
            <p className='mt-2 text-red-500'>품절되었습니다</p>
          ) : (
            showAdjustmentMessage && (
              <p className='mt-2 text-red-500'>
                재고가 부족하여 수량이 조정되었습니다
                <br />
                {safeStockQuantity}개 남음
              </p>
            )
          )}
        </div>
        <XMarkIcon className='w-5 ml-2 cursor-pointer' onClick={() => onDelete(cartProductId)} />
      </div>
    </div>
  );
};

export default ProductItemEditable;
