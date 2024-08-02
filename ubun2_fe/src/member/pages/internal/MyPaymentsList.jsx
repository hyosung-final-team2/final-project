import { useState, useEffect } from 'react';
import MyPagePaymentItem from '../../components/PaymentMethod/MyPagePaymentItem';
import PaymentItem from '../../components/PaymentMethod/PaymentItem';
import SlideUpModal from '../../components/common/SlideUpModal';
import { getIcon, getPng } from '../../components/PaymentMethod/CardList';
import { useGetCards, useGetAccounts, useDeletePayment, useUpdatePayment, useCheckIfPasswordExists } from '../../api/Payment/queries';
import { useNavigate } from 'react-router-dom';
import useModalStore from '../../store/modalStore';
import BottomButton from '../../components/common/button/BottomButton';
import usePaymentStore from '../../store/Payment/PaymentStore';
import { formatBankAccount } from '../../../customer/utils/accountFormat';

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
  const { data: passwordExists } = useCheckIfPasswordExists();
  const { setIsEditPassword } = usePaymentStore();

  const navigate = useNavigate();
  const creditCards = cards?.data?.data || [];
  const bankAccounts = accounts?.data?.data || [];
  const checkPasswordExists = passwordExists?.data?.data || false;
  const buttonStyle = 'text-white bg-main mb-3';

  const renderPaymentItems = items => {
    if (items?.length === 0)
      return (
        <div className='flex-grow flex items-center justify-center mb-[60%]'>
          <p className='text-gray-500 text-lg'>등록된 {activeTab === 'bankAccount' ? '계좌가' : '카드가'} 없어요</p>
        </div>
      );
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
    activeTab === 'creditCard'
      ? navigate('/member/app/payments/edit', { state: { type: 'creditCard' } })
      : navigate('/member/app/payments/edit', { state: { type: 'bankAccount' } });
  };

  const handleOnModalBottomButtonClick = () => {
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

  const handleSetPassword = () => {
    if (checkPasswordExists) {
      setIsEditPassword(true);
      navigate('/member/app/password/update');
    } else {
      setIsEditPassword(false);
      navigate('/member/app/password/set');
    }
  };

  return (
    <div className='flex flex-col h-full pt-3 bg-white relative'>
      <div className='flex justify-around mt-3 mb-6'>
        <div className='mr-4 cursor-pointer' onClick={() => setActiveTab('creditCard')}>
          <h2 className={`text-2xl font-bold ${activeTab === 'creditCard' ? 'text-main' : 'text-gray-400'}`}>신용카드</h2>
          {activeTab === 'creditCard' && <div className='h-1 mt-2 bg-indigo-700'></div>}
        </div>
        <div className='cursor-pointer' onClick={() => setActiveTab('bankAccount')}>
          <h2 className={`text-2xl font-bold ${activeTab === 'bankAccount' ? 'text-main' : 'text-gray-400'}`}>은행계좌</h2>
          {activeTab === 'bankAccount' && <div className='h-1 mt-2 bg-indigo-700'></div>}
        </div>
      </div>

      <div className='px-4 flex-1 flex flex-col overflow-y-scroll relative h-full'>
        {activeTab === 'creditCard' && renderPaymentItems(creditCards)}
        {activeTab === 'bankAccount' && renderPaymentItems(bankAccounts)}
      </div>

      <div className='p-7 bg-transparent'></div>
      <BottomButton buttonText={activeTab === 'bankAccount' ? '계좌 추가하기' : '카드 추가하기'} buttonFunc={handleOnButtonClick} buttonStyle={buttonStyle} />
      <div className='z-10 self-center mb-[4%] text-gray-500 border-b border-gray-300 text-sm cursor-pointer' onClick={handleSetPassword}>
        간편비밀번호 설정
      </div>
      {isEdit ? (
        <SlideUpModal
          isOpen={modalState}
          setIsModalOpen={setModalState}
          headerText={`${activeTab === 'creditCard' ? '카드' : '계좌'} 별칭을 지어주세요`}
          buttonStyle={buttonStyleConfirm}
          buttonText='확인'
          buttonFunc={handleOnModalBottomButtonClick}
        >
          <PaymentItem
            icon={getIcon(selectedItem?.paymentType === 'CARD' ? selectedItem?.cardCompanyName : selectedItem?.bankName)}
            title={selectedItem?.paymentMethodNickname}
            subtitle={
              selectedItem?.paymentType === 'CARD'
                ? `${selectedItem?.cardCompanyName} ${selectedItem?.cardNumber?.slice(-4).replace(/\d{2}$/, '**')}`
                : `${selectedItem?.bankName} ${formatBankAccount(selectedItem?.bankName.slice(0, -2), selectedItem?.accountNumber)}`
            }
            isEdit={isEdit}
            onTitleChange={setNewTitle}
            paymentMethodId={selectedItem?.paymentMethodId}
          />
        </SlideUpModal>
      ) : (
        <SlideUpModal
          isOpen={modalState}
          setIsModalOpen={setModalState}
          headerText={`${activeTab === 'creditCard' ? '카드' : '계좌'}를 삭제할까요?`}
          buttonStyle={buttonStyleDanger}
          buttonText='삭제하기'
          buttonFunc={handleOnModalBottomButtonClick}
        >
          <PaymentItem
            icon={getIcon(selectedItem?.paymentType === 'CARD' ? selectedItem?.cardCompanyName : selectedItem?.bankName)}
            title={selectedItem?.paymentMethodNickname}
            subtitle={
              selectedItem?.paymentType === 'CARD'
                ? `${selectedItem?.cardCompanyName} ${selectedItem?.cardNumber?.slice(-4).replace(/\d{2}$/, '**')}`
                : `${selectedItem?.bankName} ${formatBankAccount(selectedItem?.bankName.slice(0, -2), selectedItem?.accountNumber)}`
            }
          />
        </SlideUpModal>
      )}
    </div>
  );
};

export default MyPaymentsList;
