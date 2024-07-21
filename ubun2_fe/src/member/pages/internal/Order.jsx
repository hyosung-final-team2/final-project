import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomButton from '../../components/common/button/BottomButton';
import PaymentSummaryPre from '../../components/common/paymentSummary/PaymentSummaryPre';
import SlideUpModal from '../../components/common/SlideUpModal';
import OrderDeliveryInfo from '../../components/Order/Order/OrderDeliveryInfo';
import OrderStore from '../../components/Order/Order/OrderStore';
import { ADDRESS_DUMMY_DATA, deliveryContent } from '../../components/Order/orderDummyData';
import AddressModalContent from '../../components/Order/OrderModal/AddressModalContent';
import DeliveryModalContent from '../../components/Order/OrderModal/DeliveryModalContent';
import useModalStore from '../../store/modalStore';
import useOrderItemsStore from '../../store/order/orderItemStore';

const Order = () => {
  const navigate = useNavigate();
  const { selectedItems, calculateTotals } = useOrderItemsStore();
  const [deliveryItems] = useState(deliveryContent);
  const [addressItems] = useState(ADDRESS_DUMMY_DATA);
  const [selectedDelivery, setSelectedDelivery] = useState(deliveryItems[0]);
  const [selectedAddress, setSelectedAddress] = useState(addressItems[0]);
  const [activeModal, setActiveModal] = useState(null);

  const totals = calculateTotals();

  const { modalState, setModalState } = useModalStore();

  const handleOrder = async () => {
    console.log('주문 데이터:', selectedItems);
    try {
      // TODO: API 호출을 통해 주문을 생성하고 orderId를 받아오는 로직
      // const response = await createOrder(selectedItems, selectedAddress, selectedDelivery);
      // const orderId = response.orderId;
      const orderId = 1; // 임시 orderId, 실제 구현 시 위의 주석 처리된 코드로 대체
      navigate(`/order-complete/${orderId}`);
    } catch (error) {
      console.error('주문 생성 실패:', error);
      // TODO: 에러 처리 로직 (예: 사용자에게 에러 메시지 표시)
    }
  };

  const handleDeliverySelection = delivery => {
    setSelectedDelivery(delivery);
    setModalState(false);
    console.log(`배송 선택 옵션이 변경되었습니다:`, delivery);
  };

  const handleAddressSelection = address => {
    setSelectedAddress(address);
    setModalState(false);
    console.log(`주소지가 변경되었습니다:`, address);
  };

  const handleModalOpen = type => {
    setActiveModal(type);
    setModalState(true);
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'address':
        return <AddressModalContent addressContent={addressItems} handleAddressSelection={handleAddressSelection} />;
      case 'delivery':
        return <DeliveryModalContent deliveryContent={deliveryItems} handleDeliverySelection={handleDeliverySelection} />;
      default:
        return null;
    }
  };

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
        <BottomButton buttonText='결제하기' buttonStyle='bg-main text-white' buttonFunc={handleOrder} />
      </div>

      <SlideUpModal isOpen={modalState} setIsModalOpen={setModalState} headerText={activeModal === 'address' ? '주소 선택' : '배송 주기 선택'} isButton={false}>
        {renderModalContent()}
      </SlideUpModal>
    </div>
  );
};

export default Order;
