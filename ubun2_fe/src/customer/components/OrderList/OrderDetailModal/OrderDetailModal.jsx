import { Button, Modal } from 'flowbite-react';
import MemberInfo from '../../MemberList/MemberInfo';
import StatusBadge from '../../common/Badge/StatusBadge';
import { customModalTheme } from '../../common/Modal/ModalStyle';
import OrderDetailInfo from '../OrderDetailModal/OrderDetailInfo';
import SingleOrderProduct from '../OrderDetailModal/SingleOrderProduct';
import SubScriptionOrderProduct from '../OrderDetailModal/SubScriptionOrderProduct';

import { customModalTheme } from '../../common/Modal/ModalStyle';

import { orderInfo } from '../OrderDetailData'; // DUMMY DATA

const OrderDetailModal = ({ isOpen, setOpenModal, title, primaryButtonText, onPrimaryClick }) => {
  return (
    <>
      <Modal dismissible show={isOpen} onClose={() => setOpenModal(false)} theme={customModalTheme} size='4xl'>
        <Modal.Header>
          <div className='flex items-center justify-between w-full'>
            <div className='text-3xl font-bold'>{title}</div>
            <div className='ml-4 text-xs'>
              {orderInfo.orderStatus === 'APPROVED' ? (
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
            <MemberInfo member={orderInfo.member} title='주문 정보' />

            {/* 상품목록 */}
            {orderInfo.orderOption === 'SINGLE' ? (
              <SingleOrderProduct orderProductList={orderInfo.products} />
            ) : (
              <SubScriptionOrderProduct orderProductList={orderInfo.products} subscription={orderInfo.subscription} />
            )}

            {/* 배송지 및 결제정보 */}
            <OrderDetailInfo delivery={orderInfo.delivery} payment={orderInfo.payment} />
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
