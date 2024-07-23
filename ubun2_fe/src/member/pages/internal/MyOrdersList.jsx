import { useEffect, useState } from 'react';
import { useGetOrderList } from '../../api/Order/queris';
import OrderList from '../../components/Order/OrderMypage/OrderList';
import UserInfo from '../../components/Order/OrderMypage/UserInfo';

const MyOrdersList = () => {
  const { data: orderListResponse, isLoading, isError } = useGetOrderList();
  const [singleOrders, setSingleOrders] = useState([]);
  const [subscriptionOrders, setSubscriptionOrders] = useState([]);
  const [memberInfo, setMemberInfo] = useState({});

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

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <div className='flex flex-col gap-5 p-4 bg-gray-100'>
      <UserInfo memberInfo={memberInfo} />
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
    </div>
  );
};

export default MyOrdersList;
