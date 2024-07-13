import { Radio } from 'flowbite-react';
import { useState } from 'react';
import Select from '../common/Select/Select';
import { useRegisterPayment } from '../../api/PaymentMethod/Table/queris';
import paymentMethodStore from '../../store/PaymentMethod/paymentMethodStore';

const PaymentInfo = ({}) => {
  const commonButtonStyles = 'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md ';
  const [paymentMethod, setPaymentMethod] = useState('카드 결제');
  const [cardNumber, setCardNumber] = useState('');
  const [cardCompany, setCardCompany] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const { mutate } = useRegisterPayment();

  const { selectedMemberId } = paymentMethodStore();

  const cardOptions = [
    { value: 'US', label: '국민카드' },
    { value: 'CA', label: '우리카드' },
    { value: 'FR', label: '신한카드' },
    { value: 'DE', label: '삼성카드' },
  ];

  const bankOptions = [
    { value: 'US', label: '국민은행' },
    { value: 'CA', label: '신한은행' },
    { value: 'FR', label: '우리은행' },
    { value: 'DE', label: '토스뱅크' },
  ];

  const handleOnClick = () => {
    let allFieldsFilled = false;
    let errorMessage = '';

    if (paymentMethod === '카드 결제') {
      allFieldsFilled = cardNumber.trim() !== '' && cardCompany !== '';
      errorMessage = '카드 번호와 카드사를 모두 입력해 주세요.';
    } else if (paymentMethod === 'CMS 결제') {
      allFieldsFilled = accountNumber.trim() !== '' && bankName !== '';
      errorMessage = '계좌 번호와 은행을 모두 입력해 주세요.';
    }

    if (!allFieldsFilled) {
      alert(errorMessage);
      return;
    }

    console.log('selectedMemberId', selectedMemberId);
    console.log('cardCompany', cardCompany);
    console.log('cardNumber', cardNumber);
    console.log('accountNumber', accountNumber);
    console.log('bankName', bankName);
    const apiData = {
      memberId: selectedMemberId,
      paymentType: paymentMethod === '카드 결제' ? 'CARD' : 'ACCOUNT',
      cardCompanyName: paymentMethod === '카드 결제' ? cardCompany : null,
      cardNumber: paymentMethod === '카드 결제' ? cardNumber : null,
      accountNumber: paymentMethod === 'CMS 결제' ? accountNumber : null,
      bankName: paymentMethod === 'CMS 결제' ? bankName : null,
    };

    mutate(apiData);
  };

  const flushData = () => {
    setAccountNumber('');
    setCardCompany('');
    setBankName('');
    setCardNumber('');
  };

  return (
    <>
      <div className='p-3'>
        <h3 className='text-xl font-semibold mb-2'>결제수단 추가</h3>
        <div className='flex items-center space-x-4 mb-4'>
          <Radio
            id='cms'
            name='paymentMethod'
            value='CMS 결제'
            onChange={() => {
              setPaymentMethod('CMS 결제'), flushData();
            }}
          />
          <label htmlFor='cms'>CMS 결제</label>
          <Radio
            id='card'
            name='paymentMethod'
            value='카드 결제'
            defaultChecked
            onChange={() => {
              setPaymentMethod('카드 결제'), flushData();
            }}
          />
          <label htmlFor='card'>카드 결제</label>
        </div>
        {paymentMethod === '카드 결제' && (
          <div className='grid grid-cols-2 gap-4' style={{ gridTemplateColumns: '5fr 3fr 2fr' }}>
            <div className='relative'>
              <input
                className='w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-700'
                placeholder='카드 번호를 입력해주세요'
                onChange={e => setCardNumber(e.target.value)}
              />
              <label className='absolute text-xs text-gray-500 left-3 -top-2 bg-white px-1'>카드 번호</label>
            </div>
            <Select
              id='card-company'
              defaultOption='카드사를 선택해주세요'
              options={cardOptions}
              onChange={e => {
                setCardCompany(e.target.value);
              }}
            />
            <button
              className={`${commonButtonStyles} bg-custom-button-purple text-custom-font-purple hover:text-white hover:bg-custom-font-purple`}
              onClick={handleOnClick}
            >
              추가
            </button>
          </div>
        )}
        {paymentMethod === 'CMS 결제' && (
          <div className='grid grid-cols-2 gap-4'>
            <div className='relative'>
              <input
                className='w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-700'
                placeholder='계좌 번호를 입력해주세요'
                onChange={e => setAccountNumber(e.target.value)}
              />
              <label className='absolute text-xs text-gray-500 left-3 -top-2 bg-white px-1'>계좌 번호</label>
            </div>
            <Select id='bank' defaultOption='은행사를 선택해주세요' options={bankOptions} onChange={e => setBankName(e.target.value)} />
            <button
              className={`${commonButtonStyles} bg-custom-button-purple text-custom-font-purple hover:text-white hover:bg-custom-font-purple`}
              onClick={handleOnClick}
            >
              추가
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default PaymentInfo;
