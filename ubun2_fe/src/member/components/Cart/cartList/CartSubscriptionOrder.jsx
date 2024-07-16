import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon';
import Subscription from '../../../../assets/images/subscription.svg';
import ProductItemEditable from '../../common/productItem/ProductItemEditable';

const CartSubscriptionOrder = ({ regularOrderProducts, selectedItems, onSelectProduct, onQuantityChange, onDelete, onSubscriptionPeriodSelect }) => {
  return (
    <div className='flex flex-col w-full gap-3 bg-white'>
      <div className='flex justify-between px-4 pb-2 border-b'>
        <div className='flex items-center'>
          <Subscription className='w-5 mr-2' />
          <h2 className='text-lg font-semibold'>정기배송</h2>
        </div>
        <div className='flex items-center gap-1 font-bold text-main' onClick={onSubscriptionPeriodSelect}>
          <CalendarDaysIcon className='w-5' />
          <span>주기 선택하기</span>
        </div>
      </div>
      <div className='flex flex-col gap-5'>
        {regularOrderProducts.map(product => (
          <ProductItemEditable
            key={product.productId}
            {...product}
            isSelected={selectedItems[product.productId]}
            onSelect={checked => onSelectProduct(product.productId, checked)}
            onQuantityChange={newQuantity => onQuantityChange(product.productId, newQuantity)}
            onDelete={() => onDelete(product.productId)}
          />
        ))}
      </div>
    </div>
  );
};

export default CartSubscriptionOrder;
