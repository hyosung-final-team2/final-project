import { Card, Checkbox } from 'flowbite-react';
import useOrderItemsStore from '../../../store/order/orderItemStore';
import cardCustomTheme from './CartCardCustom';
import CartSingleOrder from './CartSingleOrder';
import CartSubscriptionOrder from './CartSubscriptionOrder';
import { useUpdateCart } from '../../../api/Cart/queris'; // 추가

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
    updateProductQuantity(customerId, cartProductId, newQuantity);

    const productToUpdate = store.cartProducts.find(product => product.cartProductId === cartProductId);
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
  };

  const storeSelectedItems = selectedItems.filter(s => s.customerId === store.customerId);
  const allProductsSelected = store.cartProducts.every(product =>
    storeSelectedItems.some(s => s.cartProducts.some(p => p.cartProductId === product.cartProductId))
  );

  return (
    <Card className='my-4 bg-white' theme={cardCustomTheme}>
      <div className='flex items-center w-full gap-3 px-4'>
        <Checkbox color='purple' checked={allProductsSelected} onChange={e => handleSelectAllStore(store.customerId, e.target.checked)} />
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
