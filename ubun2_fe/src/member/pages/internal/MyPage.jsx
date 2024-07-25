import { ArrowRightOnRectangleIcon, ChevronRightIcon, CreditCardIcon, ShoppingBagIcon, TruckIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import SingleLineIcon from '../../../assets/images/single-line.svg';
import SubscriptionLineIcon from '../../../assets/images/subscription-line.svg';

function MyPage() {
  const navigate = useNavigate();

  const myInfoItems = [
    { id: 1, name: '주문 관리', icon: ShoppingBagIcon, value: '/member/app/mypage/order-list' },
    { id: 2, name: '결제수단 관리', icon: CreditCardIcon, value: '/member/app/mypage/payment-list' },
    { id: 3, name: '배송지 관리', icon: TruckIcon, value: '/member/app/addresses' },
    { id: 4, name: '로그아웃', icon: ArrowRightOnRectangleIcon, value: '/logout' },
  ];

  const handleMyInfoMenu = value => {
    if (value === '/logout') {
      console.log('TODO: 로그아웃 처리');
      localStorage.clear();
      navigate('/member/login');
      return;
    }
    navigate(value);
  };

  return (
    <div className='p-4 px-4 font-sans bg-white'>
      <header className='flex items-center my-3'>
        <h1 className='text-2xl font-bold'>마이페이지</h1>
      </header>

      {/* User Info Card */}
      <div className='p-6 bg-gray-100 mb-7 rounded-3xl'>
        <h5 className='mb-4 text-xl font-bold'>ㅁㅁㅁ 님</h5>
        <div className='flex justify-between'>
          <div className='flex items-center space-x-3'>
            <div className='p-3 bg-white rounded-full'>
              <SingleLineIcon className='w-6 h-6' />
            </div>
            <div>
              <p className='text-sm text-gray-500'>전체</p>
              <p className='font-semibold'>
                단건주문 <span className='ml-1 text-blue-500'>3</span>
              </p>
            </div>
          </div>
          <div className='flex items-center space-x-4'>
            <div className='p-3 bg-white rounded-3xl'>
              <SubscriptionLineIcon className='w-6 h-6' />
            </div>
            <div>
              <p className='text-sm text-gray-500'>전체</p>
              <p className='font-semibold'>
                정기주문 <span className='ml-1 text-blue-500'>3</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* My Info Section */}
      <div className='mt-4'>
        <h2 className='my-4 text-xl font-semibold'>내 정보</h2>
        <div className='space-y-4'>
          {myInfoItems.map(item => (
            <div key={item.id} className='flex items-center justify-between p-4 bg-white rounded-lg' onClick={() => handleMyInfoMenu(item.value)}>
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
