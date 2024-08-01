import { useEffect, useState } from 'react';
import { useGetOrderList } from '../../api/Order/queris';
import SlideUpModal from '../../components/common/SlideUpModal';
import OrderList from '../../components/Order/OrderMypage/OrderList';
import UserInfo from '../../components/Order/OrderMypage/UserInfo';
import useModalStore from '../../store/modalStore';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const MyOrdersList = () => {
  const [selectedPeriod, setSelectedPeriod] = useState({ value: null, label: '전체', periodType: null, periodValue: null });
  const { data: orderListResponse, isLoading, isError } = useGetOrderList(selectedPeriod.periodType, selectedPeriod.periodValue);
  const [singleOrders, setSingleOrders] = useState([]);
  const [subscriptionOrders, setSubscriptionOrders] = useState([]);
  const [memberInfo, setMemberInfo] = useState({});
  const { modalState, setModalState } = useModalStore();

  const periodOptions = [
    { value: null, label: '전체', periodType: null, periodValue: null },
    { value: 'WEEK', label: '1주일', periodType: 'WEEK', periodValue: 1 },
    { value: 'MONTH', label: '1달', periodType: 'MONTH', periodValue: 1 },
    { value: 'THREE_MONTHS', label: '3달', periodType: 'MONTH', periodValue: 3 },
  ];

  useEffect(() => {
    if (orderListResponse?.data?.data) {
      const orders = orderListResponse.data.data;
      const single = orders.filter(order => !order.subscription);
      const subscription = orders.filter(order => order.subscription);
      setSingleOrders(single);
      setSubscriptionOrders(subscription);

      if (orders.length > 0) {
        setMemberInfo({
          name: orders[0].memberName,
          singleOrders: single.length,
          subscriptionOrders: subscription.length,
          pending: orders.filter(order => order.orderStatus === 'PENDING').length,
          denied: orders.filter(order => order.orderStatus === 'DENIED').length,
          approved: orders.filter(order => order.orderStatus === 'APPROVED').length,
        });
      }
    }
  }, [orderListResponse]);

  const handlePeriodChange = newPeriod => {
    setSelectedPeriod(newPeriod);
    setModalState(false);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <div className='flex flex-col gap-5 p-4 bg-white'>
      <UserInfo memberInfo={memberInfo} />

      <div className='flex items-center justify-between'>
        <h3 className='text-2xl font-bold'>주문 목록</h3>
        <button
          onClick={() => setModalState(true)}
          className='flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          {selectedPeriod.label}
          <ChevronDownIcon className='w-5 h-5 ml-2 -mr-1' aria-hidden='true' />
        </button>
      </div>

      {singleOrders.length > 0 && (
        <>
          <div className='flex items-center gap-3 mt-5 text-main'>
            <h5 className='text-3xl font-semibold'>{'단건 주문'}</h5>
            <span>총 {singleOrders.length}건</span>
          </div>
          {singleOrders.map(order => (
            <OrderList order={order} key={order.orderId} />
          ))}
        </>
      )}

      {subscriptionOrders.length > 0 && (
        <>
          <div className='flex items-center gap-3 mt-5 text-main'>
            <h5 className='text-3xl font-semibold'>{'정기 주문'}</h5>
            <span>총 {subscriptionOrders.length}건</span>
          </div>
          {subscriptionOrders.map(order => (
            <OrderList order={order} key={order.orderId} />
          ))}
        </>
      )}

      <SlideUpModal isOpen={modalState} setIsModalOpen={setModalState} headerText='조회 기간 선택' isButton={false}>
        <div className='flex flex-col items-start space-y-4'>
          {periodOptions.map(option => (
            <button
              key={option.value}
              onClick={() => handlePeriodChange(option)}
              className={`w-full p-2 text-lg text-left ${selectedPeriod.value === option.value ? 'text-blue-500 font-bold' : 'text-gray-500'}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </SlideUpModal>
    </div>
  );
};

export default MyOrdersList;
