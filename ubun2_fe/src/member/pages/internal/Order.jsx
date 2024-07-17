import { useState } from 'react';
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
  const { cartData, selectedItems, handleSelectProduct, handleDeleteProduct, updateProductQuantity, calculateTotals, handleSelectAllStore } =
    useOrderItemsStore();
  const [deliveryItems, setDeliveryItems] = useState(deliveryContent);
  const [addressItems, setAddressItems] = useState(ADDRESS_DUMMY_DATA);
  const [selectedDelivery, setSelectedDelivery] = useState(deliveryItems[0]);
  const [selectedAddress, setSelectedAddress] = useState(addressItems[0]);
  const [activeModal, setActiveModal] = useState(null);

  const totals = calculateTotals();

  const { modalState, setModalState } = useModalStore();

  const handleOrder = () => {
    console.log('주문 데이터:', selectedItems);
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

        {selectedItems.itemContent.map(store => (
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
