import React, { useState, useEffect, useMemo, useCallback } from 'react';
import BottomButton from '../../components/common/button/BottomButton';
import SlideUpModal from '../../components/common/SlideUpModal';
import PaymentItem from '../../components/PaymentMethod/PaymentItem';
import CardIcon from '../../../assets/images/card.svg';
import ArrowIcon from '../../../assets/images/arrow.svg';
import CheckIcon from '../../../assets/images/check.svg';
import { useGetCards, useGetAccounts, useCheckIfPasswordExists } from '../../api/Payment/queries';
import { getPng } from '../../components/PaymentMethod/CardList';
import { useNavigate } from 'react-router-dom';

const ChoosePayment = ({ shopName, amount }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(null);
  const { data: cards } = useGetCards();
  const { data: accounts } = useGetAccounts();
  const { data: passwordExists } = useCheckIfPasswordExists();
  const navigate = useNavigate();

  const cardList = cards?.data?.data || [];
  const accountList = accounts?.data?.data || [];
  const isPasswordSet = passwordExists?.data?.data || false;

  const buttonStyle = 'bg-main text-white';

  const paymentMethods = useMemo(() => {
    const methods = [
      ...accountList.map(account => ({
        ...account,
        icon: <img className='h-10 w-10' src={`/src/assets/images/png/${getPng(account.bankName)}`} alt='' />,
        title: account.paymentMethodNickname,
        subtitle: `${account.bankName} ${account.accountNumber}`,
        defaultStatus: account.defaultStatus,
        type: 'ACCOUNT',
      })),
      ...cardList.map(card => ({
        ...card,
        icon: <img className='h-10 w-10' src={`/src/assets/images/png/${getPng(card.cardCompanyName)}`} alt='' />,
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
    }
  }, []); // 빈 의존성 배열을 사용하여 컴포넌트 마운트 시에만 실행

  const handlePaymentMethodSelect = useCallback(method => {
    setSelectedPaymentMethodId(method.paymentMethodId);
    setIsModalOpen(false);
  }, []);

  const handleAddPaymentMethod = useCallback(() => {
    navigate('/member/app/payments/edit');
    setIsModalOpen(false);
  }, [navigate]);

  return (
    <div className='flex flex-col h-full bg-gray-100'>
      {/* Main Content */}
      <main className='flex-grow flex flex-col items-center px-7 pt-12'>
        <h2 className='text-[3.8dvw] text-gray-500 mb-1 font-bold'>{shopName}</h2>
        <p className='text-[7dvw] font-bold mb-12'>{amount}원</p>

        {/* Payment Method */}
        <div className='w-full bg-white rounded-3xl shadow-sm p-8 pt-6 mb-8 '>
          <p className='text-[3dvw] text-gray-500 mb-2'>결제수단</p>
          <div className='flex flex-nowrap items-center justify-between'>
            <div className='flex items-center'>
              {selectedPaymentMethod ? selectedPaymentMethod.icon : <div className='w-10 h-10 bg-gray-200 rounded-full'></div>}
              <div className='ml-3'>
                <p className='font-semibold text-[4dvw] truncate'>{selectedPaymentMethod ? selectedPaymentMethod.title : '결제 수단을 선택해주세요'}</p>
                <p className='text-[3dvw] text-gray-500'>
                  {selectedPaymentMethod
                    ? selectedPaymentMethod.type === 'ACCOUNT'
                      ? `${selectedPaymentMethod.bankName} ${selectedPaymentMethod.accountNumber}`
                      : `${selectedPaymentMethod.cardCompanyName} ${selectedPaymentMethod.cardNumber}`
                    : '결제 수단이 없습니다'}
                </p>
              </div>
            </div>
            <button
              className='px-4 mx-3 py-2 bg-gray-100 rounded-lg text-[3dvw] text-gray-500 flex-shrink-0 whitespace-nowrap'
              onClick={() => setIsModalOpen(true)}
            >
              변경
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className='p-6'>
        <BottomButton buttonText='구매하기' buttonStyle={buttonStyle} />
        <p className='text-center text-sm text-gray-500 mt-4'>결제 정보 확인 및 정보 제공 동의</p>
      </footer>

      {/* modal */}
      <SlideUpModal
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        headerText={`${isPasswordSet ? '결제수단 선택' : '결제 비밀번호 설정'}`}
        isButton={!isPasswordSet}
        buttonStyle={buttonStyle}
        buttonText='설정하기'
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
            <div className='bg-gray-100 -mx-4 min-h-5 my-3'></div>
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
            <div className='text-2xl font-bold px-10 pb-8'>결제 비밀번호를 설정해주세요</div>
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
