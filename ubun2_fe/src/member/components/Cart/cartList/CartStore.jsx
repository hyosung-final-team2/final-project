import { Card } from 'flowbite-react';
import cardCustomTheme from './CartCardCustom';
import CartSingleOrder from './CartSingleOrder';
import CartSubscriptionOrder from './CartSubscriptionOrder';

const CartStore = ({ store, selectedItems, onSelectProduct, onQuantityChange, onDelete, onSubscriptionPeriodSelect }) => {
  return (
    <Card className='m-2 mb-2 bg-white' theme={cardCustomTheme}>
      <div className='flex items-center w-full px-6'>
        <h2 className='pb-2 text-xl font-semibold text-main'>{store.businessName}</h2>
      </div>
      <div className='flex flex-col w-full gap-8'>
        {store.singleOrderProducts && store.singleOrderProducts.length > 0 && (
          <CartSingleOrder
            singleOrderProducts={store.singleOrderProducts}
            selectedItems={selectedItems?.singleOrderProducts || {}}
            onSelectProduct={(productId, checked) => onSelectProduct(store.customerId, productId, 'singleOrderProducts', checked)}
            onQuantityChange={(productId, newQuantity) => onQuantityChange(store.customerId, productId, 'singleOrderProducts', newQuantity)}
            onDelete={productId => onDelete(store.customerId, productId, 'singleOrderProducts')}
          />
        )}
        {store.regularOrderProducts && store.regularOrderProducts.length > 0 && (
          <CartSubscriptionOrder
            regularOrderProducts={store.regularOrderProducts}
            selectedItems={selectedItems?.regularOrderProducts || {}}
            onSelectProduct={(productId, checked) => onSelectProduct(store.customerId, productId, 'regularOrderProducts', checked)}
            onQuantityChange={(productId, newQuantity) => onQuantityChange(store.customerId, productId, 'regularOrderProducts', newQuantity)}
            onDelete={productId => onDelete(store.customerId, productId, 'regularOrderProducts')}
            onSubscriptionPeriodSelect={() => onSubscriptionPeriodSelect(store.customerId)}
          />
        )}
      </div>
    </Card>
  );
};

export default CartStore;
