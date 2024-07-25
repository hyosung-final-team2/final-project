import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '../../../assets/images/arrow.svg';
import CardIcon from '../../../assets/images/card.svg';
import CheckIcon from '../../../assets/images/check.svg';
import { useCheckIfPasswordExists, useGetAccounts, useGetCards } from '../../api/Payment/queries';
import BottomButton from '../../components/common/button/BottomButton';
import SlideUpModal from '../../components/common/SlideUpModal';
import { getPng } from '../../components/PaymentMethod/CardList';
import PaymentItem from '../../components/PaymentMethod/PaymentItem';
import useOrderDataStore from '../../store/order/orderDataStore';
import useOrderItemsStore from '../../store/order/orderItemStore';
import toast from 'react-hot-toast';
import { errorToastStyle } from '../../api/toastStyle';

const ChoosePayment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: cards } = useGetCards();
  const { data: accounts } = useGetAccounts();
  const { data: passwordExists } = useCheckIfPasswordExists();
  const navigate = useNavigate();

  const { orderData, selectedPaymentMethodId, setSelectedPaymentMethodId, selectedAddressId, setSelectedPaymentMethodType, setOrderData } = useOrderDataStore();

  const cardList = cards?.data?.data || [];
  const accountList = accounts?.data?.data || [];
  const isPasswordSet = passwordExists?.data?.data || false;

  const buttonStyle = 'bg-main text-white';

  const handleBottomButtonClick = () => {
    if (!isPasswordSet) {
      navigate('/member/app/password');
    }
  };

  const paymentMethods = useMemo(() => {
    const methods = [
      ...accountList.map(account => ({
        ...account,
        icon: <img className='w-10 h-10' src={`/src/assets/images/png/${getPng(account.bankName)}`} alt='' />,
        title: account.paymentMethodNickname,
        subtitle: `${account.bankName} ${account.accountNumber}`,
        defaultStatus: account.defaultStatus,
        type: 'ACCOUNT',
      })),
      ...cardList.map(card => ({
        ...card,
        icon: <img className='w-10 h-10' src={`/src/assets/images/png/${getPng(card.cardCompanyName)}`} alt='' />,
        title: card.paymentMethodNickname,
        subtitle: `${card.cardCompanyName} ${card.cardNumber}`,
        defaultStatus: card.defaultStatus,
        type: 'CARD',
      })),
    ];

    const defaultMethod = methods.find(method => method.defaultStatus);
    const otherMethods = methods.filter(method => !method.defaultStatus);

    return { defaultMethod, otherMethods, allMethods: methods };
  }, [accountList, cardList]);

  const selectedPaymentMethod = useMemo(() => {
    return paymentMethods.allMethods.find(method => method.paymentMethodId === selectedPaymentMethodId) || paymentMethods.defaultMethod || null;
  }, [paymentMethods, selectedPaymentMethodId]);

  useEffect(() => {
    if (paymentMethods.defaultMethod && !selectedPaymentMethodId) {
      setSelectedPaymentMethodId(paymentMethods.defaultMethod.paymentMethodId);
      setSelectedPaymentMethodType(paymentMethods.defaultMethod.type);
    }
  }, []);

  const handlePaymentMethodSelect = useCallback(
    method => {
      setSelectedPaymentMethodId(method.paymentMethodId);
      setSelectedPaymentMethodType(method.type);
      setIsModalOpen(false);
    },
    [setSelectedPaymentMethodId, setSelectedPaymentMethodType]
  );

  const { totals } = useOrderItemsStore();

  const handleAddPaymentMethod = useCallback(() => {
    navigate('/member/app/payments/edit');
    setIsModalOpen(false);
  }, [navigate]);

  const handleOrder = useCallback(() => {
    if (!selectedPaymentMethodId) {
      toast.error('결제 수단을 선택해주세요.', errorToastStyle);
      return;
    }

    // 선택된 결제 수단 정보를 저장
    const updatedOrderData = orderData.map(item => ({
      ...item,
      paymentMethodId: selectedPaymentMethodId,
      paymentType: selectedPaymentMethod?.type,
    }));

    setOrderData(updatedOrderData);

    // 비밀번호 입력 페이지로 이동
    navigate('/member/app/password');
  }, [selectedPaymentMethodId, selectedPaymentMethod, orderData, setOrderData, navigate]);

  return (
    <div className='flex flex-col h-full bg-gray-100'>
      <main className='flex flex-col items-center flex-grow pt-12 px-7'>
        <h2 className='text-[100%] text-gray-500 mb-1 font-bold'>결제 수단 선택</h2>
        <p className='text-[180%] font-bold mb-12'>{`${totals.totalAmount?.toLocaleString()}`}원</p>

        <div className='w-full p-7 pt-6 mb-8 bg-white shadow-sm rounded-2xl '>
          <p className='text-sm text-gray-500 mb-2'>결제수단</p>
          <div className='flex items-center justify-between flex-nowrap'>
            <div className='flex items-center'>
              {selectedPaymentMethod ? selectedPaymentMethod.icon : <div className='w-10 h-10 bg-gray-200 rounded-full'></div>}
              <div className='ml-3'>
                <p className='font-semibold text-[100%] truncate'>{selectedPaymentMethod ? selectedPaymentMethod.title : '결제 수단을 선택해주세요'}</p>
                <p className='text-[80%] text-gray-500'>
                  {selectedPaymentMethod
                    ? selectedPaymentMethod.type === 'ACCOUNT'
                      ? `${selectedPaymentMethod.bankName} ${selectedPaymentMethod.accountNumber}`
                      : `${selectedPaymentMethod.cardCompanyName} ${selectedPaymentMethod.cardNumber}`
                    : '결제 수단이 없습니다'}
                </p>
              </div>
            </div>
            <div>
              <button
                className='px-4 py-2 bg-gray-100 rounded-lg text-[80%] text-gray-600 flex-shrink-0 whitespace-nowrap'
                onClick={() => setIsModalOpen(true)}
              >
                변경
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <BottomButton buttonText='구매하기' buttonStyle={buttonStyle} buttonFunc={handleOrder} disabled={!selectedPaymentMethodId} />
      <p className='mt-4 text-sm text-center text-gray-500'>결제 정보 확인 및 정보 제공 동의</p>

      {/* modal */}
      <SlideUpModal
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isButton={!isPasswordSet}
        buttonStyle={buttonStyle}
        buttonText='설정하기'
        buttonFunc={handleBottomButtonClick}
      >
        {isPasswordSet ? (
          <>
            {paymentMethods.allMethods.map(method => (
              <PaymentItem
                key={method.paymentMethodId}
                icon={method.icon}
                title={method.title}
                subtitle={method.subtitle}
                selected={selectedPaymentMethod?.paymentMethodId === method.paymentMethodId}
                checkedIcon={<CheckIcon className='w-8 h-8' />}
                onClick={() => handlePaymentMethodSelect(method)}
              />
            ))}
            <div className='my-3 -mx-4 bg-gray-100 min-h-5'></div>
            <PaymentItem
              icon={<CardIcon className='w-12 h-12' />}
              title='결제수단 추가하기'
              selected={true}
              checkedIcon={<ArrowIcon className='w-8 h-8' />}
              onClick={handleAddPaymentMethod}
            />
          </>
        ) : (
          <div>
            <div className='px-10 pb-8 text-2xl font-bold'>결제 비밀번호를 설정해주세요</div>
            <div className='flex px-8'>
              <svg className='w-5 h-5 mr-2 fill-gray-500 ' fill='#000000' viewBox='0 0 32 32' version='1.1' xmlns='http://www.w3.org/2000/svg'>
                <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                <g id='SVGRepo_iconCarrier'>
                  <path d='M15 21.063v-15.063c0-0.563 0.438-1 1-1s1 0.438 1 1v15.063h-2zM15 23.031h2v1.875h-2v-1.875zM0 16c0-8.844 7.156-16 16-16s16 7.156 16 16-7.156 16-16 16-16-7.156-16-16zM30.031 16c0-7.719-6.313-14-14.031-14s-14 6.281-14 14 6.281 14 14 14 14.031-6.281 14.031-14z'></path>{' '}
                </g>
              </svg>
              <div className='text-sm'>결제 비밀번호는 효성 CMS+ 스퀘어 사용해 결제시 공통으로 사용됩니다.</div>
            </div>
          </div>
        )}
      </SlideUpModal>
    </div>
  );
};

export default ChoosePayment;
