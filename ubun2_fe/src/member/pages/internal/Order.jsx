import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useGetMyAddresses } from '../../api/Address/queries';
import { useCreateOrder } from '../../api/Order/queris';
import BottomButton from '../../components/common/button/BottomButton';
import PaymentSummaryPre from '../../components/common/paymentSummary/PaymentSummaryPre';
import SlideUpModal from '../../components/common/SlideUpModal';
import OrderDeliveryInfo from '../../components/Order/Order/OrderDeliveryInfo';
import OrderStore from '../../components/Order/Order/OrderStore';
import { deliveryContent } from '../../components/Order/orderDummyData';
import AddressModalContent from '../../components/Order/OrderModal/AddressModalContent';
import DeliveryModalContent from '../../components/Order/OrderModal/DeliveryModalContent';
import useMemberStore from '../../store/memberStore';
import useModalStore from '../../store/modalStore';
import useOrderItemsStore from '../../store/order/orderItemStore';

const Order = () => {
  const navigate = useNavigate();
  const { selectedItems, calculateTotals, clearCart } = useOrderItemsStore();
  const [deliveryItems] = useState(deliveryContent);
  const [selectedDelivery, setSelectedDelivery] = useState(deliveryItems[0]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [isOrderButtonDisabled, setIsOrderButtonDisabled] = useState(false);
  const [unsetSubscriptions, setUnsetSubscriptions] = useState([]);

  const totals = calculateTotals();

  const { modalState, setModalState } = useModalStore();

  const createOrderMutation = useCreateOrder();
  const { memberId } = useMemberStore(state => ({ memberId: state.memberId }));
  const { data: addresses, isLoading: isLoadingAddresses, isError: isErrorAddresses, error: addressesError } = useGetMyAddresses(memberId);

  const addressList = addresses?.data?.data || [];

  // 주문 데이터가 비어있으면 장바구니 페이지로 리다이렉트
  useEffect(() => {
    if (selectedItems.length === 0) {
      navigate('/cart');
    }
  }, [selectedItems, navigate]);

  // 주소 목록이 로드되면 첫 번째 주소를 기본 선택
  useEffect(() => {
    if (addressList.length > 0) {
      setSelectedAddress(addressList[0]);
    }
  }, [addressList]);

  // 주문 버튼 활성화 상태 및 미설정 구독 상품 확인
  useEffect(() => {
    const unsetSubs = selectedItems.filter(store =>
      store.cartProducts.some(product => product.orderOption === 'SUBSCRIPTION' && (!store.intervalDays || store.intervalDays === 0))
    );
    setUnsetSubscriptions(unsetSubs);
    setIsOrderButtonDisabled(unsetSubs.length > 0 || !selectedAddress || selectedItems.length === 0);
  }, [selectedItems, selectedAddress]);

  const handleOrder = async () => {
    if (isOrderButtonDisabled) {
      if (!selectedAddress) {
        toast.error('배송지를 선택해주세요.');
      } else if (selectedItems.length === 0) {
        toast.error('주문할 상품이 없습니다.');
      } else {
        toast.error('모든 정기 주문 상품의 배송 주기를 선택해주세요.');
      }
      return;
    }

    const orderData = selectedItems.map(store => ({
      customerId: store.customerId,
      paymentMethodId: 22, // 임시로 고정값 사용
      paymentType: 'CARD', // 임시로 고정값 사용
      addressId: selectedAddress.addressId,
      intervalDays: store.intervalDays || 0,
      subscriptionOrderProducts: store.cartProducts.map(product => ({
        price: product.productPrice,
        quantity: product.quantity,
        productId: product.productId,
        discount: product.productDiscount,
      })),
    }));

    try {
      console.log('주문 데이터:', orderData);
      await createOrderMutation.mutateAsync(orderData);
      clearCart(); // 주문 완료 후 장바구니 비우기
      toast.success('주문이 완료되었습니다. 내역을 확인해보세요.');
      navigate('/order-complete', { replace: true }); // 뒤로가기 방지
    } catch (error) {
      console.error('주문 생성 실패:', error);
      toast.error('결제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleDeliverySelection = delivery => {
    setSelectedDelivery(delivery);
    setModalState(false);
  };

  const handleAddressSelection = address => {
    setSelectedAddress(address);
    setModalState(false);
  };

  const handleModalOpen = type => {
    setActiveModal(type);
    setModalState(true);
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'address':
        return <AddressModalContent addressContent={addressList} handleAddressSelection={handleAddressSelection} />;
      case 'delivery':
        return <DeliveryModalContent deliveryContent={deliveryItems} handleDeliverySelection={handleDeliverySelection} />;
      default:
        return null;
    }
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
          selectedAddress={selectedAddress}
          selectedDelivery={selectedDelivery}
          handleAddressModal={() => handleModalOpen('address')}
          handleDeliveryModal={() => handleModalOpen('delivery')}
        />

        {selectedItems.map(store => (
          <OrderStore key={store.customerId} store={store} />
        ))}

        <PaymentSummaryPre productAmount={totals.productAmount} discount={totals.discount} totalAmount={totals.totalAmount} isOrder={true} />
      </div>
      <div className='sticky bottom-0 left-0 right-0 p-4 bg-white'>
        <BottomButton
          buttonText='구매하기'
          buttonStyle={`${isOrderButtonDisabled ? 'bg-gray-400' : 'bg-main'} text-white`}
          buttonFunc={handleOrder}
          disabled={isOrderButtonDisabled}
        />
      </div>
      <SlideUpModal isOpen={modalState} setIsModalOpen={setModalState} headerText={activeModal === 'address' ? '주소 선택' : '배송 주기 선택'} isButton={false}>
        {renderModalContent()}
      </SlideUpModal>
    </div>
  );
};

export default Order;
