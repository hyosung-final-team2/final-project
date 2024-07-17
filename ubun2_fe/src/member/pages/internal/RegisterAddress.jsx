import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomButton from '../../components/common/button/BottomButton';
import InfoInput from '../../components/common/input/InfoInput';
import useAddressStore from '../../store/address/AddressStore';

const SEARCH_URL = '/member/app/addresses/address-search';
const RegisterAddress = ({ isRegister = true }) => {
  const { selectedAddress } = useAddressStore();
  const navigate = useNavigate();
  // dummy data
  const addressInfo = [
    { label: '배송지 이름', placeholder: '배송지 이름을 알려주세요', key: 'name' },
    { label: '받는 분', placeholder: '받는 분 성함을 알려주세요', key: 'recipeient' },
    { label: '받는 곳', placeholder: '건물, 지번 또는 도로명 검색', key: 'address' },
    { label: '상세주소', placeholder: '상세주소', key: 'detailAddress' },
    { label: '휴대폰번호', placeholder: '휴대폰 번호를 알려주세요', key: 'phoneNumber' },
  ];

  const [addressData, setAddressData] = useState({
    name: '',
    recipient: '',
    address: selectedAddress?.roadAddr + selectedAddress?.zipNo || '',
    detailAddress: '',
    phoneNumber: '',
  });

  const handleAddressSearch = () => {
    navigate(SEARCH_URL);
  };

  const handleInputChange = (key, value) => {
    setAddressData(prev => ({ ...prev, [key]: value }));
  };

  const handleConfirm = () => {
    console.log('주소 데이터:', addressData);
    // 여기에 데이터를 처리하는 로직을 추가할 수 있습니다.
    // 예: API 호출, 상태 업데이트 등
  };

  const handleDelete = () => {
    // 삭제 로직을 여기에 구현합니다.
    console.log('주소 삭제');
  };

  const inputStyle = 'bg-custom-input-lightgray border border-gray-100 text-gray-600';
  const labelStyle = 'text-gray-700';

  return (
    <div className='h-full bg-white border-x-2'>
      {/* header */}
      <div className='flex items-center p-6 pb-4'>
        <h5 className='text-xl font-bold tracking-tight text-gray-900 dark:text-white'>배송지 정보</h5>
      </div>

      {/* body */}
      <div className='space-y-4'>
        {addressInfo.map((info, index) => (
          <div className='relative' key={index} onClick={info.label === '받는 곳' ? handleAddressSearch : null}>
            <InfoInput
              label={info.label}
              key={index}
              placeholder={info.placeholder}
              inputStyle={inputStyle}
              labelStyle={labelStyle}
              value={addressData[info.key]}
              onChange={e => handleInputChange(info.key, e.target.value)}
              handleAddressSearch={handleAddressSearch}
            />
          </div>
        ))}
      </div>

      {/* bottom */}
      {isRegister ? (
        <div className='flex w-full absolute bottom-6 px-6'>
          <div className='flex-1 mr-1'>
            <BottomButton buttonStyle='bg-custom-input-gray text-black' buttonText='삭제' onClick={handleDelete}></BottomButton>
          </div>
          <div className='flex-1 ml-1'>
            <BottomButton buttonStyle='bg-main text-white' buttonText='확인' onClick={handleConfirm}></BottomButton>
          </div>
        </div>
      ) : (
        <div className='flex w-full absolute bottom-6 px-6'>
          <div className='flex-1 ml-1'>
            <BottomButton buttonStyle='bg-main text-white' buttonText='확인' onClick={handleConfirm}></BottomButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterAddress;
