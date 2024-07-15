import React from 'react';

const AddressItem = ({ memberName, memberAddress, memberPhone }) => {
  return (
    <div className='bg-white'>
      <p className='text-sm mb-2'>{memberName}</p>
      <p className='text-lg text-gray-500'>{memberAddress}</p>
      {/* roadAddrPart2를 받아야할지도 */}
      <p className='text-lg mb-1 text-gray-500'>(풍년동, 풍년아파트) 302동 101호</p>
      <p className='text-md mb-2 text-gray-500'>{memberPhone}</p>
      <a href='#' className='text-blue-600 text-sm'>
        수정하기
      </a>
    </div>
  );
};

export default AddressItem;
