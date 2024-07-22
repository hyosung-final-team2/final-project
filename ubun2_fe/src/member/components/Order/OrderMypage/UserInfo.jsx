import SingleLineIcon from '../../../../assets/images/single-line.svg';
import SubscriptionLineIcon from '../../../../assets/images/subscription-line.svg';

const UserInfo = ({ memberInfo }) => {
  return (
    <div className='p-6 mb-4 bg-white rounded-3xl'>
      <h5 className='mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white'>{memberInfo.name} 님</h5>
      <div className='flex justify-between w-full px-2'>
        <div className='flex items-center gap-3'>
          <div className='p-3 bg-gray-200 rounded-2xl'>
            <SingleLineIcon className='w-6 h-6' />
          </div>
          <div>
            <p className='text-sm text-gray-500'>전체</p>
            <p className='font-semibold text-md'>
              단건주문
              <span className='ml-1 text-sm text-main'>{memberInfo.singleOrders}</span>
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
              정기주문 <span className='ml-1 text-sm text-main'>{memberInfo.subscriptionOrders}</span>
            </p>
          </div>
        </div>
      </div>
      <div className='flex justify-between mt-6'>
        <div className='flex gap-1'>
          <span className='text-purple-600'>승인대기</span>
          <span className='text-purple-600'>{memberInfo.pending} 건</span>
        </div>

        <div className='flex gap-2'>
          <span className='text-red-600'>승인거절</span>
          <span className='text-red-600'>{memberInfo.denied} 건</span>
        </div>
        <div className='flex gap-2'>
          <span className='text-blue-600'>승인완료</span>
          <span className='text-blue-600'>{memberInfo.approved} 건</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
