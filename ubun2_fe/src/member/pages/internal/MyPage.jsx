import { ArrowRightOnRectangleIcon, ChevronRightIcon, CreditCardIcon, ShoppingBagIcon, TruckIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubscriptionLineIcon from '../../../assets/images/subscription-line.svg';
import { useGetOrderList } from '../../api/Order/queris';
import { useLogout } from '../../../customer/api/common/Logout/queris.js';

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

  const { mutate: logoutMutate } = useLogout('ROLE_MEMBER');

  const handleMyInfoMenu = value => {
    if (value === '/logout') {
      logoutMutate();
      return;
    }
    if (value === '/member/app/mypage/address-list') {
      navigate(value, { state: { isFromMyPage: true } });
      return;
    }
    navigate(value);
  };

  return (
    <div className='flex flex-col min-h-full bg-custom-mypage-back-bg'>
      <div className='p-4'>
        {/* User Info Card */}
        <div className='p-4 mb-4 rounded-xl'>
          <div className='flex flex-col items-center mb-4'>
            <img src='/src/assets/images/png/user-icon.png' alt='Avatar' className='mb-2 rounded-full w-36 h-36' />
            <h5 className='mb-4 ml-1 text-3xl font-bold tracking-tight text-gray-900 dark:text-white'>
              {memberInfo?.name}
              <span className='ml-1 text-base'>님</span>
            </h5>
          </div>

          <div className='flex gap-2 p-6 mb-4 bg-custom-mypage-bg justify-evenly rounded-3xl'>
            <div className='flex items-center gap-2'>
              <div className='flex items-center justify-center w-10 h-10 mb-1 bg-white rounded-full'>
                <TruckIcon className='w-6 h-6' />
              </div>
              <div className='flex flex-col text-white'>
                <span className='font-semibold'>단건주문</span>
                <span>{`${memberInfo.singleOrders ? memberInfo.singleOrders : '-'} 건`}</span>
              </div>
            </div>
            <div className='border-l border-gray-100'></div>
            <div className='flex items-center gap-2 text-white'>
              <div className='flex items-center justify-center w-10 h-10 mb-1 bg-white rounded-full'>
                <SubscriptionLineIcon className='w-6 h-6 text-gray-500' />
              </div>
              <div className='flex flex-col'>
                <span className='font-semibold'>정기주문</span>
                <span>{`${memberInfo.subscriptionOrders ? memberInfo.subscriptionOrders : '-'} 건`}</span>
              </div>
            </div>
          </div>
        </div>

        {/* My Info Section */}
        <div className='p-4 mt-4'>
          <div className='py-4 space-y-4 bg-white rounded-3xl'>
            <h2 className='p-4 text-xl font-semibold text-gray-500'>내 정보</h2>
            {myInfoItems.map(item => (
              <div key={item.id} className='flex items-center justify-between p-5' onClick={() => handleMyInfoMenu(item.value)}>
                <div className='flex items-center space-x-4'>
                  <item.icon className='w-6 h-6 text-gray-700' />
                  <span className='text-black'>{item.name}</span>
                </div>
                <ChevronRightIcon className='w-5 h-5 text-gray-700' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
