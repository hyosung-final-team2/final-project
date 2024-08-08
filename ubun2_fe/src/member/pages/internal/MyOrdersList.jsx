import { useState, useEffect } from 'react';
import { useGetOrderStatusSummary } from '../../api/Order/queris';
import SingleOrderList from '../../components/Order/OrderMypage/SingleOrderList';
import SubscriptionOrderList from '../../components/Order/OrderMypage/SubscriptionOrderList';
import UserInfo from '../../components/Order/OrderMypage/UserInfo';
import { useGetMemberName } from '../../api/Mypage/queris';
import EmptyOrderBox from '../../components/Order/OrderMypage/EmptyOrderBox';

const MyOrdersList = () => {
  const [activeTab, setActiveTab] = useState('single');
  const { data: orderStatusSummary, isLoading, error } = useGetOrderStatusSummary();
  const { data: memberName } = useGetMemberName();
  const [memberInfo, setMemberInfo] = useState({});

  useEffect(() => {
    if (orderStatusSummary?.data) {
      setMemberInfo({
        name: memberName?.data?.data?.memberName,
        singleOrders: orderStatusSummary?.data?.singleOrders,
        subscriptionOrders: orderStatusSummary?.data?.subscriptionOrders,
        pending: orderStatusSummary?.data?.pending,
        denied: orderStatusSummary?.data?.denied,
        approved: orderStatusSummary?.data?.approved,
      });
    }
  }, [orderStatusSummary]);

  if (error) return <div>Error loading data</div>;

  const hasOrders = memberInfo.singleOrders > 0 || memberInfo.subscriptionOrders > 0;

  return (
    <div className='flex flex-col h-full gap-10 p-4 bg-white'>
      <UserInfo memberInfo={memberInfo} />

      {hasOrders ? (
        <>
          <div className='flex w-full'>
            <div className='flex justify-around w-full mt-3'>
              <div className='w-full text-center cursor-pointer' onClick={() => setActiveTab('single')}>
                <h2 className={`text-2xl font-bold ${activeTab === 'single' ? 'text-main' : 'text-gray-400'}`}>단건주문</h2>
                {activeTab === 'single' && <div className='h-1 mt-2 bg-indigo-700'></div>}
              </div>
              <div className='w-full text-center cursor-pointer' onClick={() => setActiveTab('subscription')}>
                <h2 className={`text-2xl font-bold ${activeTab === 'subscription' ? 'text-main' : 'text-gray-400'}`}>정기주문</h2>
                {activeTab === 'subscription' && <div className='h-1 mt-2 bg-indigo-700'></div>}
              </div>
            </div>
            {activeTab === 'single' && <div className='h-1 mt-2 bg-indigo-700'></div>}
          </div>
          {activeTab === 'single' ? <SingleOrderList /> : <SubscriptionOrderList />}
        </>
      ) : (
        <div className='my-auto'>
          <EmptyOrderBox />
        </div>
      )}
    </div>
  );
};

export default MyOrdersList;
