import React, { useEffect, useState, useCallback } from 'react';
import BottomButton from '../../components/common/button/BottomButton';
import CreditCardForm from '../../components/PaymentMethod/CardForm';
import BankAccountForm from '../../components/PaymentMethod/AccountForm';
import { useRegisterPayment } from '../../api/Payment/queries';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const PaymentMethodRegistration = () => {
  const [activeTab, setActiveTab] = useState('creditCard');
  const [formData, setFormData] = useState({});
  const { mutate: registerPayment } = useRegisterPayment();
  const { state } = useLocation();

  useEffect(() => {
    if (state?.type) {
      setActiveTab(state.type);
    }
  }, [state]);

  const navigate = useNavigate();
  const inputStyle = 'bg-white border border-gray-300 text-gray-900';
  const labelStyle = 'text-sm text-gray-700';
  const buttonStyle = 'bg-main text-white';

  const handleFormChange = data => {
    setFormData(data);
  };

  const handleSubmit = () => {
    const paymentData = {
      paymentType: activeTab === 'creditCard' ? 'CARD' : 'ACCOUNT',
      cardCompanyName: formData.cardCompanyName ? `${formData.cardCompanyName}카드` : null,
      cardNumber: formData.cardNumber ?? null,
      paymentMethodNickname: formData.paymentMethodNickname,
      bankName: formData.bankName ? `${formData.bankName}은행` : null,
      accountNumber: formData.accountNumber ?? null,
    };
    registerPayment(paymentData, {
      onSuccess: () => {
        navigate(-1);
      },
    });
  };

  return (
    <div className='flex flex-col bg-white h-full pt-3 border overflow-auto'>
      {/* Tab Navigation */}
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

      {activeTab === 'creditCard' ? (
        <CreditCardForm inputStyle={inputStyle} labelStyle={labelStyle} onFormChange={handleFormChange} />
      ) : (
        <BankAccountForm inputStyle={inputStyle} labelStyle={labelStyle} onFormChange={handleFormChange} />
      )}

      {/* fixed가 컨텐츠를 가리는 문제 해결 */}
      <div className='p-14'></div>

      <BottomButton buttonText='등록하기' buttonStyle={buttonStyle} buttonFunc={handleSubmit} />
    </div>
  );
};

export default PaymentMethodRegistration;
