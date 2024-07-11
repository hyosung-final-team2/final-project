import { Radio } from 'flowbite-react';
import { useState } from 'react';
import Select from '../Select/Select';

const PaymentInput = () => {
  const [paymentMethod, setPaymentMethod] = useState('카드 결제');
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
  const commonButtonStyles = 'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';

  return (
    <div className='p-3'>
      <div>
        <div className='flex mb-4'>
          <h3 className='text-xl font-semibold mr-3'>결제수단 추가</h3>
          <div className='flex items-center space-x-4'>
            <Radio id='cms' name='paymentMethod' value='CMS 결제' onChange={() => setPaymentMethod('CMS 결제')} />
            <label htmlFor='cms'>CMS 결제</label>
            <Radio id='card' name='paymentMethod' value='카드 결제' defaultChecked onChange={() => setPaymentMethod('카드 결제')} />
            <label htmlFor='card'>카드 결제</label>
          </div>
        </div>
        {paymentMethod === '카드 결제' && (
          <div className='grid grid-cols-3 gap-4' style={{ gridTemplateColumns: '10fr 3fr 3fr' }}>
            <div className='relative'>
              <input className='w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-700' placeholder='카드 번호를 입력해주세요' />
              <label className='absolute text-xs text-gray-500 left-3 -top-2 bg-white px-1'>카드 번호</label>
            </div>
            <Select id='card-company' defaultOption='카드사를 선택해주세요' options={cardOptions} />
            <button className={`${commonButtonStyles} bg-custom-button-purple text-custom-font-purple hover:text-white hover:bg-custom-font-purple`}>
              추가
            </button>
          </div>
        )}
        {paymentMethod === 'CMS 결제' && (
          <div className='grid grid-cols-3 gap-4' style={{ gridTemplateColumns: '10fr 3fr 3fr' }}>
            <div className='relative'>
              <input className='w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-700' placeholder='계좌 번호를 입력해주세요' />
              <label className='absolute text-xs text-gray-500 left-3 -top-2 bg-white px-1'>계좌 번호</label>
            </div>
            <Select id='bank' defaultOption='은행사를 선택해주세요' options={bankOptions} />
            <button className={`${commonButtonStyles} bg-custom-button-purple text-custom-font-purple hover:text-white hover:bg-custom-font-purple`}>
              추가
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentInput;
