import React, { useState, useEffect } from 'react';
import MyPagePaymentItem from '../../components/PaymentMethod/MyPagePaymentItem';
import PaymentItem from '../../components/PaymentMethod/PaymentItem';
import SlideUpModal from '../../components/common/SlideUpModal';
import { getIcon, getPng } from '../../components/PaymentMethod/CardList';
import { useGetCards, useGetAccounts, useDeletePayment, useUpdatePayment } from '../../api/Payment/queries';
import { useNavigate } from 'react-router-dom';
import useModalStore from '../../store/modalStore';

const MyPaymentsList = () => {
  const [activeTab, setActiveTab] = useState('creditCard');
  const [isEdit, setIsEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const buttonStyleConfirm = 'bg-main text-white';
  const buttonStyleDanger = 'bg-red-500 text-white';
  const { data: cards } = useGetCards();
  const { data: accounts } = useGetAccounts();
  const { mutate: deletePayment } = useDeletePayment();
  const { mutate: updatePayment } = useUpdatePayment();
  const { modalState, setModalState } = useModalStore();

  const navigate = useNavigate();

  const creditCards = cards?.data?.data || [];
  const bankAccounts = accounts?.data?.data || [];

  console.log('creditCards', creditCards);
  console.log('bankAccounts', bankAccounts);

  const renderPaymentItems = items => {
    return items.map((item, index) => (
      <MyPagePaymentItem
        key={index}
        payment={item}
        path={getPng(item.paymentType === 'CARD' ? item.cardCompanyName : item.bankName)}
        selected={true}
        setIsModalOpen={setModalState}
        setIsEdit={setIsEdit}
        setSelectedItem={setSelectedItem}
      />
    ));
  };

  const handleOnButtonClick = () => {
    navigate('/member/app/payments/edit');
  };

  const handleOnBottomButtonClick = () => {
    if (isEdit) {
      if (newTitle.trim() !== '' && newTitle !== selectedItem?.paymentMethodNickname) {
        updatePayment(
          { paymentMethodId: selectedItem.paymentMethodId, data: { paymentMethodNickname: newTitle } },
          {
            onSuccess: () => {
              setModalState(false);
              setIsEdit(false);
              setSelectedItem(null);
            },
            onError: error => {
              console.error(error);
            },
          }
        );
      } else {
        setModalState(false);
        setIsEdit(false);
      }
    } else {
      deletePayment(selectedItem.paymentMethodId, {
        onSuccess: () => {
          setModalState(false);
          setSelectedItem(null);
        },
        onError: error => {
          console.error(error);
        },
      });
    }
  };

  useEffect(() => {
    if (!modalState) {
      setIsEdit(false);
      setNewTitle('');
    }
  }, [modalState]);

  return (
    <div className='flex flex-col bg-white h-full pt-3'>
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
        {activeTab === 'creditCard' && renderPaymentItems(creditCards)}
        {activeTab === 'bankAccount' && renderPaymentItems(bankAccounts)}
      </div>

      <button className='mt-4 mx-6 py-4 bg-gray-200 text-gray-800 font-semibold rounded-2xl' onClick={handleOnButtonClick}>
        {activeTab === 'bankAccount' ? '계좌 추가하기' : '카드 추가하기'}
      </button>

      {isEdit ? (
        <SlideUpModal
          isOpen={modalState}
          setIsModalOpen={setModalState}
          headerText={`${activeTab === 'creditCard' ? '카드' : '계좌'} 별칭을 지어주세요`}
          buttonStyle={buttonStyleConfirm}
          buttonText='확인'
          buttonFunc={handleOnBottomButtonClick}
        >
          <PaymentItem
            icon={getIcon(selectedItem?.paymentType === 'CARD' ? selectedItem?.cardCompanyName : selectedItem?.bankName)}
            title={selectedItem?.paymentMethodNickname}
            subtitle={
              selectedItem?.paymentType === 'CARD'
                ? `${selectedItem?.cardCompanyName} ${selectedItem?.cardNumber}`
                : `${selectedItem?.bankName} ${selectedItem?.accountNumber}`
            }
            isEdit={isEdit}
            onTitleChange={setNewTitle}
          />
        </SlideUpModal>
      ) : (
        <SlideUpModal
          isOpen={modalState}
          setIsModalOpen={setModalState}
          headerText={`${activeTab === 'creditCard' ? '카드' : '계좌'}를 삭제할까요?`}
          buttonStyle={buttonStyleDanger}
          buttonText='삭제하기'
          buttonFunc={handleOnBottomButtonClick}
        >
          <PaymentItem
            icon={getIcon(selectedItem?.paymentType === 'CARD' ? selectedItem?.cardCompanyName : selectedItem?.bankName)}
            title={selectedItem?.paymentMethodNickname}
            subtitle={
              selectedItem?.paymentType === 'CARD'
                ? `${selectedItem?.cardCompanyName} ${selectedItem?.cardNumber}`
                : `${selectedItem?.bankName} ${selectedItem?.accountNumber}`
            }
          />
        </SlideUpModal>
      )}
    </div>
  );
};

export default MyPaymentsList;
