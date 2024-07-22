import React from 'react';
import { getBankLogo } from '../../../member/components/PaymentMethod/CardList';

const PaymentMethodAccount = ({ bgColor, bankName, memberName, accountNumber }) => {
  return (
    <div className={`flex-1 bg-slate-600 ${bgColor}} text-white w-[95%] h-full rounded-lg p-6 relative flex flex-col`}>
      {/* <div className='mt-auto flex justify-between'> */}
      <div>
        <img className='h-[30%]' src={`/src/assets/banklogos/${getBankLogo(bankName)}`} alt='' />
      </div>
      <div>
        <div className='text-sm mb-1'>은행명</div>
        <div className='text-md font-semibold mb-4'>{bankName}</div>
      </div>
      {/* </div> */}

      <div className='absolute top-2 right-2 text-xs font-bold'>VERIFIED</div>

      <div className='mt-auto flex justify-between'>
        <div className='flex-1'>
          <div className='text-md mb-1'>소유자명</div>
          <div className='text-md font-bold'>{memberName}</div>
        </div>
        <div className='flex-1'>
          <div className='text-md mb-1'>계좌 번호</div>
          <div className='text-md font-bold'>{accountNumber}</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodAccount;