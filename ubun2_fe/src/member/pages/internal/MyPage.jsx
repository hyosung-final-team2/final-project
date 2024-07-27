import { ArrowRightOnRectangleIcon, ChevronRightIcon, CreditCardIcon, ShoppingBagIcon, TruckIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubscriptionLineIcon from '../../../assets/images/subscription-line.svg';
import { useGetOrderList } from '../../api/Order/queris';
import {useLogout} from "../../../customer/api/common/Logout/queris.js";

function MyPage() {
  const { data: orderListResponse } = useGetOrderList();
  const [singleOrders, setSingleOrders] = useState([]);
  const [subscriptionOrders, setSubscriptionOrders] = useState([]);
  const [memberInfo, setMemberInfo] = useState({});
  const navigate = useNavigate();

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
        });
      }
    }
  }, [orderListResponse]);

  const myInfoItems = [
    { id: 1, name: '주문 관리', icon: ShoppingBagIcon, value: '/member/app/mypage/order-list' },
    { id: 2, name: '결제수단 관리', icon: CreditCardIcon, value: '/member/app/mypage/payment-list' },
    { id: 3, name: '배송지 관리', icon: TruckIcon, value: '/member/app/mypage/address-list' },
    { id: 4, name: '로그아웃', icon: ArrowRightOnRectangleIcon, value: '/logout' },
  ];

  const {mutate:logoutMutate} = useLogout("ROLE_MEMBER")

  const handleMyInfoMenu = value => {
    if (value === '/logout') {
      logoutMutate()
      return;
    }
    if (value === '/member/app/mypage/address-list') {
      navigate(value, { state: { isFromMyPage: true } });
      return;
    }
    navigate(value);
  };

  return (
    <div className='p-4 px-4 font-sans bg-gray-100'>
      <header className='flex items-center my-3'>
        <h1 className='text-2xl font-bold'>마이페이지</h1>
      </header>

      {/* User Info Card */}
      <div className='p-4 bg-white border-2 border-gray-100 rounded-xl'>
        <h5 className='mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {memberInfo.name}
          <span className='ml-1 text-base'>님의 주문 현황</span>
        </h5>

        <div className='grid grid-cols-2 gap-4 mb-6'>
          <div className='flex flex-col items-center'>
            <div className='p-3 mb-2 bg-blue-100 rounded-full'>
              <TruckIcon className='w-6 h-6 text-blue-500' />
            </div>
            <span className='font-semibold'>단건주문</span>
            <span className={`${memberInfo.singleOrders > 0 ? 'text-gray-800' : 'text-gray-400'}`}>{`${memberInfo.singleOrders} 건`}</span>
          </div>
          <div className='flex flex-col items-center'>
            <div className='p-3 mb-2 bg-gray-100 rounded-full'>
              <SubscriptionLineIcon className='w-6 h-6 text-gray-500' />
            </div>
            <span className='font-semibold'>정기주문</span>
            <span className={`${memberInfo.subscriptionOrders > 0 ? 'text-gray-800' : 'text-gray-400'}`}>{`${memberInfo.subscriptionOrders} 건`}</span>
          </div>
        </div>
      </div>

      {/* My Info Section */}
      <div className='mt-4'>
        <h2 className='my-4 text-xl font-semibold'>내 정보</h2>
        <div className='space-y-4 bg-white rounded-lg'>
          {myInfoItems.map(item => (
            <div key={item.id} className='flex items-center justify-between p-5 ' onClick={() => handleMyInfoMenu(item.value)}>
              <div className='flex items-center space-x-4'>
                <item.icon className='w-6 h-6 text-gray-500' />
                <span>{item.name}</span>
              </div>
              <ChevronRightIcon className='w-5 h-5 text-gray-400' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyPage;
