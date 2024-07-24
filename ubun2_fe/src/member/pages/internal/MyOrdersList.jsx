import { useEffect, useState } from 'react';
import { useGetOrderList } from '../../api/Order/queris';
import OrderList from '../../components/Order/OrderMypage/OrderList';
import UserInfo from '../../components/Order/OrderMypage/UserInfo';
import useModalStore from '../../store/modalStore';
import SlideUpModal from '../../components/common/SlideUpModal';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';

const MyOrdersList = () => {
  const { data: orderListResponse, isLoading, isError } = useGetOrderList();
  const [singleOrders, setSingleOrders] = useState([]);
  const [subscriptionOrders, setSubscriptionOrders] = useState([]);
  const [memberInfo, setMemberInfo] = useState({});
  const [period, setPeriod] = useState('ALL');
  const { modalState, setModalState } = useModalStore();

  const periodOptions = [
    { value: 'ALL', label: '전체' },
    { value: 'WEEK', label: '1주일' },
    { value: 'MONTH', label: '1달' },
    { value: 'THREE_MONTHS', label: '3달' },
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
    setPeriod(newPeriod);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <div className='flex flex-col gap-5 p-4 bg-gray-100'>
      <UserInfo memberInfo={memberInfo} />
      <div className='flex items-center w-full gap-3 mb-4 font-bold'>
        <div onClick={() => setModalState(true)} className='inline-flex p-2 border-none rounded-md text-main bg-main bg-opacity-5'>
          <input type='input' value={'기간 선택'} className='min-w-20 bg-transparent cursor-pointer max-w-[10dvw]' readOnly />
          <ChevronDownIcon className='w-5' />
        </div>
      </div>

      {singleOrders.length > 0 && (
        <>
          <div className='flex items-center gap-3 mt-3 text-gray-500'>
            <h5 className='mb-2 text-3xl font-semibold'>{'단건 주문'}</h5>
            <span>총 {singleOrders.length}건</span>
          </div>
          {singleOrders.map(order => (
            <OrderList order={order} key={order.orderId} />
          ))}
        </>
      )}

      {subscriptionOrders.length > 0 && (
        <>
          <div className='flex items-center gap-3 text-gray-500'>
            <h5 className='mb-2 text-3xl font-semibold'>{'정기 주문'}</h5>
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
              onClick={() => {
                handlePeriodChange(option.value);
                setModalState(false);
              }}
              className='p-2 text-lg text-gray-500'
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
