import { useState } from 'react';
import OrderList from '../../components/Order/OrderMypage/OrderList';
import UserInfo from '../../components/Order/OrderMypage/UserInfo';
import { ORDER_LIST_DUMMY_DATA } from '../../components/Order/orderDummyData';
import BottomButton from '../../components/common/button/BottomButton';

const MyOrdersList = () => {
  const [orderListData, setOrderListData] = useState(ORDER_LIST_DUMMY_DATA);
  orderListData.orderList.map(item => console.log(item));

  const buttonFunc = () => {
    console.log('더보기 버튼 클릭');
  };

  return (
    <div className='flex flex-col gap-5 p-4 bg-gray-100'>
      <UserInfo memberInfo={orderListData.memberInfo} />
      {orderListData.orderList.length > 0 && (
        <>
          <div className='flex items-center gap-3 text-gray-500'>
            <h5 className='mb-2 text-2xl font-semibold'>{'단건 주문'}</h5>
            <span>총 {orderListData.orderList.length}건</span>
          </div>
          {orderListData.orderList.map(order => (
            <OrderList order={order} key={order.orderId} />
          ))}
        </>
      )}

      {orderListData.subscriptionOrderList.length > 0 && (
        <>
          <div className='flex items-center gap-3 text-gray-500'>
            <h5 className='mb-2 text-2xl font-semibold'>{'정기 주문'}</h5>
            <span>총 {orderListData.subscriptionOrderList.length}건</span>
          </div>
          {orderListData.subscriptionOrderList.map(order => (
            <OrderList order={order} key={order.orderId} />
          ))}
        </>
      )}
      <BottomButton buttonText='확인했어요' buttonStyle='bg-main text-white' buttonFunc={buttonFunc} />
    </div>
  );
};

export default MyOrdersList;
