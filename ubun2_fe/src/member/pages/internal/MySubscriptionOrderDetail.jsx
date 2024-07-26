import PencilSquareIcon from '@heroicons/react/24/solid/PencilSquareIcon';
import { Select } from 'flowbite-react';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatAccountNumber } from '../../../customer/utils/accountFormat';
import { formatCardNumber } from '../../../customer/utils/cardFormat';
import { useGetSubscriptionOrderDetail, useUpdateSuscriptionCancelOrder } from '../../api/Order/queris';
import OrderStatusBadge from '../../components/common/badge/OrderStatusBadge';
import DoubleBottomButton from '../../components/common/button/DoubleBottomButton';
import PaymentSummaryCompleted from '../../components/common/paymentSummary/PaymentSummaryCompleted';
import ProductItemReadOnly from '../../components/common/productItem/ProductItemReadOnly';
import SubscriptionProductItemEditable from '../../components/common/productItem/SubscriptionProductItemEditable';
import SlideUpModal from '../../components/common/SlideUpModal';
import useModalStore from '../../store/modalStore';

const MySubscriptionOrderDetail = () => {
  const { customerId, orderId } = useParams();
  const { data: orderResponse, isLoading, isError } = useGetSubscriptionOrderDetail(customerId, orderId);
  const [orderData, setOrderData] = useState(null);
  const [selectedCycle, setSelectedCycle] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const updateCancelSubscriptionOrderMutation = useUpdateSuscriptionCancelOrder();
  const { modalState, setModalState } = useModalStore();

  const modalButtonStyle = 'bg-main text-white';

  useEffect(() => {
    if (orderResponse?.data?.data) {
      setOrderData(orderResponse.data.data);
      setSelectedCycle(orderResponse.data.data.latestCycleNumber);
      setModalState(false);
    }
  }, [orderResponse]);

  const filteredProducts = useMemo(() => {
    if (!orderData) return [];
    return orderData.subscriptionOrderProducts.filter(product => product.cycleNumber === selectedCycle);
  }, [orderData, selectedCycle]);

  const isDeliveryEditable = useMemo(() => {
    if (!orderData) return false;
    const today = new Date();
    const nextOrderDate = new Date(orderData.nextOrderDate);
    return nextOrderDate > today && selectedCycle === orderData.latestCycleNumber;
  }, [orderData, selectedCycle]);

  const onCycleChange = cycleNumber => {
    setSelectedCycle(Number(cycleNumber));
    setIsEditing(false);
    setSelectedProducts([]);
  };

  const handleProductSelect = subscriptionOrderProductId => {
    const product = orderData.subscriptionOrderProducts.find(item => item.subscriptionOrderProductId === subscriptionOrderProductId);
    if (product && product.orderProductStatus !== 'REJECTED') {
      setSelectedProducts(prev =>
        prev.includes(subscriptionOrderProductId) ? prev.filter(id => id !== subscriptionOrderProductId) : [...prev, subscriptionOrderProductId]
      );
    }
  };

  const editableProducts = useMemo(() => {
    return filteredProducts.filter(product => product.orderProductStatus !== 'REJECTED');
  }, [filteredProducts]);

  const hasEditableProducts = editableProducts.length > 0;

  const handleEdit = () => {
    setIsEditing(true);
    setSelectedProducts([]);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedProducts([]);
  };

  const handleCloseModal = () => {
    setModalState(false);
  };

  const handleRemoveProducts = () => {
    const validProductIds = selectedProducts.filter(id => {
      const product = orderData.subscriptionOrderProducts.find(item => item.subscriptionOrderProductId === id);
      return product && product.orderProductStatus !== 'REJECTED';
    });

    if (validProductIds.length === 0) {
      console.log('선택된 유효한 상품이 없습니다.');
      return;
    }

    updateCancelSubscriptionOrderMutation.mutate(
      {
        orderId: Number(orderId),
        customerId: Number(customerId),
        subscriptionOrderProductIds: validProductIds,
      },
      {
        onSuccess: () => {
          setModalState(false);
          setIsEditing(false);
          setSelectedProducts([]);
        },
      }
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while fetching order details.</div>;
  if (!orderData) return null;

  const paymentInfo = {
    paymentName: orderData?.paymentType === 'CARD' ? orderData?.cardCompanyName : orderData?.bankName,
    paymentContent: orderData?.paymentType === 'CARD' ? formatCardNumber(orderData?.cardNumber) : formatAccountNumber(orderData?.accountNumber),
  };

  return (
    <div className='bg-gray-100'>
      <div className='flex flex-col p-4'>
        <div className='flex items-center justify-between py-4 text-main'>
          <h1 className='text-2xl font-bold'>주문번호 {orderId}</h1>
          <OrderStatusBadge status='SUBSCRIPTION' />
        </div>

        <div className='flex items-center justify-start'>
          <div className='mb-4'>
            <label htmlFor='cycle-select' className='block mb-2 text-sm font-medium text-gray-500'>
              * 정기주문 회차
            </label>
            <Select id='cycle-select' value={selectedCycle} onChange={e => onCycleChange(e.target.value)} className='mt-2 w-fit'>
              {[...Array(orderData.latestCycleNumber)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1} 회차
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className='px-4 py-6 mb-2 bg-white rounded-3xl'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl font-bold text-gray-600'>주문 내역</h2>
            {isDeliveryEditable && !isEditing && hasEditableProducts && (
              <span className='flex gap-3 text-gray-400 underline' onClick={handleEdit}>
                <PencilSquareIcon className='w-5 h-5' />
              </span>
            )}

            {isEditing && hasEditableProducts && (
              <div className='flex gap-3 text-gray-400 underline'>
                <span
                  onClick={() => selectedProducts.length > 0 && setModalState(true)}
                  className={`cursor-pointer ${selectedProducts.length === 0 ? 'opacity-50' : ''}`}
                >
                  선택 삭제
                </span>
                <span onClick={handleCancel} className='cursor-pointer'>
                  취소
                </span>
              </div>
            )}
          </div>
          {filteredProducts.map(product =>
            isEditing && product.orderProductStatus !== 'REJECTED' ? (
              <SubscriptionProductItemEditable
                key={product.subscriptionOrderProductId}
                {...product}
                isSelected={selectedProducts.includes(product.subscriptionOrderProductId)}
                onSelect={() => handleProductSelect(product.subscriptionOrderProductId)}
                disabled={false}
              />
            ) : (
              <ProductItemReadOnly key={product.subscriptionOrderProductId} {...product} orderProductStatus={product.orderProductStatus} />
            )
          )}
        </div>
        <PaymentSummaryCompleted
          productAmount={orderData.orderAmount}
          discount={orderData.discountAmount}
          totalAmount={orderData.paymentAmount}
          paymentInfo={paymentInfo}
          style={'rounded-3xl'}
        />
      </div>

      <SlideUpModal isOpen={modalState} setIsModalOpen={setModalState} headerText='선택한 상품 삭제' isButton={false}>
        <DoubleBottomButton
          buttonStyle={modalButtonStyle}
          firstButtonText='취소'
          secondButtonText='삭제'
          firstButtonFunc={handleCloseModal}
          secondButtonFunc={handleRemoveProducts}
          disabled={updateCancelSubscriptionOrderMutation.isLoading}
        />
      </SlideUpModal>
    </div>
  );
};

export default MySubscriptionOrderDetail;
