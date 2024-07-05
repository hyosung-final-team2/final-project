import { Modal } from 'flowbite-react';
import { useEffect } from 'react';
import { customModalTheme } from '../common/Modal/modalStyle';
import MemberInfo from '../common/Info/MemberInfo';
import MemberAddressTable from './MemberAddressTable/MemberAddressTable';
import MemberAddressEditModal from './MemberAddressEditModal';
import AddressInput from '../common/Input/AddressInput';
import useAddressStore from '../../store/Address/useAddressStore';
import { addresses } from './MemberAddressTable/MemberAddressListData';

const MemberAddressModal = ({ isOpen, setOpenModal }) => {
  const { isEditMode, setIsEditMode, setSelectedAddress } = useAddressStore();
  const initialInfos = [
    {
      placeholder: '우편번호',
      value: '',
      label: '우편번호',
    },
    {
      placeholder: '도로명주소',
      value: '',
      label: '도로명주소',
    },
    {
      placeholder: '상세주소',
      value: '',
      label: '상세주소',
    },
  ];

  const hong = {
    name: '홍길동',
    email: 'owen123@naver.com',
    phone: '010-2401-1235',
    createdAt: '2024-01-14',
  };

  useEffect(() => {
    if (!isOpen) {
      // 모달이 닫힐 때 실행
      setIsEditMode(false);
      setSelectedAddress(null);
    }
  }, [isOpen, setIsEditMode, setSelectedAddress]);

  return (
    <>
      <Modal dismissible show={isOpen} onClose={() => setOpenModal(false)} size='5xl' theme={customModalTheme}>
        {!isEditMode ? (
          <>
            <Modal.Header>
              <div className='text-3xl font-bold'>
                <div className='text-3xl font-bold'>회원 주소지 등록</div>
              </div>
            </Modal.Header>
            <Modal.Body>
              <div className='space-y-4 flex-2'>
                <MemberInfo member={hong} searchable={true} title='회원정보' />
                <AddressInput infos={initialInfos} title='주소 추가' />
                <MemberAddressTable addresses={addresses} title='홍길동님의 주소 목록' />
              </div>
            </Modal.Body>
          </>
        ) : (
          <MemberAddressEditModal />
        )}

        <Modal.Footer>
          <button
            type='button'
            className='focus:outline-none w-20 text-custom-font-purple bg-custom-button-purple hover:bg-purple-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
            onClick={() => setIsEditMode(false)}
          >
            확인
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MemberAddressModal;
