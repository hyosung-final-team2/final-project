import { Card, Checkbox } from 'flowbite-react';
import { useUpdateCart } from '../../../api/Cart/queris';
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

  const updateCartMutation = useUpdateCart();

  const handleQuantityChange = async (cartProductId, newQuantity) => {
    const customerId = store.customerId;
    const productToUpdate = store.cartProducts.find(product => product.cartProductId === cartProductId);

    if (productToUpdate && newQuantity <= productToUpdate.stockQuantity) {
      updateProductQuantity(customerId, cartProductId, newQuantity);

      try {
        await updateCartMutation.mutateAsync([
          {
            cartId: productToUpdate.cartId,
            customerId: customerId,
            cartProducts: [{ cartProductId: productToUpdate.cartProductId, quantity: newQuantity }],
          },
        ]);
      } catch (error) {
        console.error('Failed to update product quantity:', error);
      }
    } else {
      console.error('Invalid quantity or product not found');
    }
  };

  const storeSelectedItems = selectedItems.filter(s => s.customerId === store.customerId);
  const selectableProducts = store.cartProducts.filter(product => product.stockQuantity > 0);
  const allProductsSelected =
    selectableProducts.length > 0 &&
    selectableProducts.every(product => storeSelectedItems.some(s => s.cartProducts.some(p => p.cartProductId === product.cartProductId)));

  const handleSelectAll = checked => {
    handleSelectAllStore(store.customerId, checked, selectableProducts);
  };

  return (
    <Card className='my-4 bg-white' theme={cardCustomTheme}>
      <div className='flex items-center w-full gap-3 px-4'>
        <Checkbox color='purple' checked={allProductsSelected} onChange={e => handleSelectAll(e.target.checked)} disabled={selectableProducts.length === 0} />
        <h2 className='text-xl font-semibold text-main'>{store.businessName}</h2>
      </div>
      <div className='flex flex-col w-full gap-8'>
        <CartSingleOrder
          singleOrderProducts={store.cartProducts.filter(product => product.orderOption === 'SINGLE')}
          selectedItems={storeSelectedItems.flatMap(s => s.cartProducts)}
          onSelectProduct={(product, checked) => handleSelectProduct(store.customerId, product, checked)}
          onQuantityChange={handleQuantityChange}
          onDelete={cartProductId => onDeleteProduct(store.customerId, cartProductId)}
        />
        <CartSubscriptionOrder
          regularOrderProducts={store.cartProducts.filter(product => product.orderOption === 'SUBSCRIPTION')}
          selectedItems={storeSelectedItems.flatMap(s => s.cartProducts)}
          onSelectProduct={(product, checked) => handleSelectProduct(store.customerId, product, checked)}
          onQuantityChange={handleQuantityChange}
          onDelete={cartProductId => onDeleteProduct(store.customerId, cartProductId)}
          onSubscriptionPeriodSelect={() => onSubscriptionPeriodSelect(store.customerId)}
          intervalDays={storeSelectedItems.find(s => s.intervalDays !== undefined)?.intervalDays}
        />
      </div>
    </Card>
  );
};

export default CartStore;
