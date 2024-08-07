import React, { useState, useEffect, useCallback } from 'react';
import { useGetSubscriptionOrderList } from '../../../api/Order/queris';
import OrderList from './OrderList';
import SlideUpModal from '../../common/SlideUpModal';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import useModalStore from '../../../store/modalStore';
import { myOrderPeriodOptions } from '../orderModalContent';
import GlobalLoader from '../../../../customer/components/common/Loader/GlobalLoader';

const SubscriptionOrderList = () => {
  const [selectedPeriod, setSelectedPeriod] = useState({ value: null, label: '전체', periodType: null, periodValue: null });
  const [size] = useState(10);
  const { data, fetchNextPage, hasNextPage, isLoading, isError, isFetchingNextPage } = useGetSubscriptionOrderList(
    size,
    selectedPeriod.periodType,
    selectedPeriod.periodValue
  );
  const { modalState, setModalState } = useModalStore();
  const handlePeriodChange = newPeriod => {
    setSelectedPeriod(newPeriod);
    setModalState(false);
  };

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      loadMore();
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  if (isLoading) return <GlobalLoader />;
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <div>
      <div className='flex items-center justify-end mt-1 mb-10'>
        <button
          onClick={() => setModalState(true)}
          className='flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          {selectedPeriod.label}
          <ChevronDownIcon className='w-5 h-5 ml-2 -mr-1' aria-hidden='true' />
        </button>
      </div>

      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.data.data.content.map(order => (
            <OrderList order={order} key={order.orderId} />
          ))}
        </React.Fragment>
      ))}

      {hasNextPage && !isFetchingNextPage && (
        <button onClick={loadMore} className='w-full py-2 mt-4 font-bold text-white rounded-lg bg-main h-14'>
          더 보기
        </button>
      )}

      <SlideUpModal isOpen={modalState} setIsModalOpen={setModalState} headerText='조회 기간 선택' isButton={false}>
        <div className='flex flex-col items-start space-y-4'>
          {myOrderPeriodOptions.map(option => (
            <button
              key={option.value}
              onClick={() => handlePeriodChange(option)}
              className={`w-full p-2 text-lg text-left ${selectedPeriod.value === option.value ? 'text-blue-500 font-bold' : 'text-gray-500'}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </SlideUpModal>
    </div>
  );
};

export default SubscriptionOrderList;
