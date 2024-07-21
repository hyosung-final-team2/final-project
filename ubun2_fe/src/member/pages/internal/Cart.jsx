import ShoppingBagIcon from '@heroicons/react/20/solid/ShoppingBagIcon';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import cartImage from '../../../assets/images/png/cart.png';
import { useDeleteCart, useGetCarts } from '../../api/Cart/queris';
import { cycleContent } from '../../components/Cart/cartDummyData';
import CartStore from '../../components/Cart/cartList/CartStore';
import BottomButton from '../../components/common/button/BottomButton';
import PaymentSummaryPre from '../../components/common/paymentSummary/PaymentSummaryPre';
import SlideUpModal from '../../components/common/SlideUpModal';
import useModalStore from '../../store/modalStore';
import useOrderItemsStore from '../../store/order/orderItemStore';

const Cart = () => {
  const navigate = useNavigate();
  const [selectedStore, setSelectedStore] = useState(null);
  const { modalState, setModalState } = useModalStore();
  const location = useLocation();
  const [isOrderButtonDisabled, setIsOrderButtonDisabled] = useState(false);
  const [unsetSubscriptions, setUnsetSubscriptions] = useState([]);

  const {
    cartData,
    selectedItems,
    handleSelectProduct,
    updateProductQuantity,
    calculateTotals,
    handleSelectAllStore,
    setCartData,
    clearCart,
    removeProducts,
    removeStoreIfEmpty,
    getUpdatedCartData,
    setSubscriptionPeriod,
  } = useOrderItemsStore();

  const { data: fetchedCartData, isLoading, isError, refetch } = useGetCarts();
  const deleteCartMutation = useDeleteCart();
  const [totals, setTotals] = useState({ productAmount: 0, discount: 0, totalAmount: 0, selectedCount: 0 });

  useEffect(() => {
    refetch();
  }, [location, refetch]);

  useEffect(() => {
    if (fetchedCartData?.data?.data?.content) {
      const filteredData = fetchedCartData.data.data.content.filter(store => store.cartProducts.length > 0);
      setCartData(filteredData);
    }
  }, [fetchedCartData, setCartData]);

  useEffect(() => {
    setTotals(calculateTotals());
  }, [selectedItems, cartData, calculateTotals]);

  useEffect(() => {
    const unsetSubs = selectedItems.filter(store =>
      store.cartProducts.some(product => product.orderOption === 'SUBSCRIPTION' && (!store.intervalDays || store.intervalDays === 0))
    );
    setUnsetSubscriptions(unsetSubs);
    setIsOrderButtonDisabled(unsetSubs.length > 0);
  }, [selectedItems]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching cart data</div>;

  const handleSubscriptionPeriodSelect = storeId => {
    setSelectedStore(storeId);
    setModalState(true);
  };

  const handlePeriodSelection = period => {
    setSubscriptionPeriod(selectedStore, period);
    setModalState(false);
    console.log(`Store ${selectedStore}의 구독 주기가 ${period}로 설정되었습니다.`);
  };

  const handleOrder = () => {
    if (isOrderButtonDisabled) {
      alert('모든 정기 주문 상품의 배송 주기를 선택해주세요.');
      return;
    }

    const selectedOrderData = selectedItems
      .map(store => ({
        customerId: store.customerId,
        cartProducts: store.cartProducts.map(product => ({
          ...product,
          intervalDays: store.intervalDays || 0,
        })),
      }))
      .filter(store => store.cartProducts.length > 0);

    console.log('선택된 items들:', selectedOrderData);

    navigate('/member/app/order');
  };

  const handleDeleteProduct = async (customerId, cartProductId) => {
    const store = cartData.find(s => s.customerId === customerId);
    if (!store) return;

    const product = store.cartProducts.find(p => p.cartProductId === cartProductId);
    if (!product) return;

    const deleteData = [
      {
        cartId: product.cartId,
        customerId: store.customerId,
        cartProducts: [{ productId: product.productId }],
      },
    ];

    try {
      await deleteCartMutation.mutateAsync(deleteData);
      removeProducts([product.productId]);
      removeStoreIfEmpty(customerId);
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleDeleteSelected = async () => {
    const deleteData = selectedItems.map(store => ({
      customerId: store.customerId,
      cartId: store.cartProducts[0].cartId,
      cartProducts: store.cartProducts.map(product => ({ productId: product.productId })),
    }));

    if (deleteData.length === 0) return;

    try {
      await deleteCartMutation.mutateAsync(deleteData);
      const deletedProductIds = selectedItems.flatMap(store => store.cartProducts.map(product => product.productId));
      removeProducts(deletedProductIds);
      deleteData.forEach(store => removeStoreIfEmpty(store.customerId));
    } catch (error) {
      console.error('Failed to delete products:', error);
    }
  };

  return (
    <div className='h-full'>
      {cartData && cartData.length !== 0 && (
        <div className='flex items-center justify-between p-4 font-bold'>
          <span className='text-2xl text-main'>{'장바구니'}</span>
          <span onClick={handleDeleteSelected} className='underline cursor-pointer text-main'>
            선택 상품 삭제
          </span>
        </div>
      )}
      {selectedItems.length > 0 && (
        <div>
          <div className='w-full h-3 bg-gray-100'></div>
        </div>
      )}
      <div className='flex flex-col flex-1 w-full'>
        <div className='flex-1'>
          {cartData && cartData.length === 0 ? (
            <div className='flex flex-col items-center justify-center h-full'>
              <div style={{ width: '100%', aspectRatio: '1/1', position: 'relative' }}>
                <img src={cartImage} alt='Empty cart' />
                <h2 className='mb-10 text-3xl font-semibold font-bold text-center'>장바구니가 비었어요!</h2>
              </div>
            </div>
          ) : (
            cartData?.map(store => (
              <CartStore
                key={store.customerId}
                store={store}
                selectedItems={selectedItems.find(s => s.customerId === store.customerId)}
                onSelectProduct={handleSelectProduct}
                onQuantityChange={updateProductQuantity}
                onDeleteProduct={handleDeleteProduct}
                onSubscriptionPeriodSelect={handleSubscriptionPeriodSelect}
                onSelectAllStore={handleSelectAllStore}
              />
            ))
          )}

          {selectedItems.length > 0 && (
            <div>
              <div className='w-full h-3 bg-gray-100'></div>
              <PaymentSummaryPre productAmount={totals.productAmount} discount={totals.discount} totalAmount={totals.totalAmount} />
            </div>
          )}
        </div>
      </div>
      {selectedItems.length > 0 && (
        <div
          className='sticky bottom-0 left-0 right-0 flex flex-col w-full p-4 px-3 py-4'
          style={{ background: 'linear-gradient(to top, white, white 65%, transparent)' }}
        >
          {unsetSubscriptions.length > 0 && (
            <div className='mb-2 text-red-500'>
              <span>다음 상점의 정기 주문 상품 배송 주기를 선택해주세요</span>
              <ul>
                {unsetSubscriptions.map(store => (
                  <li key={store.customerId} className='flex gap-3 my-2'>
                    <ShoppingBagIcon className='w-5 h-5' />
                    {`${store.businessName}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className='flex items-end justify-between w-full'>
            <div className='flex items-end justify-between w-5/6 gap-2 py-4 mr-3 text-xl'>
              <span className='text-sm font-semibold'>{`${totals.selectedCount}개 선택`}</span>
              <span className='font-bold text-main'>{`${totals.totalAmount.toLocaleString()}원`}</span>
            </div>
            <BottomButton
              buttonText='구매하기'
              buttonStyle={`${isOrderButtonDisabled ? 'bg-gray-400' : 'bg-main'} text-white`}
              buttonFunc={handleOrder}
              disabled={isOrderButtonDisabled}
            />
          </div>
        </div>
      )}

      <SlideUpModal isOpen={modalState} setIsModalOpen={setModalState} headerText='배송 주기 선택' isButton={false}>
        <div className='flex flex-col items-start space-y-4'>
          {cycleContent.map(content => (
            <button key={content.value} onClick={() => handlePeriodSelection(content.value)} className='p-2 text-lg text-gray-500'>
              {content.text}
            </button>
          ))}
        </div>
      </SlideUpModal>
    </div>
  );
};

export default Cart;
