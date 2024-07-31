import React, { useState, useEffect, useCallback, useRef } from 'react';
import InfoItem from '../common/input/InfoInput';
import CreditCard from './CreditCard';
import { companies } from './CardList';
import CardItem from '../PaymentMethod/CardItem';
import SlideUpModal from '../common/SlideUpModal';
import useModalStore from '../../store/modalStore';

const CreditCardForm = ({ inputStyle, labelStyle, onFormChange }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    paymentMethodNickname: '',
    cardCompanyName: null,
    cardPassword: '',
    cvc: '',
    expirationDate: '',
  });

  const { modalState, setModalState } = useModalStore();

  const cardNumberRef = useRef(null);
  const cardPasswordRef = useRef(null);
  const cvcRef = useRef(null);
  const expirationDateRef = useRef(null);

  const updateFormData = useCallback((key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    onFormChange(formData);
  }, [formData, onFormChange]);

  const flipCard = flip => setIsFlipped(flip);

  const handleInputChange = key => e => updateFormData(key, e.target.value);

  const handleCardCompanyNameSelect = item => {
    updateFormData('cardCompanyName', item);
    setTimeout(() => {
      if (cardNumberRef.current) {
        cardNumberRef.current.focus();
      }
    }, 0);
  };

  const handleCardNumberComplete = () => {
    if (cardPasswordRef.current) {
      cardPasswordRef.current.focus();
    }
  };

  const handleCardPasswordComplete = () => {
    if (cvcRef.current) {
      cvcRef.current.focus();
    }
  };

  const handleCVCComplete = () => {
    if (expirationDateRef.current) {
      expirationDateRef.current.focus();
    }
  };

  return (
    <div className='bg-white px-4'>
      <CreditCard
        {...formData}
        isFlipped={isFlipped}
        handleClick={() => flipCard(!isFlipped)}
        owner={formData.paymentMethodNickname}
        cardCompany={formData.cardCompanyName}
      />
      <form className='space-y-4'>
        <InfoItem
          label='카드 별명'
          placeholder='카드 별명을 입력해주세요.'
          inputStyle={inputStyle}
          labelStyle={labelStyle}
          onChange={handleInputChange('paymentMethodNickname')}
          onFocus={() => flipCard(false)}
          value={formData.paymentMethodNickname}
        />
        <InfoItem
          label='카드사'
          inputStyle={inputStyle}
          labelStyle={labelStyle}
          value={formData.cardCompanyName ? `${formData.cardCompanyName}카드` : ''}
          placeholder='카드사를 선택해주세요'
          onFocus={() => setModalState(true)}
          isSelectable={true}
        />
        <InfoItem
          ref={cardNumberRef}
          label='카드 번호'
          placeholder='**** - **** - **** - ****'
          inputStyle={inputStyle}
          labelStyle={labelStyle}
          onChange={handleInputChange('cardNumber')}
          onFocus={() => flipCard(false)}
          value={formData.cardNumber}
          maxLength={16}
          onInputComplete={handleCardNumberComplete}
        />
        <InfoItem
          ref={cardPasswordRef}
          label='카드 비밀번호'
          placeholder='카드 비밀번호'
          inputStyle={inputStyle}
          labelStyle={labelStyle}
          onChange={handleInputChange('cardPassword')}
          value={formData.cardPassword}
          type='password'
          maxLength={4}
          onInputComplete={handleCardPasswordComplete}
        />
        <div className='flex'>
          <div className='flex-1 -mr-4'>
            <InfoItem
              ref={cvcRef}
              label='CVC'
              placeholder='123'
              inputStyle={inputStyle}
              labelStyle={labelStyle}
              onChange={handleInputChange('cvc')}
              onFocus={() => flipCard(true)}
              value={formData.cvc}
              maxLength={3}
              onInputComplete={handleCVCComplete}
            />
          </div>
          <div className='flex-1 -ml-4'>
            <InfoItem
              ref={expirationDateRef}
              label='카드 유효기간'
              placeholder='MM/YY'
              inputStyle={inputStyle}
              labelStyle={labelStyle}
              onChange={handleInputChange('expirationDate')}
              onFocus={() => flipCard(false)}
              value={formData.expirationDate}
              maxLength={4}
            />
          </div>
        </div>
      </form>
      <SlideUpModal isOpen={modalState} setIsModalOpen={setModalState} headerText='카드사를 선택하세요' isButton={false}>
        <div className='bg-white px-4 pb-2 rounded-lg max-w-3xl w-full'>
          <div className='grid grid-cols-3 gap-3'>
            {companies.map((item, index) => (
              <CardItem
                key={index}
                logo={item.icon}
                name={item.name}
                setSelectedItem={() => handleCardCompanyNameSelect(item.name)}
                setIsModalOpen={setModalState}
                path={item.path}
              />
            ))}
          </div>
        </div>
      </SlideUpModal>
    </div>
  );
};

export default CreditCardForm;
