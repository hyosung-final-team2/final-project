import React from 'react';
import { getBankLogo, getCardColor } from '../../../member/components/PaymentMethod/CardList';
import { formatBankAccount } from '../../utils/accountFormat';

const PaymentMethodAccount = ({ bankName, memberName, accountNumber }) => {
  const formattedBankNumber = accountNumber ? formatBankAccount(bankName?.slice(0, -2), accountNumber, true) : '-';
  console.log(getCardColor(bankName));
  return (
    <div className={`flex-1 bg-slate-600 w-[400px] h-[230px] ${getCardColor(bankName)} text-white  p-6 relative flex flex-col rounded-xl`}>
      {/* <div className='mt-auto flex justify-between'> */}
      <div className='pb-10'>
        <img className='h-[30px]' src={`/src/assets/banklogos/${getBankLogo(bankName)}`} alt='' />
      </div>
      <div>
        <div className='text-sm '>은행명</div>
        <div className='text-md font-semibold mb-4'>{bankName}</div>
      </div>
      {/* </div> */}

      <div className='absolute top-2 right-3 text-xs font-bold'>VERIFIED</div>

      <div className='mt-auto flex justify-between'>
        <div className='flex-1'>
          <div className='text-md'>소유자명</div>
          <div className='text-md font-bold'>{memberName}</div>
        </div>
        <div className='flex-1'>
          <div className='text-md'>계좌 번호</div>
          <div className='text-md font-bold'>{formattedBankNumber}</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodAccount;
