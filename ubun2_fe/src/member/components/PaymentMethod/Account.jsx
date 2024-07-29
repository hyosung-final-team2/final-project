import React from 'react';
import { getBankLogo, getCardColor } from './CardList';
import { formatBankAccount } from '../../../customer/utils/accountFormat';

const Account = ({ bankName, paymentMethodNickname, accountNumber }) => {
  const formattedAccountNumber = formatBankAccount(bankName, accountNumber);

  return (
    <div className={`flex-1 bg-slate-600 ${getCardColor(bankName)} text-white mx-8 h-56 rounded-xl p-6 relative flex flex-col`}>
      <div className='h-8 flex items-center mb-2'>
        <img className='max-h-[80%] max-w-[40%] object-contain' src={`/src/assets/banklogos/${getBankLogo(bankName)}`} alt='' />
      </div>
      <div className='mb-4 mt-4'>
        <div className='text-xs mb-1'>은행명</div>
        <div className='text-md font-semibold'>{bankName ? `${bankName}은행` : ''}</div>
      </div>

      <div className='absolute top-2 right-2 text-xs font-bold'>VERIFIED</div>

      <div className='mt-auto flex justify-between'>
        <div className='flex-1 flex flex-col'>
          <div className='text-xs mb-1'>계좌 별명</div>
          <div className='text-md font-bold min-h-[1.5rem]'>{paymentMethodNickname || ''}</div>
        </div>
        <div className='flex-1 flex flex-col'>
          <div className='text-xs mb-1'>계좌 번호</div>
          <div className='text-md font-bold min-h-[1.5rem]'>{formattedAccountNumber || ''}</div>
        </div>
      </div>
    </div>
  );
};

export default Account;
