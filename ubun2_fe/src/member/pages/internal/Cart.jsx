import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDeleteCart, useGetCarts } from '../../api/Cart/queris';
import { cycleContent } from '../../components/Cart/cartDummyData';
import CartStore from '../../components/Cart/cartList/CartStore';
import BottomButton from '../../components/common/button/BottomButton';
import PaymentSummaryPre from '../../components/common/paymentSummary/PaymentSummaryPre';
import SlideUpModal from '../../components/common/SlideUpModal';
import useModalStore from '../../store/modalStore';
import useOrderItemsStore from '../../store/order/orderItemStore';

const Cart = () => {
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const { modalState, setModalState } = useModalStore();
  const location = useLocation();

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
  } = useOrderItemsStore();

  const { data: fetchedCartData, isLoading, isError, refetch } = useGetCarts();
  const deleteCartMutation = useDeleteCart();

  // 페이지 경로가 변경될 때마다 refetch
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
    console.log('업데이트 cartData:', cartData);
  }, [cartData]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching cart data</div>;

  const handleSubscriptionPeriodSelect = storeId => {
    setSelectedStore(storeId);
    setModalState(true);
  };

  const handlePeriodSelection = period => {
    setSelectedPeriod(period);
    setModalState(false);
    console.log(`Store ${selectedStore}의 구독 주기가 ${period}로 설정되었습니다.`);
  };

  const handleOrder = () => {
    const selectedOrderData = selectedItems
      .map(store => ({
        customerId: store.customerId,
        cartProducts: store.cartProducts.map(product => ({
          ...product,
        })),
      }))
      .filter(store => store.cartProducts.length > 0);

    console.log('선택된 items들:', selectedOrderData); // TODO: API 호출
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
      removeStoreIfEmpty(customerId); // 제품 삭제 후 store 비어있으면 제거
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
      deleteData.forEach(store => removeStoreIfEmpty(store.customerId)); // 각 store 비어있는지 확인하고 제거
    } catch (error) {
      console.error('Failed to delete products:', error);
    }
  };

  const totals = calculateTotals();

  return (
    <div className='h-full'>
      <button onClick={clearCart}>임시 로그아웃</button>
      <button onClick={handleDeleteSelected}>선택 상품 삭제</button>
      <div className='flex flex-col flex-1 w-full'>
        <div className='flex-1'>
          {cartData && cartData.length === 0 ? (
            <div className='flex items-center justify-center h-full'>
              <span className='text-xl font-semibold'>장바구니가 비었어요!</span>
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
          {cartData && cartData.length > 0 && (
            <PaymentSummaryPre productAmount={totals.productAmount} discount={totals.discount} totalAmount={totals.totalAmount} />
          )}
        </div>
      </div>
      {cartData && cartData.length > 0 && (
        <div
          className='sticky bottom-0 left-0 right-0 flex w-full p-4 px-3 py-4'
          style={{ background: 'linear-gradient(to top, white, white 65%, transparent)' }}
        >
          <div className='flex items-end justify-between w-5/6 gap-2 py-4 mr-3 text-xl'>
            <span className='text-sm font-semibold'>{`${totals.selectedCount}개 선택`}</span>
            <span className='font-bold text-main'>{`${totals.totalAmount.toLocaleString()}원`}</span>
          </div>
          <BottomButton buttonText='구매하기' buttonStyle='bg-main text-white' buttonFunc={handleOrder} />
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
