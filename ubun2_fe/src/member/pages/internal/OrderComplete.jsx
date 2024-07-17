import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon';
import ChevronRightIcon from '@heroicons/react/24/solid/ChevronRightIcon';
import { useNavigate } from 'react-router-dom';
import BottomButton from '../../components/common/button/BottomButton';
import PaymentSummaryCompleted from '../../components/common/paymentSummary/PaymentSummaryCompleted';
import OrderCompleteStore from '../../components/OrderComplete/OrderCompleteStore';
import useOrderItemsStore from '../../store/order/orderItemStore';

const OrderComplete = () => {
  const { selectedItems, calculateTotals } = useOrderItemsStore();
  const navigate = useNavigate();

  const totals = calculateTotals();
  const paymentInfo = {
    paymentName: selectedItems.paymentType === 'CARD' ? selectedItems.cardName : selectedItems.accountName,
    paymentContent: selectedItems.paymentType === 'CARD' ? selectedItems.cardNumber : selectedItems.accountNumber,
  };

  const buttonFunc = () => {
    navigate('/member/app/home');
  };

  return (
    <div>
      <div className='px-4 py-4 bg-white'>
        <h1 className='mb-2 text-3xl font-bold'>결제가 완료됐어요</h1>
        <div className='flex gap-3 py-4'>
          <span>주문 일자 </span>
          <span className='text-gray-500'>{`${selectedItems.createdAt}`}</span>
        </div>
      </div>

      {selectedItems.itemContent.map(store => (
        <div key={`${store.customerId}-${store.businessName}`}>
          {store.singleOrderProducts.length > 0 && (
            <OrderCompleteStore
              store={{
                ...store,
                orderType: '단건 주문',
                products: store.singleOrderProducts,
              }}
            />
          )}
          {store.regularOrderProducts.length > 0 && (
            <OrderCompleteStore
              store={{
                ...store,
                orderType: '정기 주문',
                products: store.regularOrderProducts,
              }}
            />
          )}
        </div>
      ))}

      <div className='p-4 py-8 mb-4 bg-white'>
        <h2 className='mb-2 text-xl font-semibold'>배송지 정보</h2>
        <p className='font-semibold'>{selectedItems.addressNickname}</p>
        <p className='text-sm text-gray-600'>{selectedItems.address}</p>
        <p className='text-sm text-gray-600'>{selectedItems.phoneNumber}</p>
        <div>
          <InformationCircleIcon className='w-5' />
          <p className='mt-2 text-sm text-gray-500'>배송지 변경을 원하시면 결제취소 후 다시 주문해주세요</p>
        </div>
      </div>

      <div className='w-full py-2 bg-white'>
        <div className='flex justify-between p-4'>
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

      <div className='sticky bottom-0 left-0 right-0 p-4 bg-white'>
        <BottomButton buttonText='확인했어요' buttonStyle='bg-main text-white' buttonFunc={buttonFunc} />
      </div>
    </div>
  );
};

export default OrderComplete;
