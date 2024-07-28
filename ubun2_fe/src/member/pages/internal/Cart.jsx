import ShoppingBagIcon from '@heroicons/react/20/solid/ShoppingBagIcon';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDeleteCart, useGetCarts } from '../../api/Cart/queris';
import { errorToastStyle } from '../../api/toastStyle';
import { cycleContent } from '../../components/Cart/cartDummyData';
import CartStore from '../../components/Cart/cartList/CartStore';
import EmptyCartBox from '../../components/Cart/cartList/EmptyCartBox';
import PaymentSummaryPre from '../../components/common/paymentSummary/PaymentSummaryPre';
import SlideUpModal from '../../components/common/SlideUpModal';
import useModalStore from '../../store/modalStore';
import useOrderItemsStore from '../../store/order/orderItemStore';
import ModalBottomButton from '../../components/common/button/ModalBottomButton';
import BottomButton from '../../components/common/button/BottomButton';

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
    handleSelectAllStore,
    setCartData,
    removeProducts,
    removeStoreIfEmpty,
    setSubscriptionPeriod,
    totals,
  } = useOrderItemsStore();

  const { data: fetchedCartData, isLoading, isError, refetch } = useGetCarts();
  const deleteCartMutation = useDeleteCart();

  useEffect(() => {
    refetch();
  }, [location, refetch]);

  useEffect(() => {
    console.log('fetchedCartData:', fetchedCartData && fetchedCartData?.data?.data);
    if (fetchedCartData?.data?.data) {
      const filteredData = fetchedCartData.data.data.filter(store => store.cartProducts.length > 0);
      setCartData(filteredData);
    }
  }, [fetchedCartData, setCartData]);

  useEffect(() => {
    const unsetSubs = selectedItems.filter(store =>
      store.cartProducts.some(product => product.orderOption === 'SUBSCRIPTION' && (!store.intervalDays || store.intervalDays === 0))
    );
    setUnsetSubscriptions(unsetSubs);
    setIsOrderButtonDisabled(unsetSubs.length > 0 || selectedItems.length === 0 || selectedItems.every(store => store.cartProducts.length === 0));
  }, [selectedItems]);

  const handleSubscriptionPeriodSelect = storeId => {
    setSelectedStore(storeId);
    setModalState(true);
  };

  const handlePeriodSelection = period => {
    setSubscriptionPeriod(selectedStore, period);
    setModalState(false);
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
        cartProducts: [{ cartProductId: product.cartProductId }],
      },
    ];

    try {
      await deleteCartMutation.mutateAsync(deleteData);
      removeProducts([product.cartProductId]);
      removeStoreIfEmpty(customerId);
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleDeleteSelected = async () => {
    const deleteData = selectedItems.map(store => ({
      customerId: store.customerId,
      cartId: store.cartProducts[0].cartId,
      cartProducts: store.cartProducts.map(product => ({ cartProductId: product.cartProductId })),
    }));

    if (deleteData.length === 0) return;

    try {
      await deleteCartMutation.mutateAsync(deleteData);
      const deletedProductIds = selectedItems.flatMap(store => store.cartProducts.map(product => product.cartProductId));
      removeProducts(deletedProductIds);
      deleteData.forEach(store => removeStoreIfEmpty(store.customerId));
    } catch (error) {
      console.error('Failed to delete products:', error);
    }
  };

  const handleProceedToPayment = () => {
    if (isOrderButtonDisabled) {
      if (selectedItems.length === 0 || selectedItems.every(store => store.cartProducts.length === 0)) {
        toast.error('주문할 상품이 없습니다.', errorToastStyle);
      } else if (selectedItems.some(store => store.intervalDays === 0)) {
        toast.error('모든 정기주문 상품의 배송 주기를 선택해주세요.', errorToastStyle);
      }
      return;
    }

    const selectedOrderData = selectedItems
      .filter(store => store.cartProducts.length > 0)
      .map(store => ({
        customerId: store.customerId,
        businessName: store.businessName,
        intervalDays: store.intervalDays,
        cartProducts: store.cartProducts,
      }));

    console.log('선택된 items들:', selectedOrderData);

    navigate('/member/app/order');
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching cart data</div>;

  return (
    <div className='relative flex flex-col h-full'>
      {cartData && cartData.length !== 0 && (
        <div className='flex items-center justify-between p-4 font-bold'>
          <span className='text-2xl text-main'>{'장바구니'}</span>
          <span onClick={handleDeleteSelected} className='underline cursor-pointer text-main'>
            선택 상품 삭제
          </span>
        </div>
      )}
      <div className='flex flex-col flex-1 w-full'>
        <div className='flex-1'>
          {cartData && cartData.length === 0 ? (
            <div className='flex items-center justify-center h-full'>
              <EmptyCartBox />
            </div>
          ) : (
            <>
              <div className='w-full h-3 bg-gray-100'></div>
              {cartData?.map(store => (
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
              ))}
            </>
          )}

          {cartData && cartData.length !== 0 && (
            <>
              <PaymentSummaryPre productAmount={totals.productAmount} discount={totals.discount} totalAmount={totals.totalAmount} />
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
            </>
          )}
        </div>
      </div>

      {cartData && cartData.length !== 0 && (
        <div
          className='sticky bottom-0 left-0 right-0 flex flex-col w-full p-4 px-3 py-4'
          style={{ background: 'linear-gradient(to top, white, white 80%, transparent)' }}
        >
          <div className='flex items-end justify-between w-full'>
            <div className='flex items-end justify-between w-5/6 gap-2 py-4 mr-3 text-xl'>
              <span className='text-sm font-semibold'>{`${totals.selectedCount}개 선택`}</span>
              <span className='font-bold text-main'>{`${totals.totalAmount?.toLocaleString()}원`}</span>
            </div>
            <ModalBottomButton
              buttonText='구매하기'
              buttonStyle={`${isOrderButtonDisabled ? 'bg-gray-400' : 'bg-main'} text-white`}
              buttonFunc={handleProceedToPayment}
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
