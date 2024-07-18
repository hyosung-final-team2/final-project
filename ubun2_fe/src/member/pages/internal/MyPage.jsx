import { useNavigate } from 'react-router-dom';
import SingleLineIcon from '../../../assets/images/single-line.svg';
import SubscriptionLineIcon from '../../../assets/images/subscription-line.svg';
import ChevronRightIcon from '@heroicons/react/24/solid/ChevronRightIcon';

function MyPage() {
  const navigate = useNavigate();

  // 관리 항목 데이터 배열
  const myInfoItems = [
    { id: 1, name: '내 정보 관리', icon: ChevronRightIcon, value: '/member/app/mypage/myinfo' },
    { id: 2, name: '결제수단 관리', icon: ChevronRightIcon, value: '/member/app/mypage/payment' },
    { id: 3, name: '배송지 관리', icon: ChevronRightIcon, value: '/member/app/mypage/delivery' },
  ];

  const handleMyInfoMenu = value => {
    navigate(value);
  };

  return (
    <div className='flex flex-col gap-10 px-4 py-8'>
      {/* User Info Card */}
      <div className='p-6 mb-4 bg-white rounded-3xl'>
        <h5 className='mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white'>홍길동 님</h5>
        <div className='flex justify-between w-full px-2'>
          <div className='flex items-center gap-3'>
            <div className='p-3 bg-gray-200 rounded-2xl'>
              <SingleLineIcon className='w-6 h-6' />
            </div>
            <div>
              <p className='text-sm text-gray-500'>전체</p>
              <p className='font-semibold text-md'>
                단건주문
                <span className='ml-1 text-sm text-main'>3</span>
              </p>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <div className='p-3 bg-gray-200 rounded-2xl'>
              <SubscriptionLineIcon className='w-6 h-6' />
            </div>
            <div>
              <p className='text-sm text-gray-500'>전체</p>
              <p className='font-semibold'>
                정기주문 <span className='ml-1 text-sm text-main'>3</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* My Info Section */}
      <div className='flex flex-col gap-3'>
        <h5 className='text-xl font-bold tracking-tight text-gray-900 dark:text-white'>내 정보</h5>
        <div className='p-8 mb-4 bg-white rounded-3xl'>
          <ul className='flex flex-col gap-2'>
            {myInfoItems.map(item => (
              <li key={item.id} className='flex items-center justify-between py-2 last:border-b-0' onClick={() => handleMyInfoMenu(item.value)}>
                {' '}
                {/* 4단계 */}
                <span>{item.name}</span>
                <item.icon className='w-4 h-4 text-gray-500' />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default MyPage;
