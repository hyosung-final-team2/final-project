import { Card, Checkbox } from 'flowbite-react';
import useOrderItemsStore from '../../../store/order/orderItemStore';
import cardCustomTheme from './CartCardCustom';
import CartSingleOrder from './CartSingleOrder';
import CartSubscriptionOrder from './CartSubscriptionOrder';

const CartStore = ({ store, onSubscriptionPeriodSelect, onDeleteProduct }) => {
  const { isStoreAllSelected, handleSelectAllStore, handleSelectProduct, updateProductQuantity, selectedItems } = useOrderItemsStore(state => ({
    isStoreAllSelected: state.isStoreAllSelected,
    handleSelectAllStore: state.handleSelectAllStore,
    handleSelectProduct: state.handleSelectProduct,
    updateProductQuantity: state.updateProductQuantity,
    selectedItems: state.selectedItems,
  }));

  const isAllSelected = isStoreAllSelected(store.customerId);
  const storeSelectedItems = selectedItems.find(s => s.customerId === store.customerId);

  return (
    <Card className='m-2 mb-2 bg-white' theme={cardCustomTheme}>
      <div className='flex items-center w-full gap-3 px-4'>
        <Checkbox color='purple' checked={isAllSelected} onChange={e => handleSelectAllStore(store.customerId, e.target.checked)} />
        <h2 className='pb-2 text-xl font-semibold text-main'>{store.businessName}</h2>
      </div>
      <div className='flex flex-col w-full gap-8'>
        <CartSingleOrder
          singleOrderProducts={store.cartProducts.filter(product => product.orderOption === 'SINGLE')}
          selectedItems={storeSelectedItems?.cartProducts || []}
          onSelectProduct={(product, checked) => handleSelectProduct(store.customerId, product, checked)}
          onQuantityChange={(cartProductId, newQuantity) => updateProductQuantity(store.customerId, cartProductId, newQuantity)}
          onDelete={cartProductId => onDeleteProduct(store.customerId, cartProductId)}
        />
        <CartSubscriptionOrder
          regularOrderProducts={store.cartProducts.filter(product => product.orderOption === 'SUBSCRIPTION')}
          selectedItems={storeSelectedItems?.cartProducts || []}
          onSelectProduct={(product, checked) => handleSelectProduct(store.customerId, product, checked)}
          onQuantityChange={(cartProductId, newQuantity) => updateProductQuantity(store.customerId, cartProductId, newQuantity)}
          onDelete={cartProductId => onDeleteProduct(store.customerId, cartProductId)}
          onSubscriptionPeriodSelect={() => onSubscriptionPeriodSelect(store.customerId)}
        />
      </div>
    </Card>
  );
};

export default CartStore;
