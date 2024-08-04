import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetMyAddresses } from '../../api/Address/queries';
import BottomButton from '../../components/common/button/BottomButton';
import PaymentSummaryPre from '../../components/common/paymentSummary/PaymentSummaryPre';
import SlideUpModal from '../../components/common/SlideUpModal';
import OrderDeliveryInfo from '../../components/Order/Order/OrderDeliveryInfo';
import OrderStore from '../../components/Order/Order/OrderStore';
import { deliveryContent } from '../../components/Order/orderDummyData';
import DeliveryModalContent from '../../components/Order/OrderModal/DeliveryModalContent';
import useMemberStore from '../../store/memberStore';
import useModalStore from '../../store/modalStore';
import useOrderDataStore from '../../store/order/orderDataStore';
import useOrderItemsStore from '../../store/order/orderItemStore';
import toast from 'react-hot-toast';
import { errorToastStyle } from '../../api/toastStyle';

const Order = () => {
  const navigate = useNavigate();
  const { selectedItems, totals } = useOrderItemsStore();
  const [deliveryItems] = useState(deliveryContent);
  const [selectedDelivery, setSelectedDelivery] = useState(deliveryItems[0]);
  const [isOrderButtonDisabled, setIsOrderButtonDisabled] = useState(true);
  const [unsetSubscriptions, setUnsetSubscriptions] = useState([]);

  const { modalState, setModalState } = useModalStore();
  const { setOrderData, updateOrderData, selectedAddressId } = useOrderDataStore();

  const { memberId } = useMemberStore(state => ({ memberId: state.memberId }));
  const { data: addresses, isLoading: isLoadingAddresses, isError: isErrorAddresses, error: addressesError } = useGetMyAddresses(memberId);

  useEffect(() => {
    if (selectedItems.length === 0) {
      navigate('/cart');
    } else {
      const initialOrderData = selectedItems.map(store => ({
        customerId: store.customerId,
        paymentMethodId: null,
        paymentType: null,
        addressId: null,
        intervalDays: store.intervalDays || 0,
        subscriptionOrderProducts: store.cartProducts.map(product => ({
          price: product.productPrice,
          quantity: product.quantity,
          productId: product.productId,
          discount: product.productDiscount,
        })),
      }));
      setOrderData(initialOrderData);
    }
  }, [selectedItems, navigate, setOrderData]);

  useEffect(() => {
    const unsetSubs = selectedItems.filter(store =>
      store.cartProducts.some(product => product.orderOption === 'SUBSCRIPTION' && (!store.intervalDays || store.intervalDays === 0))
    );
    setUnsetSubscriptions(unsetSubs);
  }, [selectedItems]);

  useEffect(() => {
    const hasValidAddress = selectedAddressId !== null && selectedAddressId !== undefined;
    const hasUnsetSubscriptions = unsetSubscriptions.length > 0;
    const hasItems = selectedItems.length > 0;

    setIsOrderButtonDisabled(!hasValidAddress || hasUnsetSubscriptions || !hasItems);

    if (hasValidAddress) {
      updateOrderData({ addressId: selectedAddressId });
    }
  }, [selectedAddressId, updateOrderData, unsetSubscriptions, selectedItems.length]);

  const handleProceedToPayment = () => {
    if (isOrderButtonDisabled) {
      if (!selectedAddressId) {
        toast.error('배송지를 선택해주세요.', errorToastStyle);
      } else if (selectedItems.length === 0) {
        toast.error('주문할 상품이 없습니다.', errorToastStyle);
      } else {
        toast.error('모든 정기 주문 상품의 배송 주기를 선택해주세요.', errorToastStyle);
      }
      return;
    }
    console.log(selectedAddressId);
    navigate('/member/app/payments', { state: { selectedItems } });
  };

  const handleDeliverySelection = delivery => {
    setSelectedDelivery(delivery);
    setModalState(false);
  };

  const handleModalOpen = () => {
    setModalState(true);
  };

  if (isLoadingAddresses) {
    return <div>주소 정보를 불러오는 중...</div>;
  }

  if (isErrorAddresses) {
    return <div>주소 정보를 불러오는데 실패했습니다: {addressesError.message}</div>;
  }

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-1'>
        <OrderDeliveryInfo
          selectedDelivery={selectedDelivery}
          handleDeliveryModal={() => handleModalOpen()}
          setIsOrderButtonDisabled={setIsOrderButtonDisabled}
        />

        {selectedItems.map(store => (
          <OrderStore key={store.customerId} store={store} />
        ))}

        <PaymentSummaryPre productAmount={totals.productAmount} discount={totals.discount} totalAmount={totals.totalAmount} isOrder={true} />
        <div className='h-20'></div>
      </div>

      <BottomButton
        buttonText='결제하기'
        buttonStyle={`${isOrderButtonDisabled ? 'bg-gray-400' : 'bg-main'} text-white`}
        buttonFunc={handleProceedToPayment}
        disabled={isOrderButtonDisabled}
      />

      <SlideUpModal isOpen={modalState} setIsModalOpen={setModalState} headerText='배송 주기 선택' isButton={false}>
        <DeliveryModalContent deliveryContent={deliveryItems} handleDeliverySelection={handleDeliverySelection} />
      </SlideUpModal>
    </div>
  );
};

export default Order;
