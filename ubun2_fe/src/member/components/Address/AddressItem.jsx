import React from 'react';

const AddressItem = ({ recipientName, memberAddress, recipientPhone, addressNickname, defaultStatus, handleEdit }) => {
  return (
    <div className='bg-white mb-4'>
      <div className='flex mb-2'>
        {/* 배송지 이름 */}
        <h3 className='text-black py-1 mr-2 text-xl font-bold'>{addressNickname}</h3>
        {/* 배송지 상태 */}
        {defaultStatus ? <div className='bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs self-center font-bold'>현재 배송지</div> : null}
      </div>
      <p className='text-sm '>{recipientName}</p>
      <p className='text-lg text-gray-500'>{memberAddress}</p>
      <p className='text-md text-gray-500'>{recipientPhone}</p>
      <a href='#' className='text-blue-600 text-sm' onClick={handleEdit}>
        수정하기
      </a>
    </div>
  );
};

export default AddressItem;
