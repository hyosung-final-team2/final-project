import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon';
import ChevronRightIcon from '@heroicons/react/24/solid/ChevronRightIcon';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetMyAddresses } from '../../api/Address/queries';
import { useCreateOrder } from '../../api/Order/queris';
import { useGetAccount, useGetCard } from '../../api/Payment/queries';
import BottomButton from '../../components/common/button/BottomButton';
import DoubleBottomButton from '../../components/common/button/DoubleBottomButton';
import PaymentSummaryCompleted from '../../components/common/paymentSummary/PaymentSummaryCompleted';
import SlideUpModal from '../../components/common/SlideUpModal';
import OrderCompleteStore from '../../components/OrderComplete/OrderCompleteStore';
import useModalStore from '../../store/modalStore';
import useOrderDataStore from '../../store/order/orderDataStore';
import useOrderItemsStore from '../../store/order/orderItemStore';
import { replace } from 'lodash';

const OrderComplete = () => {
  const { selectedItems, calculateTotals, clearCart } = useOrderItemsStore();
  const { orderData, selectedAddressId, selectedPaymentMethodId, selectedPaymentMethodType, resetOrderData } = useOrderDataStore();
  const navigate = useNavigate();
  const createOrderMutation = useCreateOrder();
  const { data: addresses, isLoading: addressesLoading, isError: addressesError } = useGetMyAddresses();
  const { data: card, isLoading: cardLoading, isError: cardError } = useGetCard(selectedPaymentMethodId);
  const { data: account, isLoading: accountLoading, isError: accountError } = useGetAccount(selectedPaymentMethodId);
  const addressInfo = addresses?.data?.data.find(address => address.addressId === selectedAddressId);
  const { modalState, setModalState } = useModalStore();
  const totals = calculateTotals();
  const modalButtonStyle = 'bg-main text-white';

  const paymentInfo =
    selectedPaymentMethodType === 'CARD'
      ? {
          paymentName: card?.cardName,
          paymentContent: card?.cardNumber,
        }
      : {
          paymentName: account?.accountName,
          paymentContent: account?.accountNumber,
        };

  const handleConfirmOrder = useCallback(async () => {
    const orderDataWithPayment = orderData.map(item => ({
      ...item,
      addressId: selectedAddressId,
    }));

    try {
      console.log('주문 데이터:', orderDataWithPayment);
      await createOrderMutation.mutateAsync(orderDataWithPayment);
      console.log('주문이 완료되었습니다.');
      // 주문 완료 후 데이터 초기화
      resetOrderData();
      clearCart();
      navigate('/member/app/home', { replace: true });
    } catch (error) {
      console.log('주문에 실패했습니다:', error);
    }
  }, [orderData, selectedAddressId, createOrderMutation, navigate]);

  const handleCancel = () => {
    resetOrderData();
    navigate('/member/app/home');
  };

  const handleCloseModal = () => {
    setModalState(false);
  };

  const openCancelModal = () => {
    setModalState(true);
  };

  if (addressesLoading || cardLoading || accountLoading) {
    return <div>Loading...</div>;
  }

  if (addressesError || cardError || accountError) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <div className='px-4 py-4 bg-white'>
        <h1 className='mb-2 text-3xl font-bold'>결제가 완료됐어요</h1>
        <div className='flex gap-3 py-4'>
          <span>주문 일자 </span>
          <span className='text-gray-500'>{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {selectedItems.map(store => (
        <div key={`${store.customerId}-${store.businessName}`}>
          {store.cartProducts.length > 0 && (
            <OrderCompleteStore
              store={{
                ...store,
                orderType: '단건 주문',
                products: store.cartProducts.map(product => ({
                  ...product,
                  ...orderData
                    .find(order => order.customerId === store.customerId)
                    ?.subscriptionOrderProducts.find(subProduct => subProduct.productId === product.productId),
                })),
              }}
            />
          )}
        </div>
      ))}

      <div className='flex flex-col gap-2 p-4 py-8 mb-4 bg-white'>
        <h2 className='mb-2 text-xl font-semibold'>배송지 정보</h2>
        <p className='font-semibold'>{addressInfo?.addressNickname}</p>
        <p className='text-sm text-gray-600'>{addressInfo?.address}</p>
        <p className='text-sm text-gray-600'>{addressInfo?.phoneNumber}</p>
        <div className='flex gap-5 '>
          <InformationCircleIcon className='w-5' />
          <p className='text-sm text-gray-500'>배송지 변경을 원하시면 결제취소 후 다시 주문해주세요</p>
        </div>
      </div>

      <div className='w-full py-2 bg-white'>
        <div className='flex justify-between p-4' onClick={openCancelModal}>
          <span className='text-lg font-bold text-red-700'>결제 취소하기</span>
          <ChevronRightIcon className='w-5' />
        </div>
        <div>
          <div className='flex justify-between p-4'>
            <span className='flex flex-col gap-3 text-lg font-bold'>
              판매자에게 문의하기
              <div className='flex gap-3 text-gray-500 bg-white'>
                <InformationCircleIcon className='w-5' />
                <p className='text-sm text-gray-500'>주문승인 이후에는 결제를 취소할 수 없어요.</p>
              </div>
            </span>
            <ChevronRightIcon className='w-5' />
          </div>
        </div>
      </div>

      <PaymentSummaryCompleted productAmount={totals.productAmount} discount={totals.discount} totalAmount={totals.totalAmount} paymentInfo={paymentInfo} />

      <div
        className='sticky bottom-0 left-0 right-0 flex flex-col w-full p-4 px-3 py-4'
        style={{ background: 'linear-gradient(to top, white, white 65%, transparent)' }}
      >
        <BottomButton buttonText='확인했어요' buttonStyle='bg-main text-white' buttonFunc={handleConfirmOrder} />
      </div>
      <SlideUpModal isOpen={modalState} setIsModalOpen={setModalState} headerText='주문을 취소하시겠습니까?' isButton={false}>
        <DoubleBottomButton
          buttonStyle={modalButtonStyle}
          firstButtonText='취소'
          secondButtonText='삭제'
          firstButtonFunc={handleCloseModal}
          secondButtonFunc={handleCancel}
        />
      </SlideUpModal>
    </div>
  );
};

export default OrderComplete;
