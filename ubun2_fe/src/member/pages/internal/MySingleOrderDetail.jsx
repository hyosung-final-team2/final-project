import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon';
import ChevronRightIcon from '@heroicons/react/24/solid/ChevronRightIcon';
import { useParams } from 'react-router-dom';
import { formatAccountNumber } from '../../../customer/utils/accountFormat';
import { formatCardNumber } from '../../../customer/utils/cardFormat';
import { useGetOrderDetail, useUpdateCancelOrder } from '../../api/Order/queris';
import OrderStatusBadge from '../../components/common/badge/OrderStatusBadge';
import DoubleBottomButton from '../../components/common/button/DoubleBottomButton';
import PaymentSummaryCompleted from '../../components/common/paymentSummary/PaymentSummaryCompleted';
import ProductItemReadOnly from '../../components/common/productItem/ProductItemReadOnly';
import SlideUpModal from '../../components/common/SlideUpModal';
import useModalStore from '../../store/modalStore';

const MySingleOrderDetail = () => {
  const { customerId, orderId } = useParams();
  const { data: orderResponse, isLoading, isError } = useGetOrderDetail(customerId, orderId);
  const updateCancelOrderMutation = useUpdateCancelOrder(customerId, orderId);
  const { modalState, setModalState } = useModalStore();
  const modalButtonStyle = 'bg-gray-600 text-white';
  const secondModalButtonStyle = 'bg-red-700 text-white';

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while fetching order details.</div>;

  const orderData = orderResponse?.data?.data;

  const paymentInfo = {
    paymentName: orderData?.paymentType === 'CARD' ? orderData?.cardCompanyName : orderData?.bankName,
    paymentContent: orderData?.paymentType === 'CARD' ? formatCardNumber(orderData?.cardNumber) : formatAccountNumber(orderData?.accountNumber),
  };

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const openCancelModal = () => {
    setModalState(true);
  };

  const closeCancelModal = () => {
    setModalState(false);
  };

  const handleCancel = () => {
    updateCancelOrderMutation.mutate(
      {
        customerId: Number(customerId),
        orderId: Number(orderId),
      },
      {
        onSuccess: () => {
          closeCancelModal();
        },
      }
    );
  };

  return (
    <div className='bg-gray-100'>
      <div className='flex flex-col p-4'>
        <div className='flex items-center justify-between py-4 text-main'>
          <h1 className='text-2xl font-bold'>주문번호 {orderId}</h1>
          <OrderStatusBadge status='SINGLE' />
        </div>
        <div className='px-4 py-6 mb-2 bg-white rounded-3xl'>
          <div className='flex justify-between'>
            <h2 className='mb-4 text-xl font-bold text-gray-800'>주문 내역</h2>
            <OrderStatusBadge status={orderData?.orderStatus} customSize={'text-xs'} />
          </div>
          <div className='flex items-center gap-3 mb-1 text-gray-600'>
            <h3 className='text-lg font-bold'>{orderData?.orderProducts[0].productName}</h3>
            <span>{orderData?.orderProducts.length - 1 > 0 ? `외 ${orderData?.orderProducts.length - 1} 개` : ''}</span>
          </div>
          <p className='mb-4 text-sm text-gray-500'>{formatDate(orderData?.createdAt)}</p>
          {orderData?.orderProducts.map(product => (
            <ProductItemReadOnly
              key={product.productId}
              productImagePath={product.productImagePath}
              productDescription={product.productDescription}
              productName={product.productName}
              productPrice={product.price}
              productDiscount={product.discount}
              quantity={product.quantity}
              productImageOriginalName={product.productImageOriginalName}
            />
          ))}

          <div className='w-full bg-white border-t'>
            {orderData?.orderStatus === 'PENDING' && (
              <div className='flex justify-between px-4 py-6' onClick={openCancelModal}>
                <span className='text-base font-bold text-red-700'>결제 취소하기</span>
                <ChevronRightIcon className='w-5' />
              </div>
            )}
            <div className='flex flex-col gap-3 p-4 '>
              <div className='flex justify-between'>
                <span className='flex flex-col gap-3 text-base font-bold'>판매자에게 문의하기</span>
                <ChevronRightIcon className='w-5' />
              </div>
              <div className='flex gap-3 text-gray-500 bg-white'>
                <InformationCircleIcon className='w-5' />
                <p className='text-sm text-gray-500'>주문승인 이후에는 결제를 취소할 수 없어요.</p>
              </div>
            </div>
          </div>
        </div>
        <PaymentSummaryCompleted
          productAmount={orderData?.orderAmount}
          discount={orderData?.discountAmount}
          totalAmount={orderData?.paymentAmount}
          paymentInfo={paymentInfo}
          style={'rounded-3xl'}
        />
      </div>
      {orderData?.orderStatus === 'PENDING' && (
        <SlideUpModal isOpen={modalState} setIsModalOpen={setModalState} headerText='주문을 취소하시겠습니까?' isButton={false}>
          <DoubleBottomButton
            buttonStyle={modalButtonStyle}
            firstButtonText='취소'
            secondButtonText='삭제'
            firstButtonFunc={closeCancelModal}
            secondButtonFunc={handleCancel}
            secondButtonStyle={secondModalButtonStyle}
          />
        </SlideUpModal>
      )}
    </div>
  );
};

export default MySingleOrderDetail;
