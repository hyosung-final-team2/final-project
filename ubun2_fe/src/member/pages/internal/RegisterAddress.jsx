import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomButton from '../../components/common/button/BottomButton';
import InfoInput from '../../components/common/input/InfoInput';
import useAddressStore from '../../store/address/AddressStore';
import { useRegisterAddress, useUpdateAddress, useDeleteAddress } from '../../api/Address/queries';

const SEARCH_URL = '/member/app/addresses/address-search';
const ADDRESS_LIST_URL = '/member/app/addresses'; // 주소 목록 페이지 URL

const RegisterAddress = () => {
  const [isAllValuePossible, setIsAllValuePossible] = useState(false);
  const [localAddressId, setLocalAddressId] = useState(null);
  const { selectedAddress, resetAddressData, setSelectedAddress, addressData, setAddressData, memberId } = useAddressStore();
  const navigate = useNavigate();
  const location = useLocation();
  const isRegister = location.state?.isRegister;
  const { recipientName, address, recipientPhone, addressNickname, addressId } = location.state || {};
  const { mutate: registerAddress } = useRegisterAddress();
  const { mutate: updateAddress } = useUpdateAddress();
  const { mutate: deleteAddress } = useDeleteAddress();

  const addressInfo = [
    { label: '배송지 이름', placeholder: '배송지 이름을 알려주세요', key: 'name' },
    { label: '받는 분', placeholder: '받는 분 성함을 알려주세요', key: 'recipientName' },
    { label: '받는 곳', placeholder: '건물, 지번 또는 도로명 검색', key: 'address' },
    { label: '상세주소', placeholder: '상세주소', key: 'detailAddress' },
    { label: '휴대폰번호', placeholder: '휴대폰 번호를 알려주세요', key: 'phoneNumber' },
  ];

  useEffect(() => {
    if (addressId) {
      setLocalAddressId(addressId);
    }
  }, [addressId]);

  useEffect(() => {
    if (isRegister === false) {
      const addressRegex = /^(.*?(?:(?:\d+(?:번지)?)|(?:[가-힣]+(?:로|길)\s*\d+(?:-\d+)?)))(.*)$/;

      const separateAddress = fullAddress => {
        const match = fullAddress.match(addressRegex);
        if (match) {
          return {
            roadAddress: match[1].trim(),
            detailAddress: match[2].trim(),
          };
        }
        return { roadAddress: fullAddress, detailAddress: '' };
      };

      const { roadAddress, detailAddress } = separateAddress(address || '');

      setAddressData({
        name: addressNickname || '',
        recipientName: recipientName || '',
        address: roadAddress,
        detailAddress: detailAddress,
        phoneNumber: recipientPhone || '',
      });
    }
  }, [isRegister, addressNickname, recipientName, address, recipientPhone, setAddressData]);

  useEffect(() => {
    if (selectedAddress) {
      setAddressData({
        ...addressData,
        address: selectedAddress.roadAddr,
      });
    }
  }, [selectedAddress, setAddressData]);

  useEffect(() => {
    const isAllFilled = Object.values(addressData).every(value => value.trim() !== '');
    setIsAllValuePossible(isAllFilled);
  }, [addressData]);

  const handleAddressSearch = () => {
    navigate(SEARCH_URL);
  };

  const handleInputChange = (key, value) => {
    setAddressData({ ...addressData, [key]: value });
  };

  const handleConfirm = () => {
    if (isAllValuePossible) {
      const data = {
        memberId: memberId,
        address: `${addressData.address} ${addressData.detailAddress}`,
        recipientName: addressData.recipientName,
        recipientPhone: addressData.phoneNumber,
        addressNickname: addressData.name,
      };
      if (isRegister) {
        registerAddress(data, {
          onSuccess: () => {
            resetAddressData();
            setSelectedAddress('');
            navigate(ADDRESS_LIST_URL);
          },
        });
      } else {
        updateAddress(
          { addressId: localAddressId, data },
          {
            onSuccess: () => {
              resetAddressData();
              setSelectedAddress('');
              navigate(ADDRESS_LIST_URL);
            },
          }
        );
      }
      console.log('주소 데이터:', data);
    }
  };
  const handleDelete = () => {
    deleteAddress(localAddressId, {
      onSuccess: () => {
        resetAddressData();
        setSelectedAddress('');
        navigate(ADDRESS_LIST_URL);
      },
    }); // 주소 ID가 필요할 경우 추가해야 합니다.
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
            />
          </div>
        ))}
      </div>

      {/* bottom */}
      {isRegister ? (
        <div className='flex w-full absolute bottom-6 px-6'>
          <div className='flex-1 ml-1'>
            <BottomButton
              buttonStyle={isAllValuePossible ? 'bg-main text-white' : 'bg-gray-300 text-gray-500'}
              buttonText='확인'
              buttonFunc={handleConfirm}
              disabled={!isAllValuePossible}
            />
          </div>
        </div>
      ) : (
        <div className='flex w-full absolute bottom-6 px-6'>
          <div className='flex-1 mr-1'>
            <BottomButton buttonStyle='bg-custom-input-gray text-black' buttonText='삭제' buttonFunc={handleDelete} />
          </div>
          <div className='flex-1 ml-1'>
            <BottomButton
              buttonStyle={isAllValuePossible ? 'bg-main text-white' : 'bg-gray-300 text-gray-500'}
              buttonText='확인'
              buttonFunc={handleConfirm}
              disabled={!isAllValuePossible}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterAddress;
