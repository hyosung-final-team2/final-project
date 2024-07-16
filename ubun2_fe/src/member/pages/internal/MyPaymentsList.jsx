import React, { useState } from 'react';
import MyPageCardItem from '../../components/PaymentMethod/MyPageCardItem';
import PaymentItem from '../../components/PaymentMethod/PaymentItem';
import SlideUpModal from '../../components/common/SlideUpModal';
import { companies } from '../../components/PaymentMethod/CardList';

const MyPaymentsList = () => {
  const [activeTab, setActiveTab] = useState('creditCard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const buttonStyleConfirm = 'bg-main text-white';
  const buttonStyleDanger = 'bg-red-500 text-white';

  const creditCards = [
    { icon: '/api/placeholder/48/48', name: '국민', number: '국민카드 402*', deleteText: '삭제' },
    { icon: '/api/placeholder/48/48', name: '국민', number: '국민카드 205*', deleteText: '삭제' },
  ];
  const getCardIcon = card => {
    const company = companies.find(c => c.name === card);
    return company ? company.icon : null;
  };

  return (
    <div className='flex flex-col bg-white h-full pt-3 border '>
      <div className='flex mt-3 mb-6 justify-center justify-around'>
        <div className='mr-4 cursor-pointer' onClick={() => setActiveTab('creditCard')}>
          <h2 className={`text-2xl font-bold ${activeTab === 'creditCard' ? 'text-main' : 'text-gray-400'}`}>신용카드</h2>
          {activeTab === 'creditCard' && <div className='h-1 bg-indigo-700 mt-2'></div>}
        </div>
        <div className='cursor-pointer' onClick={() => setActiveTab('bankAccount')}>
          <h2 className={`text-2xl font-bold ${activeTab === 'bankAccount' ? 'text-main' : 'text-gray-400'}`}>은행계좌</h2>
          {activeTab === 'bankAccount' && <div className='h-1 bg-indigo-700 mt-2'></div>}
        </div>
      </div>

      <div className='px-4'>
        {activeTab === 'creditCard' && (
          <>
            {creditCards.map((card, index) => (
              <MyPageCardItem
                key={index}
                card={card}
                icon={getCardIcon(card?.name)}
                selected={true}
                setIsModalOpen={setIsModalOpen}
                setIsEdit={setIsEdit}
                setSelectedItem={setSelectedItem}
              />
            ))}
          </>
        )}
        {activeTab === 'bankAccount' && <p className='text-center text-gray-500 py-4'></p>}
      </div>

      <button className='mt-4 mx-6 py-4 bg-gray-200 text-gray-800 font-semibold rounded-2xl'>
        {activeTab === 'bankAccount' ? '계좌 추가하기' : '카드 추가하기'}
      </button>
      {isEdit ? (
        <SlideUpModal
          isOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          headerText='카드 별칭을 지어주세요'
          buttonStyle={buttonStyleConfirm}
          buttonText='등록하기'
        >
          <PaymentItem icon={getCardIcon(selectedItem?.name)} title={`${selectedItem?.name}카드`} subtitle={selectedItem?.number} isEdit={isEdit} />
        </SlideUpModal>
      ) : (
        <SlideUpModal
          isOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          headerText='카드를 삭제할까요?'
          buttonStyle={buttonStyleDanger}
          buttonText='삭제하기'
        >
          <PaymentItem icon={getCardIcon(selectedItem?.name)} title={`${selectedItem?.name}카드`} subtitle={selectedItem?.number} />
        </SlideUpModal>
      )}
    </div>
  );
};

export default MyPaymentsList;
