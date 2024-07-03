import { Button, Modal } from 'flowbite-react';
import MemberInfo from '../../MemberList/MemberInfo';
import SingleOrderProduct from '../OrderDetailModal/SingleOrderProduct';
import OrderDetailInfo from '../OrderDetailModal/OrderDetailInfo';
import StatusBadge from '../../common/Badge/StatusBadge';
import SubScriptionOrderProduct from '../OrderDetailModal/SubScriptionOrderProduct';

const OrderDetailModal = ({ isOpen, setOpenModal, title, primaryButtonText, onPrimaryClick }) => {
  const customTheme = {
    root: {
      base: 'fixed inset-x-0 top-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full',
      show: {
        on: 'flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80',
        off: 'hidden',
      },
      sizes: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl',
      },
      positions: {
        'top-left': 'items-start justify-start',
        'top-center': 'items-start justify-center',
        'top-right': 'items-start justify-end',
        'center-left': 'items-center justify-start',
        center: 'items-center justify-center',
        'center-right': 'items-center justify-end',
        'bottom-right': 'items-end justify-end',
        'bottom-center': 'items-end justify-center',
        'bottom-left': 'items-end justify-start',
      },
    },
    content: {
      base: 'relative h-full w-full p-4 md:h-auto',
      inner: 'relative flex max-h-[90dvh] flex-col rounded-3xl bg-white dark:bg-gray-700',
    },
    body: {
      base: 'flex flex-col overflow-auto px-10 pt-4',
    },
    header: {
      base: 'flex items-start justify-between mx-10 mt-10 pb-2 border-b', // 변경된 부분
      title: 'text-xl font-medium text-gray-900 dark:text-white',
      close: {
        base: 'ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white',
        icon: 'h-5 w-5',
      },
    },
    footer: {
      base: 'flex items-center space-x-2 justify-end px-10 pb-8 pt-6 border-none', // 변경된 부분
    },
  };

  // DUMMY_DATA
  const orderInfo = {
    member: {
      memberName: '홍길동',
      memberEmail: 'owen123@naver.com',
      memberPhone: '010-2401-1235',
      memberCreatedAt: '2024-01-14',
    },
    products: [
      {
        orderProductId: 1,
        productName: '싱싱한 목장 우유',
        productDescription: '싱싱한 목장 우유 함 무 볼텨?',
        price: 3000,
        quantity: 2,
        productDiscount: 20,
        orderProductStatus: 'APPROVED',
        orderOption: 'SINGLE',
        productImageOriginalName: '목장우유',
        productImagePath: 'https://m.seoulmilk.co.kr/Product_Data/pimages/v_001_152.png',
      },
      {
        orderProductId: 2,
        productName: '싱싱한 목장 나쵸',
        productDescription: '싱싱한 목장 나쵸 함 무 볼텨?',
        price: 2000,
        quantity: 2,
        productDiscount: 20,
        orderProductStatus: 'MODIFIED',
        orderOption: 'SINGLE',
        productImageOriginalName: '냠냠 나쵸',
        productImagePath: 'https://sitem.ssgcdn.com/68/45/36/item/1000559364568_i1_750.jpg',
      },
      {
        orderProductId: 3,
        productName: '싱싱한 목장 연어',
        productDescription: '싱싱한 목장 연어 함 무 볼텨?',
        price: 10000,
        quantity: 2,
        productDiscount: 20,
        orderProductStatus: 'APPROVED',
        orderOption: 'SINGLE',
        productImageOriginalName: '싱싱 연어',
        productImagePath: 'https://img.hankyung.com/photo/202110/99.27705915.1.jpg',
      },
    ],
    delivery: {
      addresssNickname: '교육장',
      address: '서울특별시 창경궁로 254 11동 111호',
    },
    payment: {
      paymentMethodId: 1,
      paymentType: 'CARD',
      paymentNickname: '와우와우카드',
      cardCompanyName: '우리카드',
      cardNumber: '1111-2222-3333-xxxx',
      /*
      계좌인 경우
      paymentType: 'ACCOUNT',
      paymentNickname: '와우와우계좌',
      bankName: '우리은행',
      accountNumber: '1002-***-***-004',
      */
    },
    subscription: {
      intervalDays: 7,
      cycleNumber: 2,
      createdAt: '2024-07-02',
    },
    orderStatus: 'APPROVED', // APPROVED , MODIFIED
    orderOption: 'SUBSCRIPTION', // SINGLE, SUBSCRIPTION, BOTH
  };

  return (
    <>
      <Modal dismissible show={isOpen} onClose={() => setOpenModal(false)} theme={customTheme} size='5xl'>
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
