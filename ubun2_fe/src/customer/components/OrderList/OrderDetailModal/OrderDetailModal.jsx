import { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { useGetOrderDetail } from '../../../api/Order/OrderList/OrderModal/queris';
import { customModalTheme } from '../../common/Modal/ModalStyle';
import MemberInfo from '../../MemberList/MemberInfo';
import StatusBadge from '../../common/Badge/StatusBadge';
import OrderDetailInfo from '../OrderDetailModal/OrderDetailInfo';
import SingleOrderProduct from '../OrderDetailModal/SingleOrderProduct';
import SubscriptionOrderProduct from '../OrderDetailModal/SubScriptionOrderProduct';

const OrderDetailModal = ({ isOpen, setOpenModal, title, primaryButtonText, onPrimaryClick, selectedOrderDetail }) => {
  const { data: orderDetail, isLoading } = useGetOrderDetail(selectedOrderDetail.orderId, selectedOrderDetail.subscription);
  const orderInfo = orderDetail?.data?.data;
  const [selectedCycle, setSelectedCycle] = useState(orderInfo?.latestCycleNumber || 1);

  const handleCycleChange = cycle => {
    setSelectedCycle(cycle);
  };

  return (
    <>
      <Modal dismissible show={isOpen} onClose={() => setOpenModal(false)} theme={customModalTheme} size='4xl'>
        <Modal.Header>
          <div className='flex items-center justify-between w-full'>
            <div className='text-3xl font-bold'>{title}</div>
            <div className='ml-4 text-xs'>
              {orderInfo?.orderStatus === 'APPROVED' ? (
                <StatusBadge bgColor='bg-badge-green' txtColor='text-badge-green' badgeText='승인' />
              ) : (
                <StatusBadge bgColor='bg-badge-orange' txtColor='text-badge-orange' badgeText='변경' />
              )}
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className='space-y-4 flex-2'>
            {/* 회원정보 */}
            <MemberInfo
              member={{
                memberName: orderInfo?.memberName ?? '',
                memberEmail: orderInfo?.memberEmail ?? '',
                memberPhone: orderInfo?.memberPhone ?? '',
                memberCreatedAt: orderInfo?.createdAt ?? '',
              }}
              onlyInfo={true}
              title='주문 정보'
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
          <Button className='w-28 bg-custom-button-purple text-custom-font-purple' onClick={onPrimaryClick || (() => setOpenModal(false))}>
            <div>{primaryButtonText || '확인'}</div>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderDetailModal;
