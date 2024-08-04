import { ArrowRightOnRectangleIcon, ChevronRightIcon, CreditCardIcon, ShoppingBagIcon, TruckIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubscriptionLineIcon from '../../../assets/images/subscription-line.svg';
import User from '../../../assets/images/user.svg';
import { useLogout } from '../../../customer/api/common/Logout/queris.js';
import { useGetMemberName } from '../../api/Mypage/queris.js';
import { useGetOrderStatusSummary } from '../../api/Order/queris.js';

function MyPage() {
  const [memberInfo, setMemberInfo] = useState({});
  const navigate = useNavigate();
  const { data: memberName } = useGetMemberName();

  const { data: orderStatusSummary, isLoading, error } = useGetOrderStatusSummary();

  useEffect(() => {
    if (orderStatusSummary?.data) {
      setMemberInfo({
        singleOrders: orderStatusSummary?.data?.singleOrders || 0,
        subscriptionOrders: orderStatusSummary?.data?.subscriptionOrders || 0,
      });
    }
  }, [orderStatusSummary]);

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

  const handleOrderClick = orderType => {
    navigate('/member/app/mypage/order-list', { state: { orderType } });
  };

  return (
    <div className='flex flex-col min-h-full bg-custom-mypage-back-bg'>
      <div className='p-2'>
        {/* User Info Card */}
        <div className='p-3 mb-4 rounded-xl'>
          <div className='flex flex-col items-center mb-4'>
            <User className='mb-2 rounded-lg w-28 h-28' />
            <h5 className='mb-4 ml-1 text-3xl font-bold tracking-tight text-gray-900 dark:text-white'>
              <span className='ml-1 text-base'>{memberName?.data?.data?.memberName}님</span>
            </h5>
          </div>

          <div className='flex gap-2 p-6 mb-4 bg-custom-mypage-bg justify-evenly rounded-3xl'>
            <div className='flex items-center gap-2' onClick={() => handleOrderClick('single')}>
              <div className='flex items-center justify-center w-10 h-10 mb-1 bg-white rounded-full'>
                <TruckIcon className='w-6 h-6' />
              </div>
              <div className='flex flex-col text-white'>
                <span className='font-semibold'>단건주문</span>
                <span>{`${memberInfo.singleOrders ? memberInfo.singleOrders : '-'} 건`}</span>
              </div>
            </div>
            <div className='border-l border-gray-100'></div>
            <div className='flex items-center gap-2 text-white' onClick={() => handleOrderClick('subscription')}>
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
        <div className='p-3 mt-4'>
          <div className='px-8 py-4 space-y-4 bg-white rounded-3xl'>
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
