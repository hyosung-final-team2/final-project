import FloatingLabelInput from '../common/input/FloatingLabelInput';
import { companies } from './CardList';
import { useState, useCallback, useEffect } from 'react';
import SlideUpModal from '../common/SlideUpModal';
import CardItem from './CardItem';

const BankAccountForm = ({ inputStyle, labelStyle, onFormChange }) => {
  const [isModalOpen, setIsModalOpen] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    accountNumber: '',
    paymentMethodNickname: '',
    bank: null,
    // accountPassword: '',
    // expirationDate: '',
  });

  const updateFormData = useCallback((key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    onFormChange(formData);
  }, [formData, onFormChange]);

  const handleInputChange = key => e => updateFormData(key, e.target.value);

  const handleBankSelect = item => {
    updateFormData('bankName', item);
    setIsModalOpen(false);
  };

  return (
    <div className='space-y-6 mt-5 px-4'>
      <div className='mx-6 mb-10'>
        <h2 className='text-2xl font-bold mb-2'>결제할 계좌를 알려주세요.</h2>
        <p className='text-gray-600 text-xl'>한 번 등록해두면 다음부터는 계좌 정보를 다시 입력할 필요 없어요.</p>
      </div>
      <FloatingLabelInput
        id='bank-selection'
        label='은행 선택'
        className='cursor-pointer'
        value={formData.bankName ? `${formData.bankName}은행` : ''}
        onFocus={() => setIsModalOpen(true)}
        isSelectable={true}
        readOnly
      />
      <FloatingLabelInput
        id='paymentMethodNickname'
        label='계좌 별칭'
        className='text-main'
        value={formData.paymentMethodNickname}
        onChange={handleInputChange('paymentMethodNickname')}
      />
      <FloatingLabelInput
        id='accountNumber'
        label='은행 계좌번호'
        className='text-main'
        value={formData.accountNumber}
        onChange={handleInputChange('accountNumber')}
      />
      <FloatingLabelInput
        id='accountPassword'
        label='계좌 비밀번호'
        className='text-main'
        value={formData.accountPassword}
        onChange={handleInputChange('accountPassword')}
      />
      <SlideUpModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} headerText='은행을 선택하세요' isButton={false}>
        <div className='bg-white px-4 pb-2 rounded-lg max-w-3xl w-full'>
          <div className='grid grid-cols-3 gap-3'>
            {companies.map((item, index) => {
              if (item.name !== '비씨' && item.name !== '삼성' && item.name !== '현대' && item.name !== '롯데') {
                return (
                  <CardItem
                    key={index}
                    logo={item.icon}
                    name={item.name}
                    setSelectedItem={() => handleBankSelect(item.name)}
                    setIsModalOpen={setIsModalOpen}
                    path={item.path}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      </SlideUpModal>
    </div>
  );
};

export default BankAccountForm;
