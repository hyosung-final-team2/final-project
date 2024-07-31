import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon';
import ChevronRightIcon from '@heroicons/react/24/solid/ChevronRightIcon';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { maskAccountNumber } from '../../../customer/utils/accountFormat';
import { maskCardNumber } from '../../../customer/utils/cardFormat';
import { useGetMyAddresses, useSetDefaultAddressStatus } from '../../api/Address/queries';
import { useCreateOrder } from '../../api/Order/queris';
import { useGetAccount, useGetCard } from '../../api/Payment/queries';
import { successToastStyle } from '../../api/toastStyle';
import BottomButton from '../../components/common/button/BottomButton';
import DoubleBottomButton from '../../components/common/button/DoubleBottomButton';
import PaymentSummaryCompleted from '../../components/common/paymentSummary/PaymentSummaryCompleted';
import SlideUpModal from '../../components/common/SlideUpModal';
import OrderCompleteStore from '../../components/OrderComplete/OrderCompleteStore';
import useModalStore from '../../store/modalStore';
import useOrderDataStore from '../../store/order/orderDataStore';
import useOrderItemsStore from '../../store/order/orderItemStore';

const OrderComplete = () => {
  const { selectedItems, totals, clearCart } = useOrderItemsStore();
  const { orderData, selectedAddressId, selectedPaymentMethodId, selectedPaymentMethodType, resetOrderData } = useOrderDataStore();
  const navigate = useNavigate();
  const { mutate: createOrder } = useCreateOrder(navigate);
  const { data: addresses, isLoading: addressesLoading, isError: addressesError } = useGetMyAddresses();
  const { data: card, isLoading: cardLoading, isError: cardError } = useGetCard(selectedPaymentMethodId);
  const { data: account, isLoading: accountLoading, isError: accountError } = useGetAccount(selectedPaymentMethodId);
  const addressInfo = addresses?.data?.data.find(address => address.addressId === selectedAddressId);
  const { modalState, setModalState } = useModalStore();
  const modalButtonStyle = 'bg-gray-600 text-white';
  const secondModalButtonStyle = 'bg-red-700 text-white';
  const { mutate: setDefaultAddress } = useSetDefaultAddressStatus();

  const paymentInfo =
    selectedPaymentMethodType === 'CARD'
      ? {
          paymentName: card?.data?.data?.paymentMethodNickname,
          paymentContent: maskCardNumber(card?.data?.data?.cardNumber),
        }
      : {
          paymentName: account?.data?.data?.paymentMethodNickname,
          paymentContent: maskAccountNumber(account?.data?.data?.accountNumber),
        };

  const handleConfirmOrder = async () => {
    const orderDataWithPayment = orderData.map(item => ({
      ...item,
      addressId: selectedAddressId,
    }));

    await createOrder(orderDataWithPayment);
    setDefaultAddress(selectedAddressId);
    resetOrderData();
    clearCart();
  };

  const handleCancel = () => {
    resetOrderData();
    setModalState(false);
    toast.success('주문이 취소되었습니다.', successToastStyle);
    navigate('/member/app/home', { replace: true });
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
        <h1 className='my-2 text-3xl font-bold'>결제가 완료됐어요</h1>
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
                orderType: store.intervalDays > 0 ? '정기 주문' : '단건 주문',
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
            <ChevronRightIcon className='w-5 mb' />
          </div>
        </div>
      </div>

      <PaymentSummaryCompleted
        productAmount={totals.productAmount}
        discount={totals.discount}
        totalAmount={totals.totalAmount}
        paymentInfo={paymentInfo}
        style={'mb-20'}
      />

      <BottomButton buttonText='확인했어요' buttonStyle='bg-main text-white' buttonFunc={handleConfirmOrder} />

      <SlideUpModal isOpen={modalState} setIsModalOpen={setModalState} headerText='주문을 취소하시겠습니까?' isButton={false}>
        <DoubleBottomButton
          buttonStyle={modalButtonStyle}
          firstButtonText='취소'
          secondButtonText='삭제'
          firstButtonFunc={handleCloseModal}
          secondButtonFunc={handleCancel}
          secondButtonStyle={secondModalButtonStyle}
        />
      </SlideUpModal>
    </div>
  );
};

export default OrderComplete;
