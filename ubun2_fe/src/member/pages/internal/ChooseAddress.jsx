import React from 'react';
import BottomButton from '../../components/common/button/BottomButton';
import AddressItem from '../../components/Address/AddressItem';
import { useNavigate } from 'react-router-dom';
import { useGetMyAddresses } from '../../api/Address/queries';
import useAddressStore from '../../store/address/AddressStore';

const ChooseAddress = ({ title }) => {
  const navigate = useNavigate();
  const { memberId } = useAddressStore(state => ({ memberId: state.memberId }));
  const { data: addresses } = useGetMyAddresses(memberId);

  const addressList = addresses?.data?.data || [];
  console.log(addressList);

  const handleRegister = () => {
    navigate('register', { state: { isRegister: true } });
  };

  return (
    //border-x-2 모바일 화면 구분을 위해 남겨놓음
    <div className='flex flex-col bg-white border h-full relative'>
      {/* Address Selection */}
      <div className='flex-grow overflow-auto'>
        <div className='p-4 m-3'>
          {/* header */}
          <div className='text-2xl font-extrabold my-4'>{title}상품을 어디로 받을까요?</div>

          {/* body*/}
          {addressList.map((address, index) => {
            const handleEdit = () => {
              navigate('register', {
                state: {
                  isRegister: false,
                  recipientName: address.recipientName,
                  address: address.address,
                  recipientPhone: address.recipientPhone,
                  addressNickname: address.addressNickname,
                  defaultStatus: address.defaultStatus,
                  addressId: address.addressId,
                },
              });
            };

            return (
              <AddressItem
                key={index}
                recipientName={address.recipientName}
                memberAddress={address.address}
                recipientPhone={address.recipientPhone}
                addressNickname={address.addressNickname}
                defaultStatus={address.defaultStatus}
                handleEdit={handleEdit}
              ></AddressItem>
            );
          })}
          {/* <AddressItem memberName='홍길동' memberAddress='경기도 김포시 풍년로 11'></AddressItem> */}
        </div>

        {/* Add New Address */}
        <div className='flex justify-center mt-4 border-t pt-4'>
          <button className='text-purple-600 font-bold' onClick={handleRegister}>
            새로운 주소 +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseAddress;
