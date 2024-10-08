import SubscriptionLineIcon from '../../../../assets/images/subscription-line.svg';
import { CheckCircleIcon, ClockIcon, TruckIcon, XCircleIcon } from '@heroicons/react/24/outline';

const UserInfo = ({ memberInfo }) => {
  const OrderStatusBox = ({ icon: Icon, label, count, bgColor, textColor }) => (
    <div className={`flex flex-col items-center p-3 rounded-lg ${bgColor}`}>
      <Icon className={`w-6 h-6 mb-2 ${textColor}`} />
      <span className='text-sm font-medium text-gray-600'>{label}</span>
      <span className={`text-lg ${textColor}`}>{count}건</span>
    </div>
  );

  return (
    <div className='p-4 mt-3 bg-white border border-gray-100 rounded-xl'>
      <div>
        <h5 className='mb-6 text-xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {memberInfo.name}
          <span className='ml-1 text-base'>님의 주문 현황</span>
        </h5>

        <div className='grid grid-cols-2 gap-4 mb-6'>
          <div className='flex flex-col items-center'>
            <div className='p-3 mb-2 bg-purple-100 rounded-full'>
              <TruckIcon className='w-6 h-6 text-black' />
            </div>
            <span className='font-semibold'>단건주문</span>
            <span className={`${memberInfo.singleOrders > 0 ? 'text-black' : 'text-gray-400'}`}>{`${memberInfo.singleOrders} 건`}</span>
          </div>
          <div className='flex flex-col items-center'>
            <div className='p-3 mb-2 bg-purple-100 rounded-full'>
              <SubscriptionLineIcon className='w-6 h-6 text-gray-500' />
            </div>
            <span className='font-semibold'>정기주문</span>
            <span className={`${memberInfo.subscriptionOrders > 0 ? 'text-black' : 'text-gray-400'}`}>{`${memberInfo.subscriptionOrders} 건`}</span>
          </div>
        </div>
      </div>

      <div className='mt-6 space-y-3'>
        <div className='grid grid-cols-3 gap-4'>
          <OrderStatusBox
            icon={ClockIcon}
            label='승인대기'
            count={memberInfo.pending}
            bgColor={memberInfo.pending > 0 ? 'bg-orange-50' : 'bg-gray-50'}
            textColor={memberInfo.pending > 0 ? 'text-orange-600' : 'text-gray-400'}
          />
          <OrderStatusBox
            icon={XCircleIcon}
            label='승인거절'
            count={memberInfo.denied}
            bgColor={memberInfo.denied > 0 ? 'bg-red-50' : 'bg-gray-50'}
            textColor={memberInfo.denied > 0 ? 'text-red-600' : 'text-gray-400'}
          />
          <OrderStatusBox
            icon={CheckCircleIcon}
            label='승인완료'
            count={memberInfo.approved}
            bgColor={memberInfo.approved > 0 ? 'bg-blue-50' : 'bg-gray-50'}
            textColor={memberInfo.approved > 0 ? 'text-blue-600' : 'text-gray-400'}
          />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
