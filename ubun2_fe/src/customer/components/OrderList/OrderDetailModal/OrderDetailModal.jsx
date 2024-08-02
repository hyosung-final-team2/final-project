import { Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useGetOrderDetail } from '../../../api/Order/OrderList/OrderModal/queris';
import { formatDate } from '../../../utils/dateFormat';
import { customModalTheme } from '../../common/Modal/ModalStyle';
import MemberInfo from '../../MemberList/MemberInfo';
import OrderDetailInfo from '../OrderDetailModal/OrderDetailInfo';
import SingleOrderProduct from '../OrderDetailModal/SingleOrderProduct';
import SubscriptionOrderProduct from '../OrderDetailModal/SubScriptionOrderProduct';
import { useSendPersonalAlarm } from '../../../api/notification/queris.js';

const commonButtonStyles = {
  APPROVED:
    'px-6 py-3 rounded-lg transition duration-200 border border-gray-200 shadow-md bg-badge-green bg-opacity-30 text-badge-green hover:text-white hover:bg-badge-green',
  DENIED:
    'px-6 py-3 rounded-lg transition duration-200 border border-gray-200 shadow-md bg-badge-red bg-opacity-30 text-badge-red hover:text-white hover:bg-badge-red',
};

const OrderDetailModal = ({ isOpen, setOpenModal, title, primaryButtonText, onPrimaryClick, selectedOrderDetail, handleOrderUpdate }) => {
  const { data: orderDetail, isLoading } = useGetOrderDetail(selectedOrderDetail.orderId, selectedOrderDetail.subscription);
  const orderInfo = orderDetail?.data?.data;
  console.log(orderInfo);
  const [selectedCycle, setSelectedCycle] = useState(1);

  const { mutate: sendPersonalAlarmMutate } = useSendPersonalAlarm(orderInfo?.memberId, orderInfo?.orderId, orderInfo?.intervalDays);

  useEffect(() => {
    if (orderInfo) {
      setSelectedCycle(orderInfo.latestCycleNumber || 1);
    }
  }, [orderInfo]);

  const handleCycleChange = cycle => {
    setSelectedCycle(cycle);
  };

  const handleCloseModal = () => {
    setSelectedCycle(1);
    setOpenModal(false);
  };

  const handleApprove = () => {
    handleOrderUpdate([{ orderId: selectedOrderDetail.orderId, subscription: selectedOrderDetail.subscription }], 'APPROVED');
    sendPersonalAlarmMutate(true);
    handleCloseModal();
  };

  const handleCancel = () => {
    handleOrderUpdate([{ orderId: selectedOrderDetail.orderId, subscription: selectedOrderDetail.subscription }], 'DENIED');
    sendPersonalAlarmMutate(false);
    handleCloseModal();
  };

  return (
    <>
      <Modal dismissible show={isOpen} onClose={handleCloseModal} theme={customModalTheme} size='4xl'>
        <Modal.Header>
          <div className='flex items-center justify-between w-full'>
            <div className='text-3xl font-bold'>{title}</div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className='space-y-4 flex-2'>
            {/* 회원정보 */}
            <MemberInfo
              MemberInfoData={{
                memberName: orderInfo?.memberName ?? '',
                memberEmail: orderInfo?.memberEmail ?? '',
                memberPhone: orderInfo?.memberPhone ?? '',
                memberCreatedAt: formatDate(orderInfo?.createdAt) ?? '',
              }}
              onlyInfo={true}
              title='주문 정보'
              isPending={orderInfo?.orderStatus === 'PENDING'}
              isOrder={true}
            />

            {/* 상품 목록 */}
            {selectedOrderDetail.subscription ? (
              <SubscriptionOrderProduct orderInfo={orderInfo} selectedCycle={selectedCycle} onCycleChange={handleCycleChange} />
            ) : (
              <SingleOrderProduct orderInfo={orderInfo} />
            )}

            {/* 배송지 및 결제정보 */}
            <OrderDetailInfo orderInfo={orderInfo} selectedCycle={selectedCycle} isSubscription={selectedOrderDetail.subscription} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          {orderInfo?.orderStatus === 'PENDING' ? (
            <div className='flex gap-2'>
              <button onClick={handleApprove} className={`${commonButtonStyles.APPROVED}`}>
                승인
              </button>
              <button onClick={handleCancel} className={`${commonButtonStyles.DENIED}`}>
                취소
              </button>
            </div>
          ) : (
            <button
              type='button'
              className='focus:outline-none w-20 text-custom-font-purple bg-custom-button-purple hover:bg-purple-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
              onClick={onPrimaryClick || handleCloseModal}
            >
              <div>{primaryButtonText || '확인'}</div>
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderDetailModal;
