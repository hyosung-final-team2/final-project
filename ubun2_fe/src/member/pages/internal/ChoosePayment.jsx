import React, { useState } from 'react';
import BottomButton from '../../components/common/button/BottomButton';
import SlideUpModal from '../../components/common/SlideUpModal';
import KBIcon from '../../../assets/images/KB.svg';
import PaymentItem from '../../components/PaymentMethod/PaymentItem';
import CardIcon from '../../../assets/images/card.svg';
import ArrowIcon from '../../../assets/images/arrow.svg';

const PaymentPage = ({ shopName, amount, paymentMethod, bankName, accountNumber, onChangePaymentMethod }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordSet, setIsPasswordSet] = useState(false);
  const buttonStyle = 'bg-main text-white';

  const payments = [
    { paymentMethodName: 'KB star 통장-저축예금', paymentMethodNumber: '27140204047919', companyName: 'KB국민은행' },
    { paymentMethodName: 'KB 나라사랑 우대 통장', paymentMethodNumber: '27140204047919', companyName: 'KB국민은행' },
    { paymentMethodName: '토스증권 계좌', paymentMethodNumber: '27140204047919', companyName: 'KB국민은행' },
    { paymentMethodName: '국민카드', paymentMethodNumber: '402*', companyName: '' },
    { paymentMethodName: '국민카드', paymentMethodNumber: '205*', companyName: '' },
  ];
  return (
    <div className='flex flex-col h-full bg-gray-100'>
      {/* Main Content */}
      <main className='flex-grow flex flex-col items-center px-7 pt-10'>
        <h2 className='text-xl text-gray-500 mb-2'>{shopName}효성쇼핑</h2>
        <p className='text-4xl font-bold mb-12'>{amount}49,800원</p>

        {/* Payment Method */}
        <div className='w-full bg-white rounded-3xl shadow-sm p-8 pt-6 mb-8 '>
          <p className='text-md text-gray-500 mb-2'>결제수단</p>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <KBIcon className='w-10 h-10 flex items-center justify-center mr-3' />
              <div>
                <p className='font-semibold text-xl truncate'>KB Star*t통장-저축예금{paymentMethod}</p>
                <p className='text-md text-gray-500'>
                  KB국민은행 27140204047919 {bankName} {accountNumber}
                </p>
              </div>
            </div>
            <button className='px-4 mx-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-500' onClick={() => setIsModalOpen(true)}>
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
        headerText={`${isPasswordSet ? '결제수단 선택' : ''}`}
        isButton={!isPasswordSet}
        buttonStyle={buttonStyle}
        buttonText='설정하기'
      >
        {isPasswordSet ? (
          payments.map((item, index) => {
            return (
              <PaymentItem
                key={index}
                icon={<KBIcon className='w-12 h-12' />}
                title={item.paymentMethodName}
                subtitle={`${item.companyName} ${item.paymentMethodNumber}`}
              />
            );
          })
        ) : (
          <div>
            <div className='text-2xl font-bold px-10 pb-8'>결제 비밀번호를 설정해주세요</div>
            <div className='flex px-8'>
              <svg className='w-5 h-5 mr-2 fill-gray-500 ' fill='#000000' viewBox='0 0 32 32' version='1.1' xmlns='http://www.w3.org/2000/svg'>
                <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
                <g id='SVGRepo_iconCarrier'>
                  <path d='M15 21.063v-15.063c0-0.563 0.438-1 1-1s1 0.438 1 1v15.063h-2zM15 23.031h2v1.875h-2v-1.875zM0 16c0-8.844 7.156-16 16-16s16 7.156 16 16-7.156 16-16 16-16-7.156-16-16zM30.031 16c0-7.719-6.313-14-14.031-14s-14 6.281-14 14 6.281 14 14 14 14.031-6.281 14.031-14z'></path>{' '}
                </g>
              </svg>
              <div className='text-sm'>결제 비밀번호는 효성 CMS+ 스퀘어 사용해 결제시 공통으로 사용됩니다.</div>
            </div>
          </div>
        )}
        {isPasswordSet ? (
          <>
            <div className='bg-gray-100 -mx-4 min-h-5 my-3'></div>
            <PaymentItem icon={<CardIcon className='w-12 h-12' />} title='결제수단 추가하기' selected={true} checkedIcon={<ArrowIcon className='w-8 h-8' />} />
          </>
        ) : (
          ''
        )}
      </SlideUpModal>
    </div>
  );
};

export default PaymentPage;
