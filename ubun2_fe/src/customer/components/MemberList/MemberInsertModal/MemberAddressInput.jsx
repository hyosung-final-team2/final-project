import React, { useState, useEffect } from 'react';
import useAddressStore from '../../../store/Address/useAddressStore';

const POPUP_WIDTH = 700;
const POPUP_HEIGHT = 760;

const MemberAddressInput = ({ disabled = false, infos, title, handleAddressAdd }) => {
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
        setFormData(prevFormData => ({
          ...prevFormData,
          도로명주소: result.roadAddrPart1 || '',
          우편번호: result.zipNo || '',
        }));
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
        setFormData(prevFormData => ({
          ...prevFormData,
          도로명주소: result.roadAddr || '',
          우편번호: result.zipNo || '',
        }));
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleChange = (label, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [label]: value,
    }));
  };

  const handleOnClick = async () => {
    const allFieldsFilled = Object.values(formData).every(value => value.trim() !== '');
    if (!allFieldsFilled) {
      alert('모든 필드를 입력해 주세요.');
      return;
    }

    const addressParts = formData['도로명주소'].split(' ');
    const city = addressParts[0];
    const district = addressParts[1];
    const roadAddress = addressParts.slice(2).join(' ');
    const formattedAddress = `${formData['우편번호']},${city},${district},${roadAddress} ${formData['상세주소']}`;

    handleAddressAdd({
      addressId: null,
      address: formattedAddress,
      recipientName: formData['수령인'],
      recipientPhone: formData['연락처'],
    });

    setFormData(
      infos.reduce((acc, info) => {
        acc[info.label] = '';
        return acc;
      }, {})
    );
  };

  return (
    <div className='p-3'>
      <h3 className='text-xl font-bold mb-4'>{title}</h3>
      <div className='grid auto-cols-auto gap-4' style={{ gridTemplateColumns: '3fr 5fr 5fr 3fr' }}>
        {infos.map((info, index) => (
          <div
            className='relative'
            key={index}
            onClick={info.label !== '상세주소' && info.label !== '수령인' && info.label !== '연락처' ? handleAddressSearch : null}
          >
            <input
              className='w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-700'
              placeholder={info.placeholder}
              value={formData[info.label]}
              onChange={e => handleChange(info.label, e.target.value)}
              disabled={disabled}
              readOnly={info.label !== '상세주소' && info.label !== '수령인' && info.label !== '연락처' && !disabled}
            />
            <label className='absolute text-xs text-gray-500 left-3 -top-2 bg-white px-1'>{info.label}</label>
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

export default MemberAddressInput;
