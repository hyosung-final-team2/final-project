import { Modal } from 'flowbite-react';
import MemberInfo from '../common/Info/MemberInfo';
import AddressInput from '../common/Input/AddressInput';
import useAddressStore from '../../store/Address/useAddressStore';
import { useEffect, useState } from 'react';

const MemberAddressEditModal = () => {
  const { selectedAddress, setIsEditMode } = useAddressStore(); // 괄호 추가
  const [infos, setInfos] = useState([]);

  const hong = {
    name: '홍길동',
    email: 'owen123@naver.com',
    phone: '010-2401-1235',
    createdAt: '2024-01-14',
  };

  useEffect(() => {
    if (selectedAddress) {
      setInfos([
        {
          placeholder: '우편번호',
          value: selectedAddress.zipNo || '',
          label: '우편번호',
        },
        {
          placeholder: '도로명주소',
          value: `${selectedAddress.city} ${selectedAddress.town}` || '',
          label: '도로명주소',
        },
        {
          placeholder: '상세주소',
          value: selectedAddress.detail || '',
          label: '상세주소',
        },
      ]);
    }
  }, [selectedAddress]);

  return (
    <Modal>
      <Modal.Header>
        <div className='text-3xl font-bold'>회원 주소지 수정</div>
      </Modal.Header>
      <Modal.Body>
        <div className='space-y-4 flex-2'>
          <MemberInfo member={hong} title='회원정보' onlyInfo={true} />
          <AddressInput infos={infos} title='주소 수정' />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MemberAddressEditModal;
