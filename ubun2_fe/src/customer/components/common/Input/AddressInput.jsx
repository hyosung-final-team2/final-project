import React, { useState, useEffect } from 'react';
import { useRegisterAddress } from '../../../api/Address/AddressModal/queris';
import useAddressStore from '../../../store/Address/useAddressStore';

const POPUP_WIDTH = 700;
const POPUP_HEIGHT = 760;

const AddressInput = ({ disabled = false, infos, title, onChange }) => {
  const commonButtonStyles = 'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md ';
  const [address, setAddress] = useState({});
  const [popup, setPopup] = useState(null);
  const [formData, setFormData] = useState(
    infos.reduce((acc, info) => {
      acc[info.label] = info.value || '';
      return acc;
    }, {})
  );
  const { selectedMemberId } = useAddressStore();
  const { mutate } = useRegisterAddress();

  const getCurrentHost = () => {
    return window.location.origin;
  };

  const handleAddressSearch = async () => {
    if (!disabled && !popup) {
      const currentHost = getCurrentHost();
      let url = `${currentHost}/customer/address-search`;
      const width = POPUP_WIDTH;
      const height = POPUP_HEIGHT;
      const features = `width=${width},height=${height}`;
      const newPopup = window.open(url, '_blank', features);
      newPopup.postMessage({ key: '1' }, '*');

      setPopup(newPopup);

      const waitForMessage = () => {
        return new Promise((resolve, reject) => {
          const messageHandler = event => {
            if (event.origin !== currentHost || event.data.type !== 'ADDRESS_SELECTED') {
              return;
            }

            if (event.data.type === 'ADDRESS_SELECTED') {
              const result = event.data.result;
              window.removeEventListener('message', messageHandler);
              resolve(result);
            }
          };

          window.addEventListener('message', messageHandler);
        });
      };

      try {
        const result = await waitForMessage();
        setAddress(result);
        const newFormData = {
          ...formData,
          우편번호: result.zipNo || '',
          도로명주소: result.roadAddrPart1 || '',
          상세주소: formData['상세주소'], // 기존 상세주소 유지
        };
        setFormData(newFormData);
        onChange(newFormData);
      } catch (error) {
        console.error('Failed to receive message', error);
      } finally {
        if (newPopup) {
          newPopup.close();
        }
        setPopup(null);
      }
    }
  };

  useEffect(() => {
    const handleMessage = event => {
      const currentHost = getCurrentHost();

      if (event.origin !== currentHost || event.data.type !== 'ADDRESS_SELECTED') {
        return;
      }

      if (event.data.type === 'ADDRESS_SELECTED') {
        const result = event.data.result;
        setAddress(result);
        const newFormData = {
          ...formData,
          우편번호: result.zipNo || '',
          도로명주소: result.roadAddr || '',
          상세주소: formData['상세주소'], // 기존 상세주소 유지
        };
        setFormData(newFormData);
        onChange(newFormData);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [formData, onChange]);

  const handleChange = (label, value) => {
    const newFormData = {
      ...formData,
      [label]: value,
    };
    setFormData(newFormData);
    onChange(newFormData);
  };

  const handleOnClick = async () => {
    const allFieldsFilled = Object.values(formData).every(value => value.trim() !== '');
    if (!allFieldsFilled) {
      alert('모든 필드를 입력해 주세요.');
      return;
    }

    const [city, town, ...rest] = formData['도로명주소'].split(' ');
    let detail = rest.join(' ').concat(' ', formData['상세주소']).trim();
    const fullAddress = [formData['우편번호'], city, town, detail].filter(Boolean).join(',');

    const apiData = {
      memberId: selectedMemberId,
      addressId: 0,
      address: fullAddress,
      recipientName: formData['수령인'],
      recipientPhone: formData['연락처'],
    };

    try {
      mutate(apiData);
    } catch (error) {
      console.error('API 호출 오류:', error);
    }
  };

  return (
    <div className='p-3'>
      <h3 className='mb-4 text-xl font-bold'>{title}</h3>
      <div className='grid gap-4 auto-cols-auto' style={{ gridTemplateColumns: '3fr 5fr 5fr 3fr' }}>
        {infos.map((info, index) => (
          <div className='relative' key={index} onClick={info.label !== '상세주소' ? handleAddressSearch : null}>
            <input
              className='w-full p-3 text-gray-700 bg-white border border-gray-300 rounded-lg'
              placeholder={info.placeholder}
              value={formData[info.label]}
              onChange={e => handleChange(info.label, e.target.value)}
              disabled={disabled}
              readOnly={info.label !== '상세주소' && !disabled}
            />
            <label className='absolute px-1 text-xs text-gray-500 bg-white left-3 -top-2'>{info.label}</label>
          </div>
        ))}
        <button
          className={`${commonButtonStyles} bg-custom-button-purple text-custom-font-purple hover:text-white hover:bg-custom-font-purple`}
          onClick={handleOnClick}
        >
          추가
        </button>
      </div>
    </div>
  );
};

export default AddressInput;
