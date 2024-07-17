import React from 'react';
import BottomButton from '../../components/common/button/BottomButton';
import AddressItem from '../../components/Address/AddressItem';
import { useNavigate } from 'react-router-dom';

const ChooseAddress = ({ title, memberName, memberAddress, memberPhone }) => {
  const navigate = useNavigate();
  const handleOnclick = () => {
    navigate('register');
  };

  return (
    //border-x-2 모바일 화면 구분을 위해 남겨놓음
    <div className='flex flex-col bg-white border-x-2 h-full'>
      {/* Address Selection */}
      <div className='p-4 m-3'>
        {/* header */}
        <div className='text-2xl font-extrabold my-4'>{title}상품을 어디로 받을까요?</div>
        <div className='flex mb-2'>
          <h3 className='text-black py-1 mr-2 text-xl font-extrabold'>우리집</h3>
          <div className='bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs self-center font-bold'>현재 배송지</div>
        </div>

        {/* body*/}
        <AddressItem memberName='홍길동' memberAddress='경기도 김포시 풍년로 11'></AddressItem>
      </div>

      {/* Add New Address */}
      <div className='flex justify-center mt-4 border-t-2 pt-4'>
        <button className='text-purple-600 font-bold' onClick={handleOnclick}>
          새로운 주소 +
        </button>
      </div>

      {/* button */}
      <div className='sticky px-8 bottom-0 pb-4 w-full'>
        <BottomButton buttonStyle='bg-main text-white' buttonText='구매하기'></BottomButton>
      </div>
    </div>
  );
};

export default ChooseAddress;
