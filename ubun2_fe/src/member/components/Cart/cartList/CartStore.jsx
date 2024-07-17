import { Card, Checkbox } from 'flowbite-react';
import useOrderItemsStore from '../../../store/order/orderItemStore';
import cardCustomTheme from './CartCardCustom';
import CartSingleOrder from './CartSingleOrder';
import CartSubscriptionOrder from './CartSubscriptionOrder';

const CartStore = ({ store }) => {
  const isAllSelected = useOrderItemsStore(state => state.isStoreAllSelected(store.customerId));
  const handleSelectAllStore = useOrderItemsStore(state => state.handleSelectAllStore);
  const handleSelectProduct = useOrderItemsStore(state => state.handleSelectProduct);
  const updateProductQuantity = useOrderItemsStore(state => state.updateProductQuantity);
  const handleDeleteProduct = useOrderItemsStore(state => state.handleDeleteProduct);
  const selectedItems = useOrderItemsStore(state => state.selectedItems.itemContent.find(s => s.customerId === store.customerId));

  return (
    <Card className='m-2 mb-2 bg-white' theme={cardCustomTheme}>
      <div className='flex items-center w-full gap-3 px-4'>
        <Checkbox color='purple' checked={isAllSelected} onChange={e => handleSelectAllStore(store.customerId, e.target.checked)} />
        <h2 className='pb-2 text-xl font-semibold text-main'>{store.businessName}</h2>
      </div>
      <div className='flex flex-col w-full gap-8'>
        {store.singleOrderProducts && store.singleOrderProducts.length > 0 && (
          <CartSingleOrder
            singleOrderProducts={store.singleOrderProducts}
            selectedItems={selectedItems?.singleOrderProducts || []}
            onSelectProduct={(product, checked) => handleSelectProduct(store.customerId, product, 'singleOrderProducts', checked)}
            onQuantityChange={(productId, newQuantity) => updateProductQuantity(store.customerId, productId, 'singleOrderProducts', newQuantity)}
            onDelete={productId => handleDeleteProduct(store.customerId, productId, 'singleOrderProducts')}
          />
        )}
        {store.regularOrderProducts && store.regularOrderProducts.length > 0 && (
          <CartSubscriptionOrder
            regularOrderProducts={store.regularOrderProducts}
            selectedItems={selectedItems?.regularOrderProducts || []}
            onSelectProduct={(product, checked) => handleSelectProduct(store.customerId, product, 'regularOrderProducts', checked)}
            onQuantityChange={(productId, newQuantity) => updateProductQuantity(store.customerId, productId, 'regularOrderProducts', newQuantity)}
            onDelete={productId => handleDeleteProduct(store.customerId, productId, 'regularOrderProducts')}
          />
        )}
      </div>
    </Card>
  );
};

export default CartStore;
