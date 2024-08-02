import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon';
import Subscription from '../../../../assets/images/subscription.svg';
import ProductItemEditable from '../../common/productItem/ProductItemEditable';
import { getCycleText } from '../cycleContent';

const CartSubscriptionOrder = ({ regularOrderProducts, selectedItems, onSelectProduct, onQuantityChange, onDelete, onSubscriptionPeriodSelect }) => {
  const filteredProducts = regularOrderProducts.filter(product => product.orderOption === 'SUBSCRIPTION');

  if (filteredProducts.length === 0) return null;

  const isAnySubscriptionSelected = selectedItems.some(item => filteredProducts.some(product => product.cartProductId === item.cartProductId));

  // 정기 구독 상품의 첫번째 부분 - intervalDays 가져오기
  const selectedSubscriptionItem = selectedItems.find(item => filteredProducts.some(product => product.cartProductId === item.cartProductId));
  const intervalDays = selectedSubscriptionItem?.intervalDays || 0;

  return (
    <div className='flex flex-col w-full gap-3 bg-white'>
      <div className='flex justify-between px-4 pb-2 border-b'>
        <div className='flex items-center'>
          <Subscription className='w-5 mr-2' />
          <h2 className='text-lg font-semibold'>정기배송</h2>
          {intervalDays > 0 && <span className='ml-2 text-sm text-gray-600'>({getCycleText(intervalDays)})</span>}
        </div>
        {isAnySubscriptionSelected && (
          <div className='flex items-center gap-1 font-bold cursor-pointer text-main' onClick={onSubscriptionPeriodSelect}>
            <CalendarDaysIcon className='w-5' />
            <span>{intervalDays > 0 ? '주기 변경' : '주기 선택하기'}</span>
          </div>
        )}
      </div>
      <div className='flex flex-col gap-5 pt-2'>
        {filteredProducts.map(product => (
          <ProductItemEditable
            key={product.cartProductId}
            {...product}
            isSelected={selectedItems.some(item => item.cartProductId === product.cartProductId)}
            onSelect={checked => onSelectProduct(product, checked)}
            onQuantityChange={onQuantityChange}
            onDelete={() => onDelete(product.cartProductId)}
          />
        ))}
      </div>
    </div>
  );
};

export default CartSubscriptionOrder;
