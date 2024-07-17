import { useState } from 'react';
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

  const { cartData, selectedItems, handleSelectProduct, handleDeleteProduct, updateProductQuantity, calculateTotals, handleSelectAllStore } =
    useOrderItemsStore();

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
    const selectedOrderData = selectedItems.itemContent
      .map(store => ({
        customerId: store.customerId,
        singleOrderProducts: store.singleOrderProducts.map(product => ({
          ...product,
        })),
        regularOrderProducts: store.regularOrderProducts.map(product => ({
          ...product,
        })),
      }))
      .filter(store => store.singleOrderProducts.length > 0 || store.regularOrderProducts.length > 0);

    console.log('선택된 items들:', selectedOrderData); // TODO: API 호출
  };

  const totals = calculateTotals();

  return (
    <div className='h-full'>
      <div className='flex flex-col flex-1 w-full'>
        <div className='flex-1'>
          {cartData.itemContent.map(store => (
            <CartStore
              key={store.customerId}
              store={store}
              selectedItems={selectedItems.itemContent.find(s => s.customerId === store.customerId)}
              onSelectProduct={handleSelectProduct}
              onQuantityChange={updateProductQuantity}
              onDelete={handleDeleteProduct}
              onSubscriptionPeriodSelect={handleSubscriptionPeriodSelect}
              onSelectAllStore={handleSelectAllStore}
            />
          ))}
          <PaymentSummaryPre productAmount={totals.productAmount} discount={totals.discount} totalAmount={totals.totalAmount} />
        </div>
      </div>
      <div className='sticky bottom-0 left-0 right-0 flex w-full p-4 px-3 py-4 bg-white'>
        <div className='flex items-end justify-between w-5/6 gap-2 py-4 mr-3 text-xl'>
          <span className='text-sm font-semibold'>{`${totals.selectedCount}개 선택`}</span>
          <span className='font-bold text-main'>{`${totals.totalAmount.toLocaleString()}원`}</span>
        </div>
        <BottomButton buttonText='구매하기' buttonStyle='bg-main text-white' buttonFunc={handleOrder} />
      </div>

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
