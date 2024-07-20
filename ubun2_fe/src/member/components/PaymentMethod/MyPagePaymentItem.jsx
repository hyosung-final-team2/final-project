import React from 'react';

const MyPagePaymentItem = ({ payment, path, selected = false, setIsModalOpen, setIsEdit, setSelectedItem }) => {
  const handleOnButtonClick = e => {
    e.stopPropagation();
    setIsEdit(false);
    setIsModalOpen(true);
    setSelectedItem(payment);
  };

  const handleOnClick = () => {
    setIsEdit(true);
    setIsModalOpen(true);
    setSelectedItem(payment);
  };

  const getPaymentInfo = () => {
    if (payment?.paymentType === 'CARD') {
      return `${payment?.cardCompanyName} ${payment?.cardNumber}`;
    } else if (payment?.paymentType === 'ACCOUNT') {
      return `${payment?.bankName} ${payment?.accountNumber}`;
    }
    return '';
  };

  return (
    <div className='flex items-center p-4' onClick={handleOnClick}>
      <div className='mr-5 flex-shrink-0'>
        <img className='h-10 w-10' src={`/src/assets/images/png/${path}`} />
      </div>
      <div>
        <p className='text-xl font-bold'>{payment?.paymentMethodNickname}</p>
        <p className='text-md text-gray-500'>{getPaymentInfo()}</p>
      </div>
      {selected && (
        <div className='right-10 absolute' onClick={handleOnButtonClick}>
          <div className='px-3 py-1 rounded-lg bg-gray-100'>삭제</div>
        </div>
      )}
    </div>
  );
};

export default MyPagePaymentItem;
