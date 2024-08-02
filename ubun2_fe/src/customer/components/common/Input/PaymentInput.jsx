import { Radio } from 'flowbite-react';
import { useState } from 'react';
import Select from '../Select/Select';
import { cardPayments, bankPayments } from '../../PaymentMethodList/paymentOptions';

const commonButtonStyles = 'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';

const PaymentInput = ({ handlePaymentMethodAdd }) => {
  const [paymentMethod, setPaymentMethod] = useState('카드 결제');
  const [cardNumber, setCardNumber] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [selectedCardCompany, setSelectedCardCompany] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  const handleAddPaymentMethod = () => {
    if (paymentMethod === '카드 결제' && (!cardNumber || !selectedCardCompany)) {
      alert('카드 번호와 카드사를 입력해주세요.');
      return;
    }

    if (paymentMethod === 'CMS 결제' && (!bankAccount || !selectedBank)) {
      alert('계좌 번호와 은행사를 입력해주세요.');
      return;
    }

    if (paymentMethod === '카드 결제') {
      handlePaymentMethodAdd({
        paymentMethodId: null,
        accountNumber: null,
        bankName: null,
        cardCompanyName: selectedCardCompany,
        cardNumber: cardNumber,
      });
    } else {
      handlePaymentMethodAdd({
        paymentMethodId: null,
        accountNumber: bankAccount,
        bankName: selectedBank,
        cardCompanyName: null,
        cardNumber: null,
      });
    }
    setCardNumber('');
    setBankAccount('');
    setSelectedCardCompany('');
    setSelectedBank('');
  };

  return (
    <div className='p-3'>
      <div>
        <div className='flex mb-4'>
          <h3 className='text-xl font-semibold mr-3'>결제수단 추가</h3>
          <div className='flex items-center space-x-4'>
            <Radio id='cms' name='paymentMethod' value='CMS 결제' onChange={() => setPaymentMethod('CMS 결제')} />
            <label htmlFor='cms'>계좌</label>
            <Radio id='card' name='paymentMethod' value='카드 결제' defaultChecked onChange={() => setPaymentMethod('카드 결제')} />
            <label htmlFor='card'>카드</label>
          </div>
        </div>
        {paymentMethod === '카드 결제' && (
          <div className='grid grid-cols-3 gap-4' style={{ gridTemplateColumns: '9fr 4fr 3fr' }}>
            <div className='relative'>
              <input
                className='w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-700'
                placeholder='카드 번호를 입력해주세요'
                value={cardNumber}
                onChange={e => setCardNumber(e.target.value)}
              />
              <label className='absolute text-xs text-gray-500 left-3 -top-2 bg-white px-1'>카드 번호</label>
            </div>
            <Select
              id='card-company'
              defaultOption='카드사를 선택해주세요'
              options={cardPayments}
              value={selectedCardCompany}
              onChange={value => setSelectedCardCompany(value)}
            />
            <button
              onClick={() => handleAddPaymentMethod()}
              className={`${commonButtonStyles} bg-custom-button-purple text-custom-font-purple hover:text-white hover:bg-custom-font-purple`}
            >
              추가
            </button>
          </div>
        )}
        {paymentMethod === 'CMS 결제' && (
          <div className='grid grid-cols-3 gap-4' style={{ gridTemplateColumns: '9fr 4fr 3fr' }}>
            <div className='relative'>
              <input
                className='w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-700'
                placeholder='계좌 번호를 입력해주세요'
                value={bankAccount}
                onChange={e => setBankAccount(e.target.value)}
              />
              <label className='absolute text-xs text-gray-500 left-3 -top-2 bg-white px-1'>계좌 번호</label>
            </div>
            <Select id='bank' defaultOption='은행사를 선택해주세요' options={bankPayments} value={selectedBank} onChange={value => setSelectedBank(value)} />
            <button
              onClick={() => handleAddPaymentMethod()}
              className={`${commonButtonStyles} bg-custom-button-purple text-custom-font-purple hover:text-white hover:bg-custom-font-purple`}
            >
              추가
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentInput;
